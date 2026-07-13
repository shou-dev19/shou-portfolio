export interface YouTubeVideo {
  videoId: string;
  title: string;
  url: string;
  publishedAt: string;
  thumbnailUrl: string;
}

export interface ChannelStats {
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
}

const CHANNEL_ID = 'UCMipk_M3zSM9hx6V2wFBIWg';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

interface YouTubeChannelsResponse {
  items?: Array<{
    statistics?: {
      subscriberCount?: string;
      videoCount?: string;
      viewCount?: string;
    };
  }>;
}

export function decodeXmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)));
}

export async function getLatestVideos(count: number = 4): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 86400 } });
    if (!res.ok) return [];

    const xml = await res.text();
    const entries = xml.match(/<entry>([\s\S]*?)<\/entry>/g) ?? [];

    return entries
      .slice(0, count)
      .map((entry) => {
        const videoId = (entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/) ?? [])[1] ?? '';
        const rawTitle = (entry.match(/<title>(.*?)<\/title>/) ?? [])[1] ?? '';
        const published = (entry.match(/<published>(.*?)<\/published>/) ?? [])[1] ?? '';
        const thumbnail = (entry.match(/<media:thumbnail url="(.*?)"/) ?? [])[1] ?? '';

        return {
          videoId,
          title: decodeXmlEntities(rawTitle),
          url: `https://www.youtube.com/watch?v=${videoId}`,
          publishedAt: published,
          thumbnailUrl: thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        };
      })
      .filter((v) => v.videoId !== '');
  } catch {
    return [];
  }
}

export async function getChannelStats(): Promise<ChannelStats | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.warn('YouTube統計を取得できません: YOUTUBE_API_KEYが未設定です');
    return null;
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });

    if (!res.ok) {
      console.warn(`YouTube統計の取得に失敗しました: HTTP ${res.status}`);
      return null;
    }

    const data = (await res.json()) as YouTubeChannelsResponse;
    const statistics = data.items?.[0]?.statistics;
    const subscriberCount = Number(statistics?.subscriberCount);
    const videoCount = Number(statistics?.videoCount);
    const viewCount = Number(statistics?.viewCount);

    if (
      !statistics?.subscriberCount
      || !statistics.videoCount
      || !statistics.viewCount
      || !Number.isFinite(subscriberCount)
      || !Number.isFinite(videoCount)
      || !Number.isFinite(viewCount)
    ) {
      console.warn('YouTube統計を取得できません: レスポンス形式が不正です');
      return null;
    }

    return { subscriberCount, videoCount, viewCount };
  } catch (error) {
    console.warn('YouTube統計の取得中にエラーが発生しました', error);
    return null;
  }
}
