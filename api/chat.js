// api/chat.js — LOOM // SWARM CORE
// Narrative-only handler: riceve il delta del turno già calcolato dal motore locale
// Restituisce 1-2 frasi di flavor text. Il gioco gira anche senza AI.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = req.headers['x-api-key'];
  if (!apiKey) return res.status(400).json({ error: 'Missing API key' });

  const { turn, events, suspicion, playerRoom, queensStatus } = req.body;

  const sys = `You are the narrative voice of "L.O.O.M. // SWARM CORE" — a cold, encrypted intelligence network.
Every turn the local engine resolves all game logic. Your only job: write 1-2 sentences of atmospheric flavor text that describe the turn's mood.
Rules:
- Cold, clinical, cyber-thriller tone. No adjectives that are too dramatic.
- Reference specific events passed in the context if relevant.
- Never give gameplay advice. Never break the fourth wall.
- Max 40 words total. English only.`;

  const userMsg = `Turn ${turn}. 
Player room: ${playerRoom || 'BASE'}.
Network suspicion: ${Math.round((suspicion||0.1)*100)}%.
Queens: ${queensStatus || 'both active'}.
Events this turn: ${(events||[]).join(' | ') || 'none'}.
Write 1-2 sentences of flavor narrative.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 80,
        messages: [
          { role: 'system', content: sys },
          { role: 'user',   content: userMsg },
        ],
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);

    return res.status(200).json({
      narrative: data.choices?.[0]?.message?.content?.trim() || '',
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
