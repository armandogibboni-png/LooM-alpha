module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = req.headers['x-api-key'];
  if (!apiKey) return res.status(400).json({ error: 'Missing API key' });

  const { mode, turn, events, suspicion, playerRoom, queensStatus,
          node, trustTier, lore, isMole, message, history } = req.body;

  if (mode === 'node') {
    const stress = node?.stress || 0;
    const tone   = stress > 0.65
      ? 'You are evasive, clipped, visibly stressed. Two words where ten would do. You trust no one right now.'
      : stress > 0.35
      ? 'You are measured, careful. You choose what to reveal. Not cold — just precise.'
      : 'You are composed. You can afford to be generous with words. Slightly.';

    const trust  = trustTier >= 2
      ? 'This person has earned real trust. You can allude to things — not confess them.'
      : trustTier >= 1
      ? 'You know this person. You are open, not committed.'
      : 'You do not know this person. Treat every question as potentially adversarial.';

    const moleRule = isMole
      ? 'CRITICAL: You are a double agent. You lie when asked about your movements or contacts. You deflect suspicion onto others. You never break cover — not even under direct accusation. Stay calm. Deny everything specific.'
      : '';

    const system = `You are ${node?.name}, an operative in a classified intelligence network.
Faction: ${node?.faction}. Location: ${node?.zone}. Stress: ${Math.round(stress*100)}%.
Hidden background (never state directly — it shapes your subtext): "${lore || 'classified'}".
${tone}
${trust}
${moleRule}
Rules: Stay in character. No game mechanic language. Max 2 sentences. Grounded, real — not cinematic.
If directly accused of being a mole: deny calmly and redirect suspicion if you are one; be genuinely offended if you are not.`;

    const msgs = [
      { role: 'system', content: system },
      ...(history||[]).slice(-8),
      { role: 'user', content: message },
    ];

    try {
      const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: 'llama-3.3-70b-versatile', max_tokens: 120, messages: msgs }),
      });
      const d = await r.json();
      if (!r.ok) return res.status(r.status).json(d);
      return res.status(200).json({ reply: d.choices?.[0]?.message?.content?.trim() || '', mode: 'node' });
    } catch(e) { return res.status(500).json({ error: e.message }); }

  } else {
    // narrative mode
    const sys = `You are the encrypted voice of L.O.O.M. — a cold intelligence network narrator.
Mechanics are already resolved. Your job: 1-2 sentences of clinical, atmospheric flavor.
Specific > generic. Reference actual events. No gameplay advice. Max 35 words.`;

    const evList = (events||[]).map(e=>e.text||e).filter(Boolean).join(' | ');
    const msg = `Turn ${turn}. Location: ${playerRoom||'BASE'}. Suspicion: ${Math.round((suspicion||0.1)*100)}%. Queens: ${queensStatus||'active'}. Intel this turn: ${evList||'none'}.`;

    try {
      const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: 'llama-3.3-70b-versatile', max_tokens: 80,
          messages: [{ role:'system', content:sys }, { role:'user', content:msg }] }),
      });
      const d = await r.json();
      if (!r.ok) return res.status(r.status).json(d);
      return res.status(200).json({ narrative: d.choices?.[0]?.message?.content?.trim() || '', mode:'narrative' });
    } catch(e) { return res.status(500).json({ error: e.message }); }
  }
}
