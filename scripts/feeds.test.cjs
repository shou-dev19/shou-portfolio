const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { test } = require('node:test');
const Module = require('node:module');
const ts = require('typescript');

// Exercise the production TypeScript module without adding a test runner dependency.
const loadTypeScript = (name) => {
  const filename = resolve(__dirname, `../src/lib/${name}.ts`);
  const compiled = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const compiledModule = new Module(filename, module);
  compiledModule.filename = filename;
  compiledModule.paths = Module._nodeModulePaths(resolve(__dirname, '../src/lib'));
  const originalRequire = compiledModule.require.bind(compiledModule);
  compiledModule.require = (id) => id === './youtube' ? loadTypeScript('youtube') : originalRequire(id);
  compiledModule._compile(compiled, filename);
  return compiledModule.exports;
};
const { parseFeedItems, getLatestFeedItems } = loadTypeScript('feeds');

const rssItem = (title, link, date) => `<item><title>${title}</title><link>${link}</link><pubDate>${date}</pubDate></item>`;
const rss = (items) => `<rss version="2.0"><channel>${items}</channel></rss>`;
const atomEntry = (id, published, updated = published) => `<entry>
<title>AI記事 ${id}</title><published>${published}</published><updated>${updated}</updated>
<link rel="self" href="https://qiita.com/api/${id}"/>
<link type="text/html" href="https://qiita.com/shou-dev19/items/${id}" rel="alternate"/>
</entry>`;
const atom = (entries) => `<feed xmlns="http://www.w3.org/2005/Atom">${entries}</feed>`;

test('RSS preserves Blog/note titles, dates, and both thumbnail formats', () => {
  const xml = rss(`<item><title><![CDATA[AI & 開発]]></title><link>https://example.com/post?a=1&amp;b=2</link>
    <pubDate>Tue, 08 Sep 2026 00:00:00 GMT</pubDate><media:thumbnail url="https://example.com/image.png"/></item>
    <item><title>日本語 &#x26; &quot;技術&quot;</title><link>https://example.com/note</link>
    <pubDate>Mon, 07 Sep 2026 00:00:00 GMT</pubDate><media:thumbnail>https://example.com/note.png</media:thumbnail></item>`);
  const result = parseFeedItems(xml);
  assert.equal(result.length, 2);
  assert.equal(result[0].title, 'AI & 開発');
  assert.equal(result[0].url, 'https://example.com/post?a=1&b=2');
  assert.equal(result[0].publishedAt, '2026-09-08T00:00:00.000Z');
  assert.equal(result[0].thumbnailUrl, 'https://example.com/image.png');
  assert.equal(result[1].title, '日本語 & "技術"');
  assert.equal(result[1].thumbnailUrl, 'https://example.com/note.png');
});

test('Atom selects the article link and orders by publication, not edit date', () => {
  const result = parseFeedItems(atom(
    atomEntry('older', '2026-08-04T17:50:22+09:00', '2026-09-08T00:00:00Z') +
    atomEntry('newer', '2026-08-11T08:03:17+09:00'),
  ));
  assert.equal(result[0].url, 'https://qiita.com/shou-dev19/items/newer');
  assert.equal(result[1].publishedAt, '2026-08-04T08:50:22.000Z');
});

test('WordPress CDATA titles decode character references without double-decoding XML text', () => {
  const result = parseFeedItems(rss(
    rssItem('<![CDATA[AI &#8211; 開発 &amp; 運用]]>', 'https://example.com/a', '2026-09-08') +
    rssItem('コードの &amp;amp; 表記', 'https://example.com/b', '2026-09-08'),
  ));
  assert.equal(result[0].title, 'AI – 開発 & 運用');
  assert.equal(result[1].title, 'コードの &amp; 表記');
});

test('Single RSS and Atom entries are normalized into arrays', () => {
  assert.equal(parseFeedItems(rss(rssItem('記事', 'https://example.com/a', '2026-09-08'))).length, 1);
  assert.equal(parseFeedItems(atom(atomEntry('one', '2026-09-08'))).length, 1);
});

test('Real Qiita Atom fixture yields three newest articles', () => {
  const result = parseFeedItems(readFileSync(resolve(__dirname, 'fixtures/qiita.atom.xml'), 'utf8'));
  assert.equal(result.length, 3);
  assert.match(result[0].title, /後編/);
  assert.match(result[1].title, /前編/);
  assert.equal(result[0].url, 'https://qiita.com/shou-dev19/items/0f4ee962b89a322eefc0');
});

test('Skips invalid dates, unsafe URLs and protected posts without losing valid articles', () => {
  const result = parseFeedItems(rss(
    rssItem('missing link', '', '2026-09-08') +
    rssItem('unsafe', 'javascript:alert(1)', '2026-09-08') +
    rssItem('invalid date', 'https://example.com/b', 'invalid') +
    rssItem('保護中: 下書き', 'https://example.com/c', '2026-09-08') +
    rssItem('valid', 'https://example.com/d', '2026-09-08'),
  ));
  assert.deepEqual(result.map(({ title }) => title), ['valid']);
});

test('Limits results after deduplication and handles empty or malformed feeds', () => {
  const entries = ['a', 'a', 'b', 'c', 'd'].map((id) => rssItem(id, `https://example.com/${id}`, '2026-09-08')).join('');
  assert.deepEqual(parseFeedItems(rss(entries)).map(({ title }) => title), ['a', 'b', 'c']);
  assert.deepEqual(parseFeedItems(rss(entries), 0), []);
  for (const xml of ['', '<rss>', '<feed></feed>', '<html>unavailable</html>']) {
    assert.deepEqual(parseFeedItems(xml), []);
  }
});

test('Fetch success uses daily revalidation and a timeout signal', async (t) => {
  t.mock.method(global, 'fetch', async (_url, options) => {
    assert.equal(options.next.revalidate, 86400);
    assert.ok(options.signal instanceof AbortSignal);
    return new Response(atom(atomEntry('one', '2026-09-08')));
  });
  assert.equal((await getLatestFeedItems('https://example.com/feed')).length, 1);
});

test('HTTP and network failures return an empty list for the UI fallback', async (t) => {
  t.mock.method(console, 'warn', () => {});
  const fetchMock = t.mock.method(global, 'fetch', async () => new Response('', { status: 503 }));
  assert.deepEqual(await getLatestFeedItems('https://example.com/feed'), []);
  fetchMock.mock.mockImplementation(async () => { throw new Error('timeout'); });
  assert.deepEqual(await getLatestFeedItems('https://example.com/feed'), []);
});
