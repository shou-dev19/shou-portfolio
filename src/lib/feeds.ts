import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { decodeXmlEntities } from './youtube';

export interface FeedItem {
  title: string;
  url: string;
  publishedAt: string;
  thumbnailUrl?: string;
}

type XmlText = string | { '#text'?: string; '#cdata'?: string };
interface FeedEntry {
  title?: XmlText;
  link?: XmlText | Array<{ '@_href'?: string; '@_rel'?: string }>;
  pubDate?: string;
  published?: string;
  updated?: string;
  'media:thumbnail'?: string | { '@_url'?: string };
}
interface FeedDocument {
  rss?: { channel?: { item?: FeedEntry[] } };
  feed?: { entry?: FeedEntry[] };
}

const parser = new XMLParser({
  ignoreAttributes: false,
  parseTagValue: false,
  htmlEntities: true,
  cdataPropName: '#cdata',
  // Always normalize entries, even when a feed contains only one article.
  isArray: (_name, path) => typeof path === 'string' && ['rss.channel.item', 'feed.entry', 'feed.entry.link'].includes(path),
});

const readText = (value?: XmlText): string => {
  if (typeof value === 'string') return value.trim();
  // WordPress can encode title characters inside CDATA, which XML parsers leave literal.
  return (value?.['#cdata'] !== undefined ? decodeXmlEntities(value['#cdata']) : value?.['#text'] ?? '').trim();
};

const isWebUrl = (value: string): boolean => {
  try {
    return ['https:', 'http:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
};

const normalizeEntry = (entry: FeedEntry): FeedItem | null => {
  const title = readText(entry.title);
  const url = Array.isArray(entry.link)
    ? entry.link.find((link) => !link['@_rel'] || link['@_rel'] === 'alternate')?.['@_href'] ?? ''
    : readText(entry.link);
  const publishedAt = entry.pubDate || entry.published || entry.updated || '';
  if (!title || title.startsWith('保護中:') || !isWebUrl(url) || !Number.isFinite(Date.parse(publishedAt))) return null;

  const thumbnail = entry['media:thumbnail'];
  const thumbnailUrl = typeof thumbnail === 'string' ? thumbnail : thumbnail?.['@_url'];
  return {
    title, url, publishedAt: new Date(publishedAt).toISOString(),
    ...(thumbnailUrl && isWebUrl(thumbnailUrl) ? { thumbnailUrl } : {}),
  };
};

export const parseFeedItems = (xml: string, count = 3): FeedItem[] => {
  if (count <= 0 || XMLValidator.validate(xml) !== true) return [];
  try {
    const document = parser.parse(xml) as FeedDocument;
    const entries = document.rss?.channel?.item ?? document.feed?.entry ?? [];
    const seen = new Set<string>();
    return entries.map(normalizeEntry)
      .filter((item): item is FeedItem => item !== null)
      .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
      .filter(({ url }) => {
        if (seen.has(url)) return false;
        seen.add(url);
        return true;
      })
      .slice(0, count);
  } catch {
    return [];
  }
};

export const getLatestFeedItems = async (feedUrl: string, count = 3): Promise<FeedItem[]> => {
  try {
    const res = await fetch(feedUrl, { next: { revalidate: 86400 }, signal: AbortSignal.timeout(10000) });
    if (!res.ok) {
      console.warn(`フィードの取得に失敗しました: ${feedUrl} (HTTP ${res.status})`);
      return [];
    }
    return parseFeedItems(await res.text(), count);
  } catch {
    console.warn(`フィードの取得中にエラーが発生しました: ${feedUrl}`);
    return [];
  }
};
