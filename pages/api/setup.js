// pages/api/setup.js

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const config = req.body;

  // Optionally, add admin authentication here (e.g. check a session or token)

  // Create the content for the .env.local file
  const envContent = Object.entries(config)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const envFilePath = path.join(process.cwd(), '.env.local');

  try {
    fs.writeFileSync(envFilePath, envContent, { encoding: 'utf8' });
    return res.status(200).json({ message: '.env.local updated successfully.' });
  } catch (error) {
    console.error('Error writing .env.local:', error);
    return res.status(500).json({ error: 'Failed to update configuration.' });
  }
}
