// prose.js — LOOM // SWARM CORE
// Dati di contesto: config, lore, missioni, fallback narrativo

export const CONTEXT_CONFIG = {
  LOOM_CORE: {
    label: '🕵 LOOM // SWARM CORE',
    subtitle: 'Infiltra la rete. Neutralizza le regine. Non farti scoprire.',
    factions: ['REGULARS','PREMIUM','COMPETITORS','INSPECTORS'],
    factionLabels: { REGULARS:'REG', PREMIUM:'PRM', COMPETITORS:'COM', INSPECTORS:'NSA' },
    factionColors: {
      REGULARS:    '#00e5ff',
      PREMIUM:     '#ea80fc',
      COMPETITORS: '#ff3d00',
      INSPECTORS:  '#ffab00',
    },
    factionCenters: {
      REGULARS:    { rx:0.25, ry:0.28 },
      PREMIUM:     { rx:0.75, ry:0.28 },
      COMPETITORS: { rx:0.25, ry:0.72 },
      INSPECTORS:  { rx:0.75, ry:0.72 },
    },
    zones: [
      { label:'Server Room',        rx:0.25, ry:0.25, rr:0.11 },
      { label:'The Embassy',        rx:0.75, ry:0.25, rr:0.11 },
      { label:'Encrypted Channel',  rx:0.50, ry:0.48, rr:0.13 },
      { label:'Black Site',         rx:0.25, ry:0.72, rr:0.09 },
      { label:'Press Room',         rx:0.75, ry:0.68, rr:0.09 },
      { label:'External Safehouse', rx:0.50, ry:0.88, rr:0.10 },
    ],
    winType: 'NEUTRALIZE',
    beaconLabels: {
      COLD:'COLD', WARM:'WARM', HOT:'HOT',
      SOVEREIGN:'SOVEREIGN', TARGET:'TARGET', HANDLER:'HANDLER',
    },
    postureLabels: {
      OMBRA:'SHADOW', NEUTRALE:'STANDARD', VISIBILE:'EXPOSED', BASE:'HOME BASE',
    },
  }
};

// ── LORE PER FAZIONE ─────────────────────────────────────────────────────────
export const LORE_BY_CONTEXT = {
  LOOM_CORE: {
    REGULARS: [
      'Has cycled through three cover identities in six months. None held longer than four weeks.',
      'Knows their handler is using them as bait. Waiting for the right moment to disappear.',
      'Keeps an encrypted log of every order received. Life insurance.',
      'Has family in a country they cannot name. That makes them manageable.',
      'Failed their last mission and falsified the report. Someone knows.',
      'Every time they enter a new room, they locate the exits first.',
      'Speaks three languages. Denies two of them when convenient.',
      'Joined the network for money. Stayed because of fear.',
      'Knows the real name of at least two sovereigns. Has never told anyone.',
      'Their phone has a backup SIM that no one knows about.',
    ],
    PREMIUM: [
      'Has frequented the same three restaurants for ten years. Not habit — protocol.',
      'Their reputation is built on an event that never happened the way they tell it.',
      'Has bought information from both sides. Considers this balance.',
      'Knows the names of the seven intermediaries holding this network together.',
      'Left a country for reasons that do not add up.',
      'Changes supplier every six months. Not preference — security.',
      'Knows where COMPETITORS communications are archived. Has never used it.',
      'Has a verbal agreement with one sovereign that no third party knows about.',
      'Their accent shifts slightly when lying. Only people who know them well notice.',
      'Burned one contact to save another. Still not sure they chose correctly.',
    ],
    COMPETITORS: [
      'Has been in the network long enough to know who should trust whom. Never does.',
      'Building a file on someone in their own faction. Exit plan.',
      'Their stated objective and their real one have not aligned for months.',
      'Knows there is a mole in their faction. Decided to wait rather than act.',
      'Has sold intel to REGULARS twice. Neither side knows.',
      'Their network access is based on credentials they should not have yet.',
      'Fakes incompetence in at least three areas where they are actually expert.',
      'Has an arrangement with an INSPECTOR. Neither of them would call it that.',
      'Their cover behavior is so convincing that sometimes they believe it themselves.',
      'Knows exactly when suspicion on their faction will reach critical.',
    ],
    INSPECTORS: [
      'Their official mandate is narrower than what they are actually investigating.',
      'Found something three weeks ago that has not gone into the report yet.',
      'Knows at least one network element not in their dossier. Deliberate choice.',
      'Their superior does not know they are here. Operating with unauthorized autonomy.',
      'Closed a case three years ago in a way that allowed someone to keep working.',
      'Not all the documents they can access are documents they have the right to read.',
      'Building evidence on someone much higher in the command chain.',
      'The final report will have omissions. Intentional.',
      'Has crossed this network before, in a different context, under a different name.',
      'Suspects someone in their own office is monitoring them.',
    ],
  }
};

