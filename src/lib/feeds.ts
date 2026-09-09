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
  'media:content'?: string | { '@_url'?: string };
  enclosure?: { '@_url'?: string; '@_type'?: string };
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
  const mediaContent = entry['media:content'];
  const enclosure = entry.enclosure?.['@_type']?.startsWith('image/') ? entry.enclosure['@_url'] : undefined;
  const thumbnailUrl = (typeof thumbnail === 'string' ? thumbnail : thumbnail?.['@_url'])
    || (typeof mediaContent === 'string' ? mediaContent : mediaContent?.['@_url'])
    || enclosure;
  return {
    title, url, publishedAt: new Date(publishedAt).toISOString(),
    ...(thumbnailUrl && isWebUrl(thumbnailUrl) ? { thumbnailUrl } : {}),
  };
};

const readOgImage = (html: string): string | undefined => {
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of metaTags) {
    const property = tag.match(/\b(?:property|name)\s*=\s*["']([^"']+)["']/i)?.[1];
    if (!['og:image', 'twitter:image'].includes(property?.toLowerCase() ?? '')) continue;
    const content = tag.match(/\bcontent\s*=\s*["']([^"']+)["']/i)?.[1];
    if (!content) continue;
    const imageUrl = decodeXmlEntities(content);
    if (isWebUrl(imageUrl)) return imageUrl;
  }
  return undefined;
};

const addMissingThumbnail = async (item: FeedItem): Promise<FeedItem> => {
  if (item.thumbnailUrl) return item;
  try {
    const res = await fetch(item.url, { next: { revalidate: 86400 }, signal: AbortSignal.timeout(10000) });
    if (!res.ok) return item;
    const thumbnailUrl = readOgImage(await res.text());
    return thumbnailUrl ? { ...item, thumbnailUrl } : item;
  } catch {
    return item;
  }
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
    const items = parseFeedItems(await res.text(), count);
    return Promise.all(items.map(addMissingThumbnail));
  } catch {
    console.warn(`フィードの取得中にエラーが発生しました: ${feedUrl}`);
    return [];
  }
};
