const PREPS = [
  {
    id: 'prague-calling-2026',
    event: 'The Calling Prague 2026',
    eventType: 'Calling',
    tier: 3,
    date: '2026-05-22',
    displayDate: '22–24.05.26',
    omnSetStats: true,
    tldrawUrl: 'https://www.tldraw.com/f/1TdXETK9YpCXb0iSLfVU6?d=v-6627.4013.2902.5111.page',
    formats: [
      {
        id: 'sealed',
        name: 'Sealed Deck',
        abbr: 'Sealed',
        hero: 'TBD',
        summary: [],
        heroReasons: [],
        predictedMeta: [],
        notes: [],
      },
    ],
  },

  {
    id: 'german-nationals-2026',
    event: 'German Nationals 2026',
    eventType: 'Nationals',
    tier: 4,
    date: '2026-04-06',
    displayDate: '03–06.04.26',
    formats: [
      {
        id: 'cc',
        name: 'Classic Constructed',
        abbr: 'CC',
        hero: 'Mario',
        summary: [],
        heroReasons: [],
        predictedMeta: [],
        notes: [],
      },
    ],
  },

  {
    id: 'pro-tour-yokohama-2026',
    reportId: 'pt-yokohama-2026',
    event: 'Pro Tour Yokohama',
    eventType: 'PT',
    tier: 4,
    date: '2026-03-27',
    displayDate: '27.03.26',
    formats: [
      {
        id: 'sage',
        name: 'Silver Age',
        abbr: 'Sage',
        hero: 'Briar',
        summary: [
          'Pivoted from Nebular Blade aggro to a Redline list (Scepter) — the aggro list could not convert tempo into wins consistently. The Redline list is smooth and good into most of the field.',
          'Oldhim remains a near-auto-loss; accepted the loss instead of burning sideboard slots trying to fix it. Into Oldhim, target deck damage: maximise weapon swings after non-attack actions and Crown of Dichotomy value, hope the Hammer clashes twice.',
          'Kayo and Ira matchups are very good with Redline — no adjustments needed.',
          'Valda is hard; the answer is blocking with breakpoints, attacking at breakpoints, and leaning on d-reacts. Rootbound Carapace is likely necessary.',
          'Enigma: play 1 Sigil of Suffering — get it out of the deck early. Endgame: hope leaked damage plus the 1-of evergreen closes it out.',
          'Against Kano the matchup is hard; auto-loss to Oldhim. Otherwise favoured or roughly even into the rest of the field.',
          'Sideboard spectrum of 3 swappable cards ranging from all-defensive to all-offensive. Swiftstrike Bracers come in vs Oldhim and Florian (exactly 12 equips). vs Scurv: always bring Starfall + Resource Chest.',
        ],
        heroReasons: [
          'Solid numbers',
          'Good matchups into aggro decks (Kayo, Ira)',
          'Redline list still good into Iyslander and Kano',
          'Loses to Guardian; auto-loss against Oldhim (accepted)',
        ],
        predictedMeta: [
          { matchup: 'Kayo', share: '~15%', note: 'A lot, but not as much as people think' },
          { matchup: 'Ira', share: '~15%', note: 'Safe, solid pick' },
          { matchup: 'Oldhim / Tera', share: '~5%', note: '' },
          { matchup: 'Valda', share: '~15%', note: '' },
          { matchup: 'Kano', share: '~5%', note: '' },
          { matchup: 'Misc aggro', share: '~25%', note: '' },
          { matchup: 'Florian', share: '~5%', note: '' },
          { matchup: 'Rest', share: '~15%', note: '' },
        ],
        notes: [
          {
            date: '18.03.26',
            sections: [
              {
                heading: null,
                entries: [
                  'Still trying to find the right list. Nebular blade feels really good with the blues. Electrify mainboard is a little suspicious, but if you draw it early it just wins games so it\'s hard to remove overall. The malefics also don\'t feel too great.',
                  'The Oldhim matchup feels really doomed, it\'s so hard to get through.',
                  '"Normal" guardians are doable but not favoured, we can actually threaten by deck damage now.',
                  'Going first into Ira feels 50/50ish, second is a lot more favoured. The main issue is that we need to convert some cards defensively since we aren\'t as consistent as we used to be. This leads to a midrange game where Kodachi endgame beats anything we have...',
                  'Maybe it\'s time for Fry...',
                ],
              },
            ],
          },
          {
            date: '19.03.26',
            sections: [
              {
                heading: null,
                entries: [
                  'Tried cards like Fry that are underrated but make it possible to say "no-blocks" more often. This also allowed us to add more elemental pumps. The deck feels really smooth now — should definitely improve the Ira matchup and gives us the choice to block or take tempo with any hand.',
                  'The play pattern into aggro is blocking efficiently when we can to preserve life, using that life lead to take tempo (usually going close to 1) so we can threaten lethal without ever being forced to block with 2–3 blocks. Since our hands convert a lot better now this works more consistently. We need to be very aware of when and how strong we present lethal. 1-turn value game into full aggro is what it feels like — life is a resource we leverage to gain tempo.',
                  'Still not sure about the 2 sideboard slots we want into Oldhim... Emissary feels fine but the matchup is too bad for "fine" to work. Maybe just go with tall arcane damage...',
                ],
              },
            ],
          },
          {
            date: '25.03.26',
            sections: [
              {
                heading: null,
                entries: [
                  'Pretty close to the final list. 1x Electrify is very game-winning — feels really good. 5 blues seems to be the sweet spot.',
                  'The deck is good into pretty much everything except Oldhim. Instead of trying to fix that matchup, just accept the loss.',
                  'Sideboard slots: 2 extra yellow Arcane Polarities for Iyslander, Kano and Vynnset; AB3 and Spellvoid 1 to cover both wizard and runeblade setups; 1 blue evergreen for the final deck-damage push (fatiguing Valda / Flavo can work).',
                  'Face Adversity is no longer necessary since we only run 2 Blade Beckoners.',
                  '2x Second Strike still feels too clunky. Replaced 1x Emissary of the Tides — that card is a really good role-player and glue piece.',
                  'Favoured into pretty much everything except guardians (slightly unfavoured) with an auto-loss into Oldhim — very acceptable given the meta prediction.',
                ],
              },
            ],
          },
          {
            date: '26.03.26',
            sections: [
              {
                heading: null,
                entries: [
                  'Against Enigma it\'s fine to play 1x Sigil of Suffering — just key to get it out of the deck. Endgame plan: hope we leaked enough damage so the 1-of evergreen seals the deal.',
                ],
              },
            ],
          },
          {
            date: '27.03.26',
            sections: [
              {
                heading: null,
                entries: [
                  'Against Oldhim we should go for deck damage. The matchup is so doomed anyway — might as well hope his Hammer loses the clash twice. That\'s better than having no win condition.',
                  'Maximise weapon swings any time we play a non-attack action, and maximise Crown of Dichotomy value.',
                ],
              },
            ],
          },
          {
            date: '01.04.26',
            sections: [
              {
                heading: null,
                entries: [
                  'The Nebula Blade aggro list consistently loses into everything — cannot convert the tempo gained when outvaluing the opponent. Pivoted to a Redline list like the one played in London. With Scepter it\'s still good into aggro decks; Ira should be favoured with blade.',
                  'Giving up the wizard matchup in favour of coverage into Florian, Oldhim aggro, and Ira — covering pretty much everything else.',
                  '37-card mainboard with a 3-card switchboard "spectrum" ranging from all-defensive to all-offensive.',
                  'Swiftstrike Bracers come in vs Oldhim and Florian — exactly 12 equips.',
                  'Against Scurv: always bring Starfall + Resource Chest.',
                ],
              },
            ],
          },
          {
            date: '07.04.26',
            sections: [
              {
                heading: null,
                entries: [
                  'Valda is hard. Valda is good. The answer seems to be blocking with breakpoints and attacking at breakpoints. D-reacts are really good. Rootbound Carapace is probably necessary.',
                  'Redline is really good. No need to adjust for Kayo and Ira — matchups are great. Auto-loss to Oldhim; hard into Kano.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'cc',
        name: 'Classic Constructed',
        abbr: 'CC',
        hero: 'Mario',
        summary: [
          'Hyper Inflation is not worth running — cut it.',
          'Frailty Trap remains strong and relevant in several matchups.',
          'Jakob shell is excellent — Whittles act as true-damage Cheliceras; transform to Kiss of Death in reactions for extra true damage. No need for a dedicated endgame plan.',
          'Relentless Pursuit provides an infinite Mark supply in the endgame.',
          '3x Incisions recommended; run both a stealth and non-stealth package and adapt to the matchup.',
          'vs Victor (defensive): seeing Death Touch early is critical; always play around Iron Grip; stick to a consistent 60-card build even in fatigue games. Codex of Inertia resets board state; Spreading Plague is clutch in the endgame.',
          'vs Gravy: be maximally disruptive OR play big hands (chained disruption etc.); clear allies, play the value game, force blocks — the blocking player gets fatigued. Defense reactions in arsenal are very good. Codex is risky; giving them Conqueror of the High Seas can be very bad.',
          'vs Oscilio: draw order is critical; key early decision between disruption and keeping Mark for Chelicera; use Amulet before GIAF resolves; watch for Wobble, Cloud Cover, Sigil of Solace; headpiece is strong for disruption.',
          'vs Vynnset: play all available blues and defense reactions; disruption may still be useful despite banishing from hand since they rarely have many Runegate cards in hand.',
        ],
        heroReasons: [
          'Big wide meta, solid numbers, good disruption',
        ],
        predictedMeta: [
          { matchup: 'Mario', share: '–', note: 'Tech target — mirror matchup' },
          { matchup: 'Oscilio', share: '–', note: 'Tech target' },
          { matchup: 'Gravy', share: '–', note: 'Potential tech target' },
          { matchup: 'Everything else', share: '–', note: 'Big wide open meta — need to be ready for anything' },
        ],
        notes: [
          {
            date: '18.03.26',
            sections: [
              {
                heading: 'General',
                entries: [
                  'Hyper Inflation is just bad.',
                  'Frailty trap still feels really strong in some matchups.',
                ],
              },
              {
                heading: 'Victor (defensive)',
                entries: [
                  'Seeing Death Touch early is incredibly important in the slow matchups.',
                  'Always play around Iron Grip if you can.',
                  'Even if fatigue, we should play consistent 60.',
                  'Stealth Attack can be very bricky.',
                  'Deck damage is real as long as they don\'t represent multiple remembrances.',
                  'Codex of Inertia is good for resetting the board state.',
                  'Spreading Plague can be very clutch in the endgame.',
                ],
              },
            ],
          },
          {
            date: '25.03.26',
            sections: [
              {
                heading: 'Gravy Bones',
                entries: [
                  'Being as disruptive as possible is the priority.',
                  'Play defense reactions and small disruptive hands while blocking efficiently.',
                  'If they give us space, present more to push them into lethal range where we can cheat out the win.',
                  'Pilfer the Tomb is pretty good.',
                ],
              },
              {
                heading: 'Vynnset',
                entries: [
                  'Play all blues we can and defense reactions.',
                  'Unsure how much disruption we want — most of it banishes cards from hand.',
                  'That said, they shouldn\'t have that many Runegate cards in hand, so disruption could still be useful.',
                  'Check average statistics and get input from others on their boarding approach.',
                ],
              },
            ],
          },
          {
            date: '01.04.26',
            sections: [
              {
                heading: null,
                entries: [
                  'The Jakob shell is so good. No need for a dedicated endgame plan — the yellows and blues are doing what we want.',
                  'Whittles are true-damage-generating Cheliceras. We can transform them to Kiss of Death in reactions and flick that for extra true damage.',
                  'Everything left in the deck should support the endgame plan. And we have an "infinite" supply of Mark as long as we have a Relentless Pursuit.',
                  'The rest is the standard Mario pile. Liking a stealth and a non-stealth package depending on the matchup, and a huge fan of 3 Incisions.',
                  'Next up: find the correct gameplan and sideboard into every hero.',
                ],
              },
            ],
          },
          {
            date: '07.04.26',
            sections: [
              {
                heading: 'Mario (General / vs Gravy)',
                entries: [
                  'Learned a lot about Mario. Against Gravy it\'s important to either give him full tempo OR play big hands (chained disruption, etc.).',
                  'Clear allies, play the value game, and try to find an angle to force blocks — the player who blocks gets fatigued.',
                  'Always hide information when threatening on-hits to avoid making blocking easy.',
                  'Defense reactions in arsenal are really good.',
                  'Play a lot of blocking cards.',
                  'Codex can be very awkward — giving them a Conqueror of the High Seas can be very bad.',
                ],
              },
            ],
          },
          {
            date: '08.04.26',
            sections: [
              {
                heading: 'Oscilio',
                entries: [
                  'Draw order matters a lot.',
                  'Many decision points: disrupt vs. keep Mark for Chelicera early.',
                  'Use Amulet before GIAF resolves.',
                  'Be mindful of Wobble, Cloud Cover, and Sigil of Solace.',
                  'Headpiece for disruption is also really good.',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
