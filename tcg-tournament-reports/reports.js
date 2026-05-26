/**
 * Tournament Reports Data
 *
 * To add a new report, copy one of the objects below and paste it at the
 * TOP of the REPORTS array (newest first), then fill in the fields.
 *
 * Fields reference:
 *   id          – unique kebab-case string, e.g. 'rtn-hagen-2026-01-03'
 *   hero        – hero name, title-cased, e.g. 'Slippy'
 *   date        – ISO date for sorting, e.g. '2026-01-03'
 *   displayDate – human-readable date shown on the card, e.g. '03.01.26'
 *   event       – event name, e.g. 'RTN Hagen'
 *   eventType   – one of: RTN | PQ | Battleground | Showdown | Calling | Worlds | PT
 *   format      – one of: CC | Sage | Limited  (Classic Constructed, Silver Age, Limited)
 *   tier        – 1–4, auto-derived from eventType but can be overridden
 *   generalNotes – array of rough note strings (shown collapsed)
 *   rounds      – array of round objects (shown collapsed), in any order (auto-sorted R1→last):
 *                   { number, opponent, result: 'win'|'loss', score: '2–1'|null, order: 'first'|'second'|null, stage: 'T8'|'T4'|'T2'|'F'|null, notes: [] }
 *                   order: show the 1st/2nd badge. stage: override the R-number label (e.g. 'T8', 'T4').
 *   summary     – short paragraph shown at the top of the card
 */