// ── MISSION TEMPLATES ────────────────────────────────────────────────────────
export const MISSION_TEMPLATES = {
  LOOM_CORE: {
    REGULARS: [
      'Our asset {target} in Server Room has something they have not told us. Find out what.',
      '{target} from REGULARS is moving irregularly. Monitor and report.',
      'We need to know what {target} knows. By whatever means necessary.',
    ],
    PREMIUM: [
      '{target} from PREMIUM has access to something they should not have. Document it.',
      'The intermediary {target} works both sides. Find out which side more.',
      'We need three contacts from {target}. It does not matter how you get them.',
    ],
    COMPETITORS: [
      '{target} from COMPETITORS is about to make a move. Get ahead of it.',
      '{target}\'s handler does not know {target} has already chosen a side. Confirm it.',
      'Neutralize {target} before they complete the transfer. You have 8 turns.',
    ],
    INSPECTORS: [
      '{target} from INSPECTORS is getting too close. Slow them down.',
      'Find out what {target} already has in the dossier. Then decide the next step.',
      '{target} has a network contact we have not identified. Find them.',
    ],
    DEFAULT: [
      '{target} has something. Find it before they use it.',
      'Get close to {target}. We need to know if they are still reliable.',
    ]
  }
};

// ── AMBIENT INTERCEPTS (testo flavor per il monitor) ─────────────────────────
export const AMBIENT_INTERCEPTS = {
  LOOM_CORE: {
    'Server Room': [
      'Credentials rotated at 03:14. No log entry.',
      'Anomalous traffic on port 443. Duration: 8 seconds. Origin: untraceable.',
      'A node stopped pulsing. It did not go offline — it went silent.',
      '{a} opened a file they should not have known existed.',
      'Latency up 340% over the last 4 minutes. Someone is copying something.',
    ],
    'The Embassy': [
      '{a} and {b} met for eleven minutes. No record.',
      'A diplomatic pouch left outside protocol.',
      '{a} changed tables three times during dinner. Nerves or procedure?',
      'The secure line was used at 02:00. It was not scheduled.',
      'Two people with the same handler in the same location. Unlikely coincidence.',
    ],
    'Encrypted Channel': [
      'Unusual packet fragmentation. Someone is hiding something in the noise.',
      '{a} used a protocol that had been dormant for six months.',
      'The channel was stress-tested three times in the last two hours. Stability check or cover test?',
      'A message was sent and immediately deleted. Only the timestamp remains.',
      'Anomalous frequency. Not an error — a signal.',
    ],
    'Black Site': [
      'No movement logged in the last 4 hours. That is the problem.',
      '{a} entered. {b} left. They did not cross paths — yet both were there.',
      'Lights stayed on all night. Not an oversight.',
      'A file was physically destroyed. In 2026. Someone was afraid of the backup.',
      'This site does not exist in public records. It exists in ours.',
    ],
    'Press Room': [
      'An article was written and pulled within twenty minutes of publication.',
      '{a} met three different journalists at three different locations. No story ran.',
      'Yesterday's anonymous source uses the same syntax as {b}.',
      'Three outlets received the same leak from three separate sources. Not a leak — a campaign.',
      'Someone is preparing a story. Not to publish it — to have it ready.',
    ],
    'External Safehouse': [
      '{a} stayed 47 minutes. Safehouses are not used that long without a reason.',
      'The property was rented three weeks ago. Cash. Under a name that does not exist.',
      'Second visit in two days. The first was reconnaissance. This one is operational.',
      'No external contact in 36 hours. Voluntary isolation or forced?',
      'The light at the back stayed on all night.',
    ],
  }
};



