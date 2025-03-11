import { createChallenge } from 'altcha-lib';
import type { NextApiRequest, NextApiResponse } from 'next';

if (!process.env.ALTCHA_HMAC_KEY) {
  throw new Error('ALTCHA_HMAC_KEY environment variable is not set');
}

const HMAC_KEY = process.env.ALTCHA_HMAC_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const challenge = await createChallenge({
      hmacKey: HMAC_KEY,
      maxNumber: 100000, // Lower number for faster verification
      expires: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiry
    });

    res.status(200).json(challenge);
  } catch (error) {
    console.error('Challenge creation error:', error);
    res.status(500).json({ error: 'Failed to create challenge' });
  }
}
