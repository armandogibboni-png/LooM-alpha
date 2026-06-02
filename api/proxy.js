const PROVIDERS = {
  anthropic: {
    url: 'https://api.anthropic.com/v1/messages',
    buildHeaders: (key) => ({
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    }),
    buildBody: (body) => body,
    parseResponse: (data) => data,
  },
  groq: {
    url: 'https://api.groq.com/openai/v1/chat/completions',
    buildHeaders: (key) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    }),
    buildBody: (body) => ({
      model: body.model,
      max_tokens: body.max_tokens,
      messages: body.system
        ? [{ role: 'system', content: body.system }, ...body.messages]
        : body.messages,
    }),
    parseResponse: (data) => ({
      content: [{ type: 'text', text: data.choices?.[0]?.message?.content || '' }],
    }),
  },
  gemini: {
    buildUrl: (key) => `https://generativelanguage.googleapis.com/v1beta/openai/chat/completions`,
    buildHeaders: (key) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    }),
    buildBody: (body) => ({
      model: body.model,
      max_tokens: body.max_tokens,
      messages: body.system
        ? [{ role: 'system', content: body.system }, ...body.messages]
        : body.messages,
    }),
    parseResponse: (data) => ({
      content: [{ type: 'text', text: data.choices?.[0]?.message?.content || '' }],
    }),
  },
  mistral: {
    url: 'https://api.mistral.ai/v1/chat/completions',
    buildHeaders: (key) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    }),
    buildBody: (body) => ({
      model: body.model,
      max_tokens: body.max_tokens,
      messages: body.system
        ? [{ role: 'system', content: body.system }, ...body.messages]
        : body.messages,
    }),
    parseResponse: (data) => ({
      content: [{ type: 'text', text: data.choices?.[0]?.message?.content || '' }],
    }),
  },
  openrouter: {
    url: 'https://openrouter.ai/api/v1/chat/completions',
    buildHeaders: (key) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
      'HTTP-Referer': 'https://loom-alpha.vercel.app',
      'X-Title': 'L.O.O.M. // SWARM CORE',
    }),
    buildBody: (body) => ({
      model: body.model,
      max_tokens: body.max_tokens,
      messages: body.system
        ? [{ role: 'system', content: body.system }, ...body.messages]
        : body.messages,
    }),
    parseResponse: (data) => ({
      content: [{ type: 'text', text: data.choices?.[0]?.message?.content || '' }],
    }),
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key, x-provider');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = req.headers['x-api-key'];
  const provider = req.headers['x-provider'] || 'anthropic';

  if (!apiKey) return res.status(400).json({ error: 'Missing x-api-key header' });

  const p = PROVIDERS[provider];
  if (!p) return res.status(400).json({ error: `Unknown provider: ${provider}` });

  try {
    const url = p.buildUrl ? p.buildUrl(apiKey) : p.url;
    const response = await fetch(url, {
      method: 'POST',
      headers: p.buildHeaders(apiKey),
      body: JSON.stringify(p.buildBody(req.body)),
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);

    return res.status(200).json(p.parseResponse(data));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
