import { BetaAnalyticsDataClient } from '@google-analytics/data';

const CHANNEL_ID = 'UCMipk_M3zSM9hx6V2wFBIWg';

const checkYouTubeStats = async () => {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    throw new Error('YouTube統計: YOUTUBE_API_KEYが未設定です');
  }

  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`YouTube統計: HTTP ${response.status}`);
  }

  const data = await response.json();
  const statistics = data.items?.[0]?.statistics;

  if (!statistics) {
    throw new Error('YouTube統計: レスポンスに統計情報がありません');
  }

  return {
    subscriberCount: Number(statistics.subscriberCount),
    videoCount: Number(statistics.videoCount),
    viewCount: Number(statistics.viewCount),
  };
};

const checkBlogPageViews = async () => {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const clientEmail = process.env.GA4_CLIENT_EMAIL;
  const privateKey = process.env.GA4_PRIVATE_KEY;

  if (!propertyId || !clientEmail || !privateKey) {
    throw new Error('ブログ月間PV: GA4の環境変数が不足しています');
  }

  const client = new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey.replace(/\\n/g, '\n'),
    },
  });
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'yesterday' }],
    metrics: [{ name: 'screenPageViews' }],
  });
  const pageViews = Number(response.rows?.[0]?.metricValues?.[0]?.value);

  if (!Number.isFinite(pageViews)) {
    throw new Error('ブログ月間PV: レスポンス形式が不正です');
  }

  return pageViews;
};

const main = async () => {
  let failed = false;

  try {
    const youtubeStats = await checkYouTubeStats();
    console.log('YouTube統計:', youtubeStats);
  } catch (error) {
    failed = true;
    console.error(error instanceof Error ? error.message : 'YouTube統計: 不明なエラー');
  }

  try {
    const blogMonthlyPv = await checkBlogPageViews();
    console.log('ブログ月間PV:', blogMonthlyPv);
  } catch (error) {
    failed = true;
    console.error(error instanceof Error ? error.message : 'ブログ月間PV: 不明なエラー');
  }

  if (failed) {
    process.exitCode = 1;
  }
};

await main();
