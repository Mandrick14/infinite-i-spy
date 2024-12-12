// pages/api/generate-items.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { imageDescription } = req.body;

    if (!imageDescription) {
      return res.status(400).json({ error: 'Image description is required' });
    }

    try {
      const prompt = `Given the following description of an image: "${imageDescription}", list 4 distinct items that would be fun and appropriate for an "I Spy" game. Provide the list in a JSON format like {"items": ["item1", "item2", "item3", "item4"]}.`;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 100,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      const itemsText = response.data.choices[0].message.content;
      const items = JSON.parse(itemsText).items;
      res.status(200).json({ items });
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Item generation failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
