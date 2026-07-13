import { decodeXmlEntities } from '@/lib/youtube';

export interface FeedItem {
  title: string;
  url: string;
  publishedAt: string;
  thumbnailUrl?: string;
}

const getTagValue = (item: string, tag: string): string => {
  const match = item.match(new RegExp(`<${tag}(?:\\s[^>]*)?>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))<\\/${tag}>`, 'i'));
  return decodeXmlEntities((match?.[1] ?? match?.[2] ?? '').trim());
};

const parseFeedItem = (item: string): FeedItem | null => {
  const title = getTagValue(item, 'title');
  const url = getTagValue(item, 'link');
  const publishedAt = getTagValue(item, 'pubDate');
  const thumbnailMatch = item.match(/<media:thumbnail\b[^>]*\burl=(?:"([^"]*)"|'([^']*)')[^>]*>/i);
  const thumbnailUrl = decodeXmlEntities(
    thumbnailMatch?.[1] ?? thumbnailMatch?.[2] ?? getTagValue(item, 'media:thumbnail'),
  );

  if (!title || !url || !publishedAt || title.startsWith('保護中:')) return null;

  return {
    title,
    url,
    publishedAt,
    ...(thumbnailUrl ? { thumbnailUrl } : {}),
  };
};

export const getLatestFeedItems = async (feedUrl: string, count = 3): Promise<FeedItem[]> => {
  try {
    const res = await fetch(feedUrl, { next: { revalidate: 86400 } });

    if (!res.ok) {
      console.warn(`フィードの取得に失敗しました: ${feedUrl} (HTTP ${res.status})`);
      return [];
    }

    const xml = await res.text();
    const items = xml.match(/<item\b[^>]*>[\s\S]*?<\/item>/gi);

    if (!items) {
      console.warn(`フィードのパースに失敗しました: ${feedUrl}`);
      return [];
    }

    return items
      .map(parseFeedItem)
      .filter((item): item is FeedItem => item !== null)
      .slice(0, count);
  } catch (error) {
    console.warn(`フィードの取得中にエラーが発生しました: ${feedUrl}`, error);
    return [];
  }
};
