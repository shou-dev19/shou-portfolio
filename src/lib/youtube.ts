export interface YouTubeVideo {
  videoId: string;
  title: string;
  url: string;
  publishedAt: string;
  thumbnailUrl: string;
}

const CHANNEL_ID = 'UCMipk_M3zSM9hx6V2wFBIWg';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

function decodeXmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
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
