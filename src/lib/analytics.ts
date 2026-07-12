import { BetaAnalyticsDataClient } from '@google-analytics/data';

export async function getBlogMonthlyPageViews(): Promise<number | null> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const clientEmail = process.env.GA4_CLIENT_EMAIL;
  const privateKey = process.env.GA4_PRIVATE_KEY;

  if (!propertyId || !clientEmail || !privateKey) {
    console.warn('ブログ月間PVを取得できません: GA4の環境変数が不足しています');
    return null;
  }

  try {
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
      console.warn('ブログ月間PVを取得できません: レスポンス形式が不正です');
      return null;
    }

    return pageViews;
  } catch (error) {
    console.warn('ブログ月間PVの取得中にエラーが発生しました', error);
    return null;
  }
}
