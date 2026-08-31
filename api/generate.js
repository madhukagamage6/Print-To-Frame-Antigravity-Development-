import { GoogleGenAI } from '@google/genai';

const GEMINI_MODEL = 'gemini-3.7-flash';

export default async function handler(req, res) {
  // CORS headers if needed
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is missing' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const { prompt, mimeType, audioData } = req.body || {};
    
    if (!prompt) {
      return res.status(400).json({ error: 'Missing "prompt" field in request body' });
    }

    const contents = [{ role: 'user', parts: [{ text: prompt }] }];
    
    if (mimeType && audioData) {
      contents[0].parts.push({
        inlineData: {
          mimeType: mimeType,
          data: audioData
        }
      });
    }

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: contents,
    });

    if (!response.text) {
      throw new Error('No text content in Gemini response');
    }

    res.status(200).json({ text: response.text });
  } catch (err) {
    console.error('API Proxy Error:', err.message);
    res.status(502).json({ error: err.message });
  }
}