const REPORTS = [

  // ── PASTE YOUR NEXT REPORT HERE (newest first) ────────────────────────────

  {
    id: 'calling-rotterdam-2026',
    hero: 'Mario',
    date: '2026-04-24',
    displayDate: '24–26.04.26',
    event: 'Calling Rotterdam',
    eventType: 'Calling',
    format: 'CC',
    day1End: 7,
    summary: 'Made Day Two with a solid run. Blood Splattered Vest was insanely strong against Oscilio — the most common matchup across both days. Day Two featured several very close Oscilio losses to topdeck arcane damage. Codex of Inertia underperformed throughout; Shred was consistently strong.',
    generalNotes: [
      'Blood Splattered Vest is insanely good into Oscilio',
      'Codex of Inertia underperformed',
      'Shred was really good',
      'Should probably block early rather than late on the combo turn — Oscilio can shoot arcane early and go taller than expected',
    ],
    rounds: [
      {
        number: 1,
        opponent: 'Teklovossen',
        result: 'win',
        notes: [
          'Matchup is very favourable — not close',
          'Be careful using equipment too early because of T-Bones',
        ],
      },
      {
        number: 2,
        opponent: 'Gravy',
        result: 'loss',
        notes: [
          'Early game went well — he was gold-starved with few allies',
          'Schism lost the game: bricked my Ponder, put blue in arsenal, and unbricked opponent',
        ],
      },
      {
        number: 3,
        opponent: 'Oscilio',
        result: 'loss',
        notes: [
          'Early game went really well — Blood Splattered Vest opened up cool new lines',
          'Wobbled Savour Bloodshed on the turn needed to present lethal',
          'Opponent full comboed and left at very low life; topdecked a shock + lightning card to finish',
          'Should probably block early rather than late on the combo turn — arcane can go taller than expected',
        ],
      },
      {
        number: 4,
        opponent: 'Viktor',
        result: 'win',
        notes: [
          'Very close — opponent failed early clashes',
          'Was ahead but Pummel in arsenal with crush cards was rough',
          'Had the read and full blocked into Codex of Inertia to reset the state',
          'Miscounted lethal with Codex and gave him a Golden Sun, but still won',
        ],
      },
      {
        number: 5,
        opponent: 'Cindra',
        result: 'win',
        notes: [
          'Went first and highrolled hard',
          'Mark of the Black Widow with Redback into another Mark of the Black Widow (blue)',
          'Drew double Savour Bloodshed afterwards — gamewinning',
          'List worked out perfectly',
        ],
      },
      {
        number: 6,
        opponent: 'Mario',
        result: 'win',
        notes: [
          'Opponent had no idea what he was doing — non-game',
        ],
      },
      {
        number: 7,
        opponent: 'Fang',
        result: 'win',
        notes: [
          'Very close — opponent had heavy Fealty pressure turn one',
          'Came back with Trap Doors',
        ],
      },
      {
        number: 8,
        opponent: 'Oscilio',
        result: 'win',
        notes: [
          'Disruption plan worked perfectly',
          'Blood Splattered Vest was really strong',
        ],
      },
      {
        number: 9,
        opponent: 'Jarl',
        result: 'win',
        notes: [
          'Boarded against fatigue but he was midrange',
          'A little close because of disruption, but edged it out',
          'Got Chelicera early which helped',
        ],
      },
      {
        number: 10,
        opponent: 'Oscilio',
        result: 'loss',
        notes: [
          'Very defensive opponent — very close game',
          'Played Cap of Quick Thinking and prevented Flick early',
          'Blood Splattered Vest was really good',
          'Topdeck arcane lost the game in the end',
        ],
      },
      {
        number: 11,
        opponent: 'Oscilio',
        result: 'loss',
        notes: [
          'Opponent found full combo early — massive damage into arcane shock on the following turn',
          'Chest overperformed again',
        ],
      },
      {
        number: 12,
        opponent: 'Huntsman',
        result: 'win',
        notes: [
          'Really cool game — opponent found Hunter or Hunted quickly and banished multiple Cut from the Same Cloth and Just a Nicks',
          'Had double T-Tox hand but opponent had d-reacts; lots of back and forth',
          'Kept retrieve cards in the deck and got maximum value from every Flick',
          'Mantled into Kiss of Death thrice — pretty clean overall',
          'First Schism was bad (got a blue, he got Hunter or Hunted)',
          'Second cycle Schism was insane (got Codex, his arsenal was full)',
        ],
      },
    ],
  },

  {
    id: 'showdown-yokohama-2026-04-12',
    hero: 'Briar',
    date: '2026-04-12',
    displayDate: '12.04.26',
    event: 'Showdown Yokohama',
    eventType: 'Showdown',
    format: 'CC',
    summary: 'Dropped with an even record. Multiple losses to Ira — most of them incredibly close. Main takeaways: cut a d-react, bring Star Fall vs Ira.',
    generalNotes: [
      '4 d-reacts is 1 too many',
      'Play Star Fall vs Ira',
      'Always bring sword into Ira',
    ],
    rounds: [
      {
        number: 1,
        opponent: 'Kayo',
        result: 'loss',
        notes: [
          'Really close game — lost exactly at 0 to Red Wild Ride + Claw + Bear Fangs',
          'Kayo drew close to perfect; don\'t think I could have played better',
        ],
      },
      {
        number: 2,
        opponent: 'Ira',
        result: 'win',
        notes: [
          'New player, non-game',
        ],
      },
      {
        number: 3,
        opponent: 'Ira',
        result: 'loss',
        notes: [
          'Incredibly close — got opponent to 1 life',
          'Win if I have a read on his polarity in arsenal; did not and played Sigil of Suffering instead',
          'From there opponent had 2 Reinforce the Lines on breakpoints and I fatigued out due to scepter',
        ],
      },
      {
        number: 4,
        opponent: 'Briar',
        result: 'win',
        notes: [
          'Opponent on a weird Nebula Lightning list',
          'My deck bricked hard but his deck did not function either',
          'Photon Rush performed well',
        ],
      },
      {
        number: 5,
        opponent: 'Ira',
        result: 'loss',
        notes: [
          'Non-game — drew 3 attacks into 4 attacks (2 block) into 4 NAAs; could not play',
        ],
      },
      {
        number: 6,
        opponent: 'Ira',
        result: 'win',
        notes: [
          'Turn 0 Malefic Violation into brick into good hand',
          'Opponent had 0 blues turn 0; from there it was effectively won',
        ],
      },
    ],
  },

  {
    id: 'pt-yokohama-2026',
    prepId: 'pro-tour-yokohama-2026',
    hero: 'Mario / Briar',
    date: '2026-04-09',
    displayDate: '09–12.04.26',
    event: 'Pro Tour Yokohama',
    eventType: 'PT',
    format: 'CC / Sage',
    day1End: 8,
    generalNotes: [
      'Don\'t play others\' decks — take responsibility for every card in the deck and every play in the game',
    ],
    rounds: [
      {
        number: 1,
        opponent: 'Mario',
        result: 'win',
        notes: [
          '[CC] Drew better; had d-reacts in a crucial spot against on-hit',
          'Insane inertia value — not much agency for opponent',
        ],
      },
      {
        number: 2,
        opponent: 'Cindra',
        result: 'loss',
        notes: [
          '[CC] Opponent went second; did not draw much disruption',
          'Game was close — at one point blocked out instead of Savour Bloodshed',
          'Weird blocking decisions with shelter in a turn',
          'Might have been winnable with better decisions',
        ],
      },
      {
        number: 3,
        opponent: 'Oscilio',
        result: 'win',
        notes: [
          '[CC] Opponent\'s plan never came together',
          'Was at 20+ life when he died',
        ],
      },
      {
        number: 4,
        opponent: 'Mario',
        result: 'loss',
        notes: [
          '[CC] Opponent had an insane early game with power cards after chelicera was denied',
          'Lost from there — no way back in',
        ],
      },
      {
        number: 5,
        opponent: 'Mario',
        result: 'win',
        notes: [
          '[CC] Round 4 inverted — had an insane early game and won at 20+',
        ],
      },
      {
        number: 6,
        opponent: 'Oldhim',
        result: 'loss',
        notes: [
          '[Sage] Unwinnable — not close, not much to say',
        ],
      },
      {
        number: 7,
        opponent: 'Kayo',
        result: 'win',
        notes: [
          '[Sage] Close game — drew all d-reacts early, making it sketchy',
          'Opponent had some very efficient turns',
          'The 6 value from blade beckoners won the game',
        ],
      },
      {
        number: 8,
        opponent: 'Valda',
        result: 'win',
        notes: [
          '[Sage] D-reacts came in clutch; got to play around pummel with rootbound',
          'Had to give opponent full tempo and hope they dealt less than 7',
          'Opponent hammered — from there, closed it out with a sigil of suffering',
        ],
      },
      {
        number: 9,
        opponent: 'Ira',
        result: 'win',
        notes: [
          '[Sage] Not close despite opponent seeing polarity and double wax for 5+5+4 value',
          'Opponent drew too many defensive cards and gave tempo',
          'Drew enough NAAs to punish; had 4 NAAs left (fatigue angle existed but never close)',
        ],
      },
      {
        number: 10,
        opponent: 'Oldhim',
        result: 'loss',
        notes: [
          '[Sage]',
        ],
      },
      {
        number: 11,
        opponent: 'Kayo',
        result: 'win',
        notes: [
          '[Sage] Turn 0 highroll: malefic + arcane seeds',
          'From there, opponent needed their own highroll to come back — never happened',
          'Bricked in the end but Kayo doesn\'t block so it didn\'t matter',
        ],
      },
      {
        number: 12,
        opponent: 'Viktor',
        result: 'loss',
        notes: [
          '[CC] Not really close — opponent drew all clash cards early in the right order',
          'Tried to give tempo for a comeback but he had e-strike both times',
          'Not much agency, but played well',
        ],
      },
      {
        number: 13,
        opponent: 'Mario',
        result: 'win',
        notes: [
          '[CC] Very close, very swingy — ended up in a 1 vs 1 life situation',
          'Got rewarded for keeping tunic',
          'D-reacts were really clutch',
        ],
      },
      {
        number: 14,
        opponent: 'Viktor',
        result: 'loss',
        notes: [
          '[CC] Very close game',
          'Underestimated how fast he cycled through his deck',
          'He reached his pitch-stacked pummel for the win',
        ],
      },
      {
        number: 15,
        opponent: 'Viktor',
        result: 'loss',
        notes: [
          '[CC] Very close — got him to 1 but he had a crucial d-react',
          'He double estate into 14 might',
          'Could not kill in time; died after giving tempo to survive the turn',
        ],
      },
    ],
    summary: 'Mixed finish at Pro Tour Yokohama — slightly negative in CC with Mario, positive in Sage with Briar. CC had a rough second half with several close Viktor losses. Sage was clean across the day. Main learning: don\'t play others\' decks — own every card and every decision.',
  },

  {
    id: 'ruika-shanghai-2026-04-03',
    hero: 'Mario',
    date: '2026-04-03',
    displayDate: '03.04.26',
    event: 'RUIKA Event Shanghai',
    eventType: 'RTN',
    format: 'CC',
    rounds: [
      {
        number: 1,
        opponent: 'Prism',
        result: 'win',
        score: '26–0',
        order: 'second',
        notes: [
          'New player, non-game',
          'Very efficient blocking — 4 blocks felt really good, always had enough 3/4-blocks',
          'Flicked dagger early for value with no punishment',
          'Had the luxury to transform into Black Widow for guaranteed disruption',
          'Be wary of All You\'ve Got / Soul Shield while threatening lethal with last dagger flick',
          'Keeping a flick for when they no longer have Figments of Protection is important to pop an angel',
        ],
      },
      {
        number: 2,
        opponent: 'Mario',
        result: 'loss',
        score: '0–14',
        order: 'first',
        notes: [
          'Played really badly — poor blocking decisions throughout',
          'Draw order likely losing regardless (got hit with Codex into Codex)',
          'Lost tempo on bad blocks and could not recover',
          'Best hand drawn was met with Meet Madness into Codex (hit hand)',
          'Should have accepted the double Savour Bloodshed into Codex hit instead of over-blocking',
          'Should have 1-card played Scar Tissue instead of arsenaling it to mark before the Codex',
          'A tough matchup that needs a skilled Mario player to keep it close',
        ],
      },
      {
        number: 3,
        opponent: 'RKO',
        result: 'win',
        score: '24–0',
        order: 'second',
        notes: [
          'New player — mostly blocking',
          'Did not block a CnC expecting Pummel; got rewarded for the read',
          'Used equip offensively early (extra flick, boots) to build life lead',
          'May be right to play Stalker\'s Step for a guaranteed Kode Flick early',
        ],
      },
      {
        number: 4,
        opponent: 'Dori (Dawnblade)',
        result: 'win',
        score: '6–0',
        order: 'first',
        notes: [
          'Very weird game — opponent full blocked first 4 turns presenting 72 damage',
          'Got psy-opted into playing slower to avoid being fatigued out',
          'Drew all defensive cards early, could not present as much pressure as wanted',
          'Maybe go full aggro with no d-reacts against this playstyle?',
          'Opponent got 3 counters on the first tempo turn; assumed he could not deal 21 and attacked with disruption and toxin',
          'Next hand was game winning — he could not deal 21 (no blue for twinning)',
        ],
      },
      {
        number: 5,
        opponent: 'Viktor (midrange)',
        result: 'loss',
        score: '0–12',
        order: 'first',
        notes: [
          'Got Chelicera turn 0; blocked with headpiece immediately as a trap against Spinal, kept good 4 cards and established tempo',
          'Good first Codex turn, but opponent got CnC back with 4 mights; pondered another Codex so no arsenal pass',
          'Drew Codex of Inertia — pitched Frailty and went for an inertia play; both draws were blues',
          'Drew mediocre hands from there and lost a lot of tempo',
          'Opponent always had d-reacts on attack reacts and found estate + riches on first turn',
          'Final strong turn: death touch into Savour Cheli into Codex death touch — got Iron Gripped',
          'Happy with lines and sideboarding overall',
        ],
      },
      {
        number: 6,
        opponent: 'Mario',
        result: 'loss',
        score: '0–13',
        order: 'second',
        notes: [
          'Awkward turn 0 hand, just dagger flick pass',
          'Drew shelter early with a trap — denied mark on the first turn through the flick',
          'Lost tempo when his first roll was 6; had to pitch an attack to avoid IP\'ing into Inertia',
          'Hands did not line up after that and he took the lead',
          'Opponent rolled 6 again on a Kiss of Death turn and Frailty\'d — very hard to come back without finding power cards',
          'On his final hand knew it was likely TTox but full blocking did not seem like the winning play',
        ],
      },
      {
        number: 7,
        opponent: 'BYE',
        result: 'win',
        notes: [
          'Opponent did not show up',
        ],
      },
      {
        number: 8,
        opponent: 'Dio',
        result: 'loss',
        score: '0–3',
        order: 'second',
        notes: [
          'Started with a grenade and Backup Protocol — forced into a blocking line early to prevent the grenade',
          'Pivoted into more aggressive/disruptive lines but did not find LNW; Codexes were weak without it',
          'Opponent found an item every turn and sparks were very effective',
          'Cerebelum from top into boosting FnF was back-breaking',
          'Tried to cheese a win with TTox but opponent was far enough ahead to overblock',
          'If opponent does not send lethal there, can LNW and potentially win from that point',
        ],
      },
    ],
    spectatorNotes: [
      '> Jimmy vs Cindra',
      'Jimmy let Mask of Momentum draw immediately for a power turn',
      'Opponent giga bricked and had to block 2 lava bursts into double tarantula toxin — gg',
      '> Arthur (Mario) vs Viktor',
      'Turn 0: Cheli with Whittle from Bones; Arsenal: Tarantula Toxin. First transform into Trap Door, Inertia trap set',
      'Viktor turn 1: double visit (7 might) into Hammer instead of E-Strike for 7',
      'Arthur immediately goes into Black Widow: KoD + Black Widow activation + Tarantula Toxin + Scar Tissue; Arsenal: Shelter from the Storm',
      'Viktor E-Strike for 14; Arthur blocks 4 with Shelter, takes 10',
      'Arthur plays Cut from the Same Cloth, sees Trounce and Iron Grip; plays another pump, Cheli for 9; gets blocked for 10; Mario loses all clashes, discards Meet Madness; rolls Orb Weaver',
      'Viktor blue disable for 8; blocked by Meet Madness and Persuasive Prognosis',
      'Cheli for 1, no blocks, reactions: To the Point + Stains and Incision + Block Fate. Life: Viktor 23 – Mario 28',
      'Viktor Golden Son for 10, arsenal Pummel',
      'Pain in the Backside blocked; Savour into Klaive pitching Codex of Inertia; block 5 with Spinal + Pummel (Viktor bricked)',
      'Codex of Frailty into Meet Madness',
      'Hammer blocked for 3 with Trap Door; pitching another blue for Klaive into Orb Weaver Cheli; loses Iron Grip, discards LNW',
      'Viktor CnC Pummel while Arthur has arsenal — Arthur blocks 10; discards Mark with last card, goes into Funnel Web (d-react in arsenal assumed)',
      'Maximum punish: Viktor draws E-Strike into CnC and still has Pummel in arsenal; Arthur blocks 6, Trap in arsenal + LNW discarded',
      'Arthur arsenals Scar and passes. Viktor bricks — 4-card Hammer. Life: Viktor 20 – Mario 5',
      'Arthur plays Cut from the Same Cloth, reveals Iron Grip and Test of Strength; Cheli for 10, block 8, wins clash with Golden Son, takes 9. Rolls Funnel Web',
    ],
  },

  {
    id: 'calling-shanghai-2026',
    hero: 'Briar',
    date: '2026-04-05',
    displayDate: '03–05.04.26',
    event: 'Calling Shanghai',
    eventType: 'Calling',
    format: 'Sage',
    rounds: [
      {
        number: 1,
        opponent: 'Kayo',
        result: 'win',
        notes: [
          'Close race — opponent had strong early hands but was a newer player',
          'Played around pummel but he discarded windup instead and gained AP with boots (learned this was not a legal play post-game)',
          'Edged out the win through experience advantage',
        ],
      },
      {
        number: 2,
        opponent: 'Valda',
        result: 'win',
        notes: [
          'Very close — killed him exactly at 0 before fatiguing',
          'Opponent bricked and lost tempo to polarity',
          'Never gave him tempo after he drew pummel and arsenaled it',
        ],
      },
      {
        number: 3,
        opponent: 'Valda',
        result: 'loss',
        notes: [
          'Fatigued out',
          'He resolved polarity for 4',
          'Same pummel situation as R2 — he took the extra damage to resolve it',
          'Drew sigil of suffering perfectly but it was not enough',
        ],
      },
      {
        number: 4,
        opponent: 'Florian',
        result: 'win',
        notes: [
          'Unga bunga — once the attack stack got big enough just attacked with 4 cards until he died',
        ],
      },
      {
        number: 5,
        opponent: 'Valda',
        result: 'loss',
        notes: [
          'Not close — tried scepter hoping he would not bring arcane barrier',
          'He had arcane barrier and polaritied twice to go to 28',
        ],
      },
      {
        number: 6,
        opponent: 'Florian',
        result: 'win',
        notes: [
          'Hybrid Florian with a midrange switchboard',
          'Gave him tempo early, then attacked until he died',
          'He did not do too much',
        ],
      },
      {
        number: 7,
        opponent: 'Valda',
        result: 'win',
        notes: [
          'Good early game with strong attacks and sigil of suffering',
          'Closed with an electrify turn for 4 cards 18 damage — he had no equipment left to block out',
        ],
      },
      {
        number: 8,
        opponent: 'Dash',
        result: 'win',
        order: 'first',
        notes: [
          'Won the die roll',
          'Opponent blocked a lot',
          'Extra life from triple blade beckoner made it easy to close out',
        ],
      },
      {
        number: 9,
        opponent: 'Kayo',
        result: 'loss',
        order: 'second',
        notes: [
          'Lost the die roll — had to play second',
          'He played AB1 so no scepter value',
          'Pretty good turns from opponent early; came back slowly but turns were not great (turn 1: 3 cards 7 damage)',
          'End-game: needed 4 blocking cards, 1 of 2 sigil of sufferings, or a 4-block to win — did not find it',
        ],
      },
      {
        number: 10,
        opponent: 'Valda',
        result: 'win',
        notes: [
          'Won the die roll; he rolled badly',
          'No scary plays from Valda and the fatigue angle was not close',
        ],
      },
      {
        number: 11,
        opponent: 'Ira',
        result: 'win',
        notes: [
          'Weird game — was incredibly far ahead',
          'Opponent started trying to fatigue — not realistic with so many 2-blocks',
          'Learning: if hand completely bricks, filter with scepter rather than passing',
        ],
      },
      {
        number: 12,
        opponent: 'Valda',
        result: 'loss',
        notes: [
          'Not close — got beaten up badly',
          'He went first and had a good setup',
          'From there it was 10 into 10 into 10 — no way back in',
        ],
      },
    ],
  },

  {
    id: 'pq-darmstadt-2026-03-21',
    hero: 'Mario',
    date: '2026-03-21',
    displayDate: '21.03.26',
    event: 'PQ Darmstadt',
    eventType: 'PQ',
    format: 'CC',
    generalNotes: [
      'Anti-fatigue package needed vs Valda — Fatigue is their backup plan',
      'Pilfer the Tomb would have been useful vs Gravy',
      'Need more reps vs Ira — play midrange, not fatigue',
      'Need to find correct sideboard plan vs Gravy',
      'Awareness of damage left in deck is key',
      'Remembrance is very good for getting back Retrieve',
      'Need more Gravy reps',
      'Need more full fatigue reps',
      'Need more Vynnset reps (did not come up but a matchup to study)',
      'Time to finalize sideboard guide',
    ],
    rounds: [
      {
        number: 7,
        opponent: 'Gravy',
        result: 'loss',
        score: '0–8',
        order: 'first',
        stage: 'T4',
        notes: [
          'Had complicated lines that were not seen or played optimally',
          'Good early game but denied hard by 4 d-reacts',
          'All 3 Blood in the Waters blocked 6 (twice discarded from hand, 1 from top)',
          'Did not get the life lead needed',
          'Chum takes so many cards',
          'Need to find the correct sideboard plan',
        ],
      },
      {
        number: 6,
        opponent: 'Kassai',
        result: 'win',
        score: '31–0',
        order: 'second',
        stage: 'T8',
        notes: [
          'Presented 70 and tried to fatigue — was not close',
          'Made sure to get as much damage as possible from the deck once far enough ahead',
          'IPed on double tarantula for 6 value per card',
        ],
      },
      {
        number: 5,
        opponent: 'Ira',
        result: 'loss',
        score: '0–7',
        order: 'first',
        notes: [
          'Brain was fried — misplayed multiple times',
          'Thought defensive Ira is closer to fatigue but got beaten up',
          'Should be ready to play a midrange game, not a fatigue game',
          'Need more reps',
        ],
      },
      {
        number: 4,
        opponent: 'Jarl',
        result: 'win',
        score: '19–0',
        order: 'second',
        notes: [
          '3 cards left in deck',
          'Early game was miserable, could not get Chelicera online',
          'Turnaround play with Spreading Plague for 5 bloodrots',
          'All anti-fatigue plays worked out perfectly',
          'Remembrance was really good getting back Retrieve',
          'Awareness of damage left in deck is key — do not sacrifice deck damage for panic plays',
        ],
      },
      {
        number: 3,
        opponent: 'Gravy',
        result: 'win',
        score: '19–0',
        order: 'first',
        notes: [
          'Early turns a little awkward playing around Chum',
          'Opponent never got to resolve second Chum or any Sawbones — made it easy',
          "Using Mario's go-again on-hit is pretty important — okay to be greedy sometimes",
          'Sequencing can be pretty complicated playing around allies',
          'Did not have Pilfer the Tomb in the list — would have been nice',
        ],
      },
      {
        number: 2,
        opponent: 'Valda',
        result: 'win',
        score: '18–0',
        order: 'second',
        notes: [
          'Valda low-rolled really hard',
          'Hit good value turns',
          'Was not greedy with flicking Klaive since already ahead',
          'D-reacts bricked hard but mostly because Valda bricked as well',
          'Fatigue is their backup plan — consider anti-fatigue package',
          'D-reacts are really good to cover the crushes',
        ],
      },
      {
        number: 1,
        opponent: 'Fang',
        result: 'win',
        score: '11–0',
        order: 'second',
        notes: [
          'Fang was online early (turn 3)',
          'Hit Codex into Codex into Codex — put very far ahead',
          'First Codex very awkward — saw Blunten from Cut from the Same Cloth, had to discard and IP but Frailty still worth',
          'Flicked Klaive in the midgame for a big play',
          'Found the Retrieve in time',
        ],
      },
    ],
    summary: 'Strong Swiss run, fell in the semis. Lost to Ira in Swiss (misplays, wrong gameplan — played fatigue into midrange) and Gravy in the semis (wall of d-reacts denied everything, every Blood in the Waters blocked for maximum value).',
  },

  {
    id: 'pq-mainz-2026-03-15',
    hero: 'Mario',
    date: '2026-03-15',
    displayDate: '15.03.26',
    event: 'PQ Mainz',
    eventType: 'PQ',
    format: 'CC',
    generalNotes: [
      'Need more stealth attacks if playing this many Take Up the Mantles — Whittle from Bones especially',
      'Cremation not convincing',
      'Need more reps',
      'Need to work on correct sideboard ratios',
    ],
    rounds: [
      {
        number: 7,
        opponent: 'Ira',
        result: 'loss',
        score: '0–8',
        notes: [
          'Shouldve won — lost to two misplays',
          'Missed 4 damage due to missed trigger',
          'Allowed a free MoM trigger unnecessarily',
          'Missed frailty trap',
        ],
      },
      {
        number: 6,
        opponent: 'Puffin',
        result: 'win',
        score: '1–0',
        notes: [
          'Really close tight game',
          'Kept getting punished by CNCs',
          'Puffin had 2x Soup Up into Dovetail Palantir with 3 cogs — shouldve lost at that point',
          'Managed to come back at 1 with cool gold plays from the scoundrels',
          'Matchup not great overall',
        ],
      },
      {
        number: 5,
        opponent: 'Teklovossen',
        result: 'win',
        score: '17–0',
        notes: [
          'Boost Teklo — felt closer than it was',
          'Very midrangy; endgame feels pretty favoured if they dont have Singularity',
          'Deck damage is a real factor — was on 9 cards when he died, but wouldve won the fatigue game too',
          'Piercing is really good since cards from hand are also affected',
        ],
      },
      {
        number: 4,
        opponent: 'Dio',
        result: 'win',
        score: '1–0',
        notes: [
          'Really close, shouldve lost',
          '3 blocks good',
          'Probably shouldnt threaten fatigue when really ahead',
          'MaxV double grenade blowout wouldve lost the game',
          'Hard to say when to block how much',
          'Won on 1 — opponent gave tempo out of fatigue fear, wouldve lost otherwise',
        ],
      },
      {
        number: 3,
        opponent: 'Verdance',
        result: 'loss',
        score: null,
        notes: [
          'Lost to time — conceded',
          'Really good early game, was far ahead',
          'D-reacts and Take Up the Mantle bricked hard',
          'Went to time due to slow play — definitely winnable',
          'Codex of Inertia is very good in these midrangy matchups',
        ],
      },
      {
        number: 2,
        opponent: 'Levia',
        result: 'win',
        score: '2–0',
        notes: [
          'Used head for Orb Weaver',
          'Really tight — first Shadow Realm hit 3',
          'Scabs rolls: 4, 2',
          'Got opponent to exactly 13 with reactions to prevent Blasmo',
          'Summoned Blasmo and attacked with it twice',
          'Died to 9 blood debt due to disruption',
          'Critically important to deny Blasmo when behind — she has to lose to herself',
        ],
      },
      {
        number: 1,
        opponent: 'Verdance',
        result: 'win',
        score: '18–0',
        order: 'first',
        notes: [
          'Got Orb Weaver turn 0',
          'Early high roll — non-game',
          'Codex of Inertia really good',
          'Used head for go-again stealth into Codex',
        ],
      },
    ],
    summary: 'Strong run at PQ Mainz. Lost to Verdance (bricked d-reacts + TutM in a winning game, went to time) and Ira (misplays — should have won).',
  },

  {
    id: 'rtn-hagen-2026-01-03',
    hero: 'Slippy',
    date: '2026-01-03',
    displayDate: '03.01.26',
    event: 'RTN Hagen',
    eventType: 'RTN',
    format: 'CC',
    tier: 1,
    generalNotes: [
      'Razor reflex really good',
      'Always use the first nimbilism if no jack was seen yet',
      'More stealth attacks? Too many stealth reactions compared to attacks — double trouble?',
      'Snappies not useful in a lot of games; should be cut — blade beckoner / blacktec / armory deck',
      'Blood splattered vest sideboard for aggro?',
      'Find earth tech',
      'AB1 probably',
    ],
    rounds: [
      {
        number: 6,
        opponent: 'Verdance',
        result: 'loss',
        score: null,
        notes: [
          '8 value behind turn 0',
          'Hands aligned really badly',
          'Not much agency',
        ],
      },
      {
        number: 5,
        opponent: 'Cindra',
        result: 'win',
        score: '0–5',
        notes: [
          'Somewhat close',
          "Misplayed: didn't arsenal a relevant on-hit — threw 3 when it wasn't relevant",
          'Misplayed when opponent bricked — blocked with flick knives instead of hand ("safe play")',
          'Need extra block value',
        ],
      },
      {
        number: 4,
        opponent: 'Kayo',
        result: 'win',
        score: '2–0',
        notes: [
          'Very close',
          'Stampede is busted — might need to block equip earlier',
          'Used snappies very greedy early, probably game-losing',
          'Gotta play around fleshbag',
        ],
      },
      {
        number: 3,
        opponent: 'Slippy',
        result: 'win',
        score: '13–0',
        notes: [
          'Not close',
          'Opponent on standard list with weird adaptations (leyline, surgical)',
          'Deck was smooth, although no codex drawn',
          'Boarding out codex of inertia feels right in the mirror',
        ],
      },
      {
        number: 2,
        opponent: 'Florian',
        result: 'loss',
        score: '0–9',
        notes: [
          'Cursed game: 2 codex with 3 stealth reactions and no stealth attack until turn 3',
          "Hands didn't align",
          'Average Florian hands — no "highroll" turns',
          'Really hard to flick / hit daggers; cut through is a liability',
          'Florian created 4 runechants turn 0',
          "It's a race — probably shouldn't fatstack",
          'First earth banish gives him so much value; meet madness lost the game (equip + felling for 8)',
        ],
      },
      {
        number: 1,
        opponent: 'Puffin',
        result: 'win',
        score: '17–0',
        notes: [
          'No boost — lost in champ select',
          'Good value from savour bloodshed (cost codex value — needed to pitch yellow)',
          'Sketchy double react hand without stealth',
          'No snapdragon scalers value',
          'Yellows are decent filler (shouldn\'t be too many)',
          'No codex of inertias felt correct',
        ],
      },
    ],
    summary: 'Positive record at RTN Hagen with Slippy. Lost to Florian (dead hand — double-codex with only reactions, no stealth attack until turn three) and Verdance (heavy value deficit from turn zero, no agency).',
  },

];
