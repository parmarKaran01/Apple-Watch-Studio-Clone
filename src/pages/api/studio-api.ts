import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { product, collection, section, watchCases, watchBands } = req.query;

  try {
    const queryParams = new URLSearchParams({
      product: product as string,
      'option.watch_cases': watchCases as string,
      'option.watch_bands': watchBands as string,
      ...(section ? { section: section as string } : {}),
      ...(collection ? { collection: collection as string } : {}),

    });

    const response = await axios.get(`https://www.apple.com/shop/studio-data?${queryParams.toString()}`, {
      headers: {
        'accept': '*/*',
        'accept-language': 'en-GB,en;q=0.7',
        'cache-control': 'no-cache',
        'referer': 'https://www.apple.com/shop/studio/apple-watch',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
      }
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching studio data:', error);
    res.status(500).json({ error: 'Failed to fetch studio data' });
  }
} 