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
      'Ha copiato tre identità di copertura negli ultimi sei mesi. Nessuna ha retto più di quattro settimane.',
      'Sa che il suo handler lo sta usando come esca. Sta aspettando il momento giusto per sparire.',
      'Tiene un registro cifrato di ogni ordine ricevuto. Assicurazione sulla vita.',
      'Ha una famiglia in un paese che non può nominare. Questo lo rende malleabile.',
      'Ha fallito la sua ultima missione ma ha falsificato il report. Qualcuno lo sa.',
      'Ogni volta che entra in una stanza nuova, identifica prima le uscite.',
      'Parla tre lingue. Ne nega due quando fa comodo.',
      'È entrato nella rete per soldi. È rimasto per paura.',
      'Conosce il vero nome di almeno due regine. Non l\'ha mai detto a nessuno.',
      'Il suo telefono ha una SIM di backup che nessuno conosce.',
    ],
    PREMIUM: [
      'Frequenta gli stessi tre ristoranti da dieci anni. Non è abitudine — è protocollo.',
      'La sua reputazione è costruita su un evento che non è mai avvenuto come racconta.',
      'Ha comprato informazioni da entrambe le parti. Considera questo equilibrio.',
      'Conosce il nome dei sette intermediari che tengono in piedi questa rete.',
      'Ha lasciato un country per ragioni che non tornano.',
      'Ogni sei mesi cambia fornitore. Non per preferenza — per sicurezza.',
      'Sa dove sono archiviate le comunicazioni dei COMPETITORS. Non lo ha mai usato.',
      'Ha un accordo verbale con una delle regine che nessuna terza parte conosce.',
      'Il suo accento cambia leggermente quando mente. Solo chi lo conosce bene se ne accorge.',
      'Ha bruciato un contatto per salvare un altro. Ancora non sa se ha scelto bene.',
    ],
    COMPETITORS: [
      'È nella rete da abbastanza a lungo da sapere chi dovrebbe fidarsi di chi. Non lo fa mai.',
      'Sta raccogliendo materiale su qualcuno nella sua stessa fazione. Piano di uscita.',
      'Il suo obiettivo dichiarato e quello reale non coincidono da mesi.',
      'Sa che c\'è un mole nella sua fazione. Ha deciso di aspettare invece di agire.',
      'Ha venduto intel ai REGULARS due volte. Nessuno dei due lo sa.',
      'Il suo accesso alla rete è basato su una credenziale che non dovrebbe avere ancora.',
      'Finge incompetenza in almeno tre aree in cui è invece esperto.',
      'Ha un accordo con un elemento degli INSPECTORS. Nessuno dei due lo chiamerebbe così.',
      'Il suo comportamento di copertura è così credibile che a volte ci crede lui stesso.',
      'Sa esattamente quando il sospetto sulla sua fazione raggiungerà il punto critico.',
    ],
    INSPECTORS: [
      'Il suo mandato ufficiale è più ristretto di quello che sta effettivamente investigando.',
      'Ha trovato qualcosa tre settimane fa che non ha ancora inserito nel rapporto.',
      'Conosce almeno un elemento nella rete che non è nel suo dossier. Scelta deliberata.',
      'Il suo superiore non sa che è qui. Opera con un margine di autonomia non autorizzato.',
      'Ha chiuso un caso tre anni fa in modo che qualcuno potesse continuare a lavorare.',
      'Non tutti i documenti che ha accesso a leggere sono documenti che ha il diritto di leggere.',
      'Sta raccogliendo prove su qualcuno molto più in alto di lui nella catena di comando.',
      'Il suo rapporto finale avrà omissioni. Intenzionali.',
      'Ha incrociato questa rete prima, in un altro contesto, sotto un altro nome.',
      'Sospetta che qualcuno nel suo stesso ufficio lo stia monitorando.',
    ],
  }
};

// ── MISSION TEMPLATES ────────────────────────────────────────────────────────
export const MISSION_TEMPLATES = {
  LOOM_CORE: {
    REGULARS: [
      'Il nostro asset {target} nel Server Room ha qualcosa che non ci ha detto. Trova cosa.',
      '{target} dei REGULARS si muove in modo irregolare. Monitora e riferisci.',
      'Dobbiamo sapere cosa sa {target}. Con qualsiasi mezzo necessario.',
    ],
    PREMIUM: [
      '{target} dei PREMIUM ha accesso a qualcosa che non dovrebbe avere. Documenta.',
      'L\'intermediario {target} lavora per entrambe le parti. Scopri per chi di più.',
      'Servono tre contatti di {target}. Non importa come li ottieni.',
    ],
    COMPETITORS: [
      '{target} dei COMPETITORS sta per fare una mossa. Anticipala.',
      'Il handler di {target} non sa che {target} ha già scelto da che parte stare. Confermalo.',
      'Neutralizza {target} prima che completi il trasferimento. Hai 8 turni.',
    ],
    INSPECTORS: [
      '{target} degli INSPECTORS si sta avvicinando troppo. Rallentalo.',
      'Scopri cosa ha già nel dossier {target}. Poi decidi il passo successivo.',
      '{target} ha un contatto nella rete che non abbiamo identificato. Trovalo.',
    ],
    DEFAULT: [
      '{target} ha qualcosa. Trovalo prima che lo usi.',
      'Avvicinati a {target}. Abbiamo bisogno di sapere se è ancora affidabile.',
    ]
  }
};

// ── AMBIENT INTERCEPTS (testo flavor per il monitor) ─────────────────────────
export const AMBIENT_INTERCEPTS = {
  LOOM_CORE: {
    'Server Room':        [
      'Qualcuno ha cambiato le credenziali alle 03:14. Nessun log.',
      'Traffico anomalo su porta 443. Durata: 8 secondi. Origine: non tracciabile.',
      'Un nodo ha smesso di pulsare. Non è andato offline — è diventato silenzioso.',
      '{a} ha aperto un file che non avrebbe dovuto sapere che esisteva.',
      'Latenza aumentata del 340% negli ultimi 4 minuti. Qualcuno sta copiando qualcosa.',
    ],
    'The Embassy':        [
      '{a} e {b} si sono incontrati per undici minuti. Nessun registro.',
      'Una valigia diplomatica è uscita fuori protocollo.',
      '{a} ha cambiato tre volte tavolo durante la cena. Nervosismo o protocollo?',
      'La linea sicura è stata usata alle 02:00. Non era programmata.',
      'Due persone con lo stesso handler nello stesso posto. Coincidenza improbabile.',
    ],
    'Encrypted Channel':  [
      'Frammentazione insolita nei pacchetti. Qualcuno sta nascondendo qualcosa nel rumore.',
      '{a} ha usato un protocollo che non era attivo da sei mesi.',
      'Il canale è stato testato tre volte nelle ultime due ore. Test di stabilità o di copertura?',
      'Un messaggio è stato inviato e immediatamente cancellato. Solo il timestamp rimane.',
      'Frequenza anomala. Non è errore — è segnale.',
    ],
    'Black Site':         [
      'Nessun movimento registrato nelle ultime 4 ore. Questo è il problema.',
      '{a} è entrato. {b} è uscito. Non si sono incrociati — eppure erano lì insieme.',
      'Le luci sono rimaste accese tutta la notte. Non è svista.',
      'Un file è stato distrutto fisicamente. Nel 2026. Qualcuno aveva paura del backup.',
      'Il sito non esiste nei registri pubblici. Esiste nei nostri.',
    ],
    'Press Room':         [
      'Un articolo è stato scritto e poi ritirato entro venti minuti dalla pubblicazione.',
      '{a} ha incontrato tre giornalisti diversi in altrettanti bar. Nessuna storia è uscita.',
      'La fonte anonima di ieri usa la stessa sintassi di {b}.',
      'Tre redazioni hanno ricevuto lo stesso leak da tre fonti diverse. Non è leak — è campagna.',
      'Qualcuno sta preparando una storia. Non per pubblicarla — per averla pronta.',
    ],
    'External Safehouse': [
      '{a} è rimasto 47 minuti. I safehouse non si usano così a lungo senza motivo.',
      'La casa è stata affittata tre settimane fa. In contanti. A nome di qualcuno che non esiste.',
      'Seconda visita in due giorni. La prima era esplorazione. Questa è operativa.',
      'Nessun contatto esterno nelle ultime 36 ore. Isolamento volontario o forzato?',
      'La luce in fondo è rimasta accesa tutta la notte.',
    ],
  }
};

// ── SCENARIO INTRO ─────────────────────────────────────────────────────────
export const SCENARIO_INTRO = [
  'La rete è già attiva.',
  '200 nodi. 6 zone. Quattro fazioni che non si fidano l\'una dell\'altra.',
  'Due regine controllano il flusso di informazioni.',
  'Il tuo compito è neutralizzarle entrambe prima che il sospetto ti bruci.',
  'Non hai un\'identità. Hai solo un vantaggio: sai cose che loro non sanno che tu sai.',
];

// ── FALLBACK NARRATIVO (quando AI non disponibile) ────────────────────────────
export const FALLBACK_TURNS = [
  'La rete respira. I nodi si spostano. Nessun evento rilevante questo turno.',
  'Silenzio operativo. Il sospetto tiene la rete in equilibrio instabile.',
  'Movimento nei corridoi. Nessuna deviazione dal pattern atteso.',
  'I COMPETITORS si riorganizzano. Gli INSPECTORS aumentano la frequenza di scansione.',
  'Un asset si è spostato senza notifica. Anomalia registrata, causa sconosciuta.',
  'La rete si adatta. Come sempre. Come se sapesse che qualcuno la osserva.',
];

export const FALLBACK_EVENTS = [
  ['Ridistribuzione nodi in Server Room.', 'Latenza aumentata su Encrypted Channel.'],
  ['Un nodo ha cambiato zona senza trigger visibile.', 'INSPECTORS in movimento verso Press Room.'],
  ['Anomalia rilevata in Black Site.', 'Il canale criptato è silenzioso da troppo tempo.'],
  ['Asset PREMIUM si è spostato in External Safehouse.', 'Pattern di clustering insolito.'],
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
