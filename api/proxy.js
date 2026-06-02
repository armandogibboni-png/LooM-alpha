const PROVIDERS = {
  anthropic: {
    url: 'https://api.anthropic.com/v1/messages',
    headers: (key) => ({
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    }),
    body: (b) => b,
    parse: (d) => d,
  },
  groq: {
    url: 'https://api.groq.com/openai/v1/chat/completions',
    headers: (key) => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` }),
    body: (b) => ({ model: b.model, max_tokens: b.max_tokens, messages: b.system ? [{ role: 'system', content: b.system }, ...b.messages] : b.messages }),
    parse: (d) => ({ content: [{ type: 'text', text: d.choices?.[0]?.message?.content || '' }] }),
  },
  gemini: {
    url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
    headers: (key) => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` }),
    body: (b) => ({ model: b.model, max_tokens: b.max_tokens, messages: b.system ? [{ role: 'system', content: b.system }, ...b.messages] : b.messages }),
    parse: (d) => ({ content: [{ type: 'text', text: d.choices?.[0]?.message?.content || '' }] }),
  },
  mistral: {
    url: 'https://api.mistral.ai/v1/chat/completions',
    headers: (key) => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` }),
    body: (b) => ({ model: b.model, max_tokens: b.max_tokens, messages: b.system ? [{ role: 'system', content: b.system }, ...b.messages] : b.messages }),
    parse: (d) => ({ content: [{ type: 'text', text: d.choices?.[0]?.message?.content || '' }] }),
  },
  openrouter: {
    url: 'https://openrouter.ai/api/v1/chat/completions',
    headers: (key) => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}`, 'HTTP-Referer': 'https://loo-m-alpha.vercel.app', 'X-Title': 'L.O.O.M. // SWARM CORE' }),
    body: (b) => ({ model: b.model, max_tokens: b.max_tokens, messages: b.system ? [{ role: 'system', content: b.system }, ...b.messages] : b.messages }),
    parse: (d) => ({ content: [{ type: 'text', text: d.choices?.[0]?.message?.content || '' }] }),
  },
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key, x-provider');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = req.headers['x-api-key'];
  const providerKey = req.headers['x-provider'] || 'anthropic';
  if (!apiKey) return res.status(400).json({ error: 'Missing x-api-key' });

  const p = PROVIDERS[providerKey];
  if (!p) return res.status(400).json({ error: `Unknown provider: ${providerKey}` });

  try {
    const response = await fetch(p.url, {
      method: 'POST',
      headers: p.headers(apiKey),
      body: JSON.stringify(p.body(req.body)),
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);
    return res.status(200).json(p.parse(data));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
