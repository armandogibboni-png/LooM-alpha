# L.O.O.M. // SWARM CORE
### Local Opinion Overhaul Monitor — v1.0 Alpha

A text-based, data-driven espionage and political cyber-thriller simulator.  
BYO-API public trial — powered by Anthropic Claude Sonnet.

---

## How to Play

1. Get an [Anthropic API key](https://console.anthropic.com/)
2. Open the game, paste your key in the **API KEY** field and hit **CONNECT**
3. Select one or more **Field Directives** to queue for the turn
4. Hit **ADVANCE TURN** — the AI engine processes your moves, triggers global events, and updates all 50 node entities across the 6 classified rooms
5. Survive the audit. Hunt the moles. Control the narrative.

> Your API key is never stored or sent to any server other than Anthropic's own API directly from your browser.

---

## The Grid

| Room | Code | Role |
|------|------|------|
| Server Room | SERVER | Digital hub. High breach exposure. |
| The Embassy | EMBASSY | Diplomatic soil. Premium assets. |
| Encrypted Channel | DARKNET | Dark web node. Rogue cells. |
| Black Site | BLACKSITE | Detention. Mole interrogation. |
| Press Room | PRESS | Info leaks spread globally here. |
| External Safehouse | SAFEHOUSE | Tactical base. Zero revenue. |

## The Power Triangle

- **INTEL** (The Directory) — Operational leverage
- **DIPLOMACY** (The Ministry) — International backing
- **SANCTION** (The Agency) — Enforcement capacity

## Node Factions

- `REGULAR` — Field agents / civil informants
- `PREMIUM` — Diplomats / high-tier assets
- `COMPETITOR` — Rogue cells / foreign moles
- `INSPECTOR` — NSA auditors

---

## Tech Stack

- Pure HTML/CSS/JS — zero dependencies, zero build step
- Anthropic Claude Sonnet via direct browser fetch (BYO-API)
- Deployed on Vercel (static)

---

## Deploy Your Own

```bash
git clone https://github.com/YOUR_USERNAME/loom-swarm-core
cd loom-swarm-core
# drag folder to vercel.com/new or:
npx vercel
```

---

## Roadmap

- [ ] Save/load game state (localStorage)
- [ ] Win/lose conditions and endgame screen
- [ ] Node detail modal on click
- [ ] Mobile layout
- [ ] Localization: Italian, French, German

---

*L.O.O.M. // SWARM CORE is an independent game project. Not affiliated with Anthropic.*
