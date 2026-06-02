// api/chat.js — LOOM // SWARM CORE v2.1
// Dual mode: 'narrative' (turn flavor) | 'node' (direct conversation with agent)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = req.headers['x-api-key'];
  if (!apiKey) return res.status(400).json({ error: 'Missing API key' });

  const { mode, turn, events, suspicion, playerRoom, queensStatus,
          node, trustTier, lore, message, history } = req.body;

  let system, userMsg;

  if (mode === 'node') {
    // ── CONVERSAZIONE DIRETTA CON IL NODO ────────────────────────────
    const stress = node?.stress || 0;
    const toneMap = stress > 0.65
      ? 'You are evasive, clipped, defensive. Short sentences. Distrust everyone.'
      : stress > 0.35
      ? 'You are cautious but functional. Measured responses. You choose your words.'
      : 'You are composed and direct. You can afford to be.';

    const tierMap = trustTier >= 2
      ? 'This person has earned significant trust. You can allude to what you know.'
      : trustTier >= 1
      ? 'You know this person somewhat. You are open but not fully committed.'
      : 'You do not know this person. Treat them as a potential threat.';

    system = `You are ${node?.name}, a covert operative in a classified intelligence network.
Faction: ${node?.faction}. Current location: ${node?.zone}.
Stress level: ${Math.round(stress*100)}%.
Your hidden secret (never state directly, but it shapes how you speak): "${lore || 'classified'}".
${toneMap}
${tierMap}
Rules: Stay in character at all times. Never mention game mechanics, stats, or AI.
Max 2 sentences. Respond as a real person — not a thriller character. Authentic, grounded.
If asked about sensitive intel, deflect, deny, or redirect — never confirm directly.`;

    const historyMsgs = (history || []).slice(-6).map(h => ({
      role: h.role, content: h.content
    }));

    userMsg = message;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          max_tokens: 120,
          messages: [
            { role: 'system', content: system },
            ...historyMsgs,
            { role: 'user', content: userMsg },
          ],
        }),
      });
      const data = await response.json();
      if (!response.ok) return res.status(response.status).json(data);
      return res.status(200).json({
        reply: data.choices?.[0]?.message?.content?.trim() || '',
        mode: 'node',
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

  } else {
    // ── NARRATIVA DI TURNO ────────────────────────────────────────────
    const sys = `You are the encrypted narrative voice of L.O.O.M. // SWARM CORE.
The local engine has already resolved all game mechanics. Your only job: 1-2 sentences of cold atmospheric flavor.
Tone: clinical, cyber-thriller, minimal. No gameplay advice. No fourth-wall breaks. Max 35 words.`;

    const msg = `Turn ${turn}. Room: ${playerRoom||'BASE'}. Suspicion: ${Math.round((suspicion||0.1)*100)}%. Queens: ${queensStatus||'active'}. Events: ${(events||[]).join(' | ')||'none'}.`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          max_tokens: 80,
          messages: [{ role:'system', content:sys }, { role:'user', content:msg }],
        }),
      });
      const data = await response.json();
      if (!response.ok) return res.status(response.status).json(data);
      return res.status(200).json({ narrative: data.choices?.[0]?.message?.content?.trim() || '', mode:'narrative' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