// ── FALLBACK NARRATIVO (quando AI non disponibile) ────────────────────────────
export const FALLBACK_TURNS = [
  'The network holds. Nodes shift. No significant deviations this turn.',
  'Operational silence. Suspicion keeps the network in unstable equilibrium.',
  'Movement in the corridors. No deviation from expected patterns.',
  'COMPETITORS are reorganizing. INSPECTORS increasing scan frequency.',
  'An asset repositioned without notification. Anomaly logged, cause unknown.',
  'The network adapts. It always does. As if it knows someone is watching.',
];

export const FALLBACK_EVENTS = [
  [{type:'movement',text:'Node redistribution in Server Room.'},{type:'anxiety',text:'Latency spike on Encrypted Channel.'}],
  [{type:'movement',text:'A node changed zones without a visible trigger.'},{type:'movement',text:'INSPECTORS moving toward Press Room.'}],
  [{type:'anxiety',text:'Anomaly detected in Black Site.'},{type:'beacon',text:'Encrypted Channel has been silent too long.'}],
  [{type:'movement',text:'PREMIUM asset moved to External Safehouse.'},{type:'beacon',text:'Unusual clustering pattern detected.'}],
];

// ── QUEEN NEUTRALIZATION SCENES ──────────────────────────────────────────────
export const QUEEN_SCENES = {
  ISOLATION: [
    'The network just got quieter. Not because of silence — because one voice stopped.',
    'Four burned. The sovereign\'s circle collapsed from the inside. That\'s how it\'s done.',
    'Isolation complete. She\'s still in the room. She just can\'t reach anyone anymore.',
  ],
  EXPOSURE: [
    'The dossier landed. Everything she built over three years — visible in fourteen pages.',
    'Secrets have a shelf life. This one just expired.',
    'The exposure didn\'t destroy her. It just made her irrelevant. Which is worse.',
  ],
};

// ── MOLE EXPOSED SCENES ───────────────────────────────────────────────────────
export const MOLE_EXPOSED_SCENES = [
  'The signal was always there. You just needed to know what you were looking at.',
  'Burned. They\'ll call it a coincidence in the official report. You know what it was.',
  'The network adjusts. A gap where there was a node. Clean.',
];

export const MOLE_WRONG_ACCUSATION = [
  'Wrong call. The faction noticed. Trust is a resource — you just spent some.',
  'Clean target. The accusation created a problem that didn\'t exist before.',
  'Incorrect. The real mole is still in position. And now they know you\'re looking.',
];

// ── QUEEN STAGE DESCRIPTIONS ─────────────────────────────────────────────────
export const QUEEN_STAGE_DESC = {
  UNKNOWN:    'No data. This sovereign has not been identified.',
  IDENTIFIED: 'Located. Alert level tracked. Approach with caution.',
  PRESSURED:  'Network weakening. Followers exposed, secrets surfacing.',
  EXPOSED:    'Neutralization within reach. One more move.',
  NEUTRALIZED:'Operation complete. This sovereign is no longer a threat.',
};

// ── FOG LABELS ───────────────────────────────────────────────────────────────
export const FOG_LABELS = [
  '[ENCRYPTED_NODE]', '[UNKNOWN_ASSET]', '[UNIDENTIFIED]',
  '[DARK_NODE]', '[SIGNAL_UNKNOWN]', '[CLASSIFICATION_5]',
];
