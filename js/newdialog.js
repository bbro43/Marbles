// Story dialog for the Season 3 and 4 newcomers (Billy, Nov 22). All original lines, written for these characters.
// Voices follow the race playstyles (claude/new-brawlers.md): Gundalians push to win fast, Neathians are patient and guarded,
// Vestals read the situation, Humans are easygoing. {you} = your brawler name, {div} = your division or league.
// Models in scenes are still to build: these are just the lines.
//
// Each brawler:  intro      the first time you meet them (then a Battle / Not now choice)
//                challenge  their own challenge line (used half the time, by day; the race bank below the other half)
//                notNow     you said "Not now" at the first meeting
//                theyWon    after a match they won against you
//                theyLost   after a match they lost to you

export const NEW_TALK = {
  // ---- Gundalians (Season 3)
  brodny: {
    intro: ['You. You\'re one of the locals.', 'Brodny. Subterra and Haos. I dig in, I hold the ground, and then I flatten whatever\'s on it.',
      'Your arenas are smaller than I expected. Fine. Less room for you to run.'],
    challenge: 'No talking. Gate card down. Let\'s go.',
    notNow: 'Hm. Don\'t make me come looking.',
    theyWon: 'Ground holds. It always holds.',
    theyLost: 'You cracked it. Nobody cracks it. Again, now.',
  },
  kasimir: {
    intro: ['So this is the famous Interspace. Bright. Loud. Soft.', 'I am Kasimir. The others answer to me while we are here.',
      'They tell me you are a name to know in {div}. Then my ranking starts with you.'],
    challenge: 'Stand where I can see you, {you}. We will settle this quickly.',
    notNow: 'You may go. I am patient for exactly one day.',
    theyWon: 'As expected. Do not take it personally. Take it as a lesson.',
    theyLost: 'Noted. You will not get that opening from me again.',
  },
  pavel: {
    intro: ['Hey, hey, you, are you a brawler? You look like a brawler. Good.', 'Pavel. Ventus and Aquos. Hairadee is the fastest thing in this whole place, and I\'m second.',
      'Want to go? Let\'s go. I already threw. Kidding. Mostly.'],
    challenge: 'Quick one? I\'ll be done before your Gate card lands.',
    notNow: 'Ugh. Fine. I\'ll do four laps of The Commons and come back.',
    theyWon: 'Too slow! Want to try again? Let\'s try again.',
    theyLost: 'Wait, what? Okay, okay. That was fast. You\'re fast. I hate it.',
  },
  tibor: {
    intro: ['Is anyone watching? Good, they should be.', 'Tibor. Darkus and Pyrus. Centorrior and I don\'t do quiet matches.',
      'You look like you\'d put on a show. Prove me right.'],
    challenge: 'Let\'s give the crowd something. You and me, right now.',
    notNow: 'Boo. The crowd wanted it, {you}.',
    theyWon: 'That\'s how you end a match! Did everyone get that?',
    theyLost: 'Hah! Fine, you get the applause this time. Enjoy it.',
  },
  zarek: {
    intro: ['A brawler should introduce themselves before a duel. I am Zarek.', 'Aquos and Ventus. I serve with Kasimir, but in the arena I answer to no one.',
      'Bow if you like. I won\'t wait for it.'],
    challenge: 'A duel, {you}. One clean match. No excuses after.',
    notNow: 'Then the duel is postponed. Not cancelled.',
    theyWon: 'A good duel. You held on longer than most.',
    theyLost: 'You earned that. I will remember the move you used.',
  },
  zorro: {
    intro: ['Ah, an audience of one. It\'ll do.', 'Zorro. Pyrus and Darkus. Druman and I have three finishing moves, and you get to see all of them.',
      'Don\'t blink. Actually, blink. It\'s funnier when you miss it.'],
    challenge: 'Ready for the show, {you}? Front row seat, free of charge.',
    notNow: 'Rain check! The show will be even better later.',
    theyWon: 'And the crowd goes wild. Well. The crowd is me. I go wild.',
    theyLost: 'Okay, that was a good trick. I\'m stealing it. Credit to you, of course.',
  },
  vasek: {
    intro: ['Oh! Hi. Sorry. I\'m supposed to look tough.', 'I\'m Vasek. Haos. Limulus isn\'t a famous partner like the others have, but he\'s mine.',
      'Kasimir says I need more matches. So... would you battle me?'],
    challenge: 'Can we battle? I worked out a new combo last night.',
    notNow: 'That\'s okay. I\'ll practice more first.',
    theyWon: 'I won? I won! Kasimir has to hear about this.',
    theyLost: 'That\'s okay. I learned something. I think. Can we do it again?',
  },
  vesna: {
    intro: ['You\'re in my way. No, really, you\'re standing on my side of the floor.', 'Vesna. Pyrus and Ventus. I don\'t have a big-name partner and I don\'t need one.',
      'The boys think they\'ll top this league. I think I\'ll top them first.'],
    challenge: 'You. Me. I\'ll make it quick and you\'ll make it interesting. Deal?',
    notNow: 'Running away already? Cute.',
    theyWon: 'Told you. Quick.',
    theyLost: 'Ugh. Fine. That was good. Don\'t make that face, it was good.',
  },
  // ---- Neathians (Season 3)
  arcadius: {
    intro: ['Greetings. I am Arcadius. I lead the Neathians who have come to Interspace.', 'We came to learn how your brawlers fight. Apollonir and I will not hold back, but we will not rush either.',
      'If you would test yourself, {you}, I accept.'],
    challenge: 'Shall we, {you}? A fair match, at whatever pace it takes.',
    notNow: 'Of course. A brawler should choose their own hour.',
    theyWon: 'Well fought. You pressed hard. Patience carried the day this time.',
    theyLost: 'You found the gap in my guard. I will close it. Thank you for showing me.',
  },
  mousoulios: {
    intro: ['Ah, a local brawler. Forgive me, I have been taking notes on everyone.', 'Mousoulios. Aquos. Frosch and I study a match before we play it.',
      'Would you allow me to study yours? From the other side of the field.'],
    challenge: 'I have a theory about your deck, {you}. Would you help me test it?',
    notNow: 'Understood. I have plenty of notes to read in the meantime.',
    theyWon: 'The theory holds. Thank you, that was very useful.',
    theyLost: 'Fascinating. My notes were wrong. I love it when my notes are wrong.',
  },
  demitri: {
    intro: ['...', 'Demitri. Subterra. Clayf.', 'You may challenge me. Most do not get far.'],
    challenge: 'Match?',
    notNow: 'Hm.',
    theyWon: 'Held.',
    theyLost: '...Good. Again sometime.',
  },
  eirene: {
    intro: ['Hello. You must be {you}. I asked who the promising brawlers in {div} were.', 'I am Eirene. Haos, with Lars Lion. I speak for Neathia here, which mostly means I listen.',
      'A friendly match is a fine way to begin. Would you agree?'],
    challenge: 'A friendly match, {you}? I would like to see how you have grown.',
    notNow: 'Another time, then. I am never far.',
    theyWon: 'Thank you for the match. You lose with grace. That is rarer than winning.',
    theyLost: 'Beautifully done. I will tell the others to watch for you.',
  },
  petronas: {
    intro: ['I have watched you for three matches now.', 'Petronas. Darkus. Exedra and I wait for the mistake, and then we end it.',
      'You made two mistakes in your last match. Shall I show you?'],
    challenge: 'I know where your mistake will be. Let\'s find out if I\'m right.',
    notNow: 'I will keep watching, then.',
    theyWon: 'Second Gate card. That was the mistake.',
    theyLost: 'No mistakes this time. Interesting. I need to watch more closely.',
  },
  eudocia: {
    intro: ['Brawler. State your name.', 'Thank you. I am Eudocia, officer of the Neathian guard. Ventus, with Oberus.',
      'My orders are to learn your rules by competing under them. Will you assist?'],
    challenge: 'A training match, {you}. I am ready when you are.',
    notNow: 'Acknowledged. I will report back later.',
    theyWon: 'Training complete. You held formation well.',
    theyLost: 'Defeat acknowledged. I will review it tonight. Thoroughly.',
  },
  ignatios: {
    intro: ['Oh! You\'re a brawler from here, aren\'t you?', 'I\'m Ignatios. Pyrus. I\'m the youngest of us, so I don\'t have a partner from home yet.',
      'But I\'ve been training with the synthetics here, and I\'m getting good. Want to see?'],
    challenge: 'Battle me, {you}? I promise I\'ll be careful. Well, careful-ish.',
    notNow: 'Okay! I\'ll be training in the arena if you change your mind.',
    theyWon: 'I did it! Arcadius said I should wait for the right moment, and I did!',
    theyLost: 'You\'re really good. Next time I\'ll wait even longer. That\'s the trick, right?',
  },
  // ---- Human (Season 3)
  jason: {
    intro: ['Hey, have you seen the new guys? There are actual Gundalians here. And Neathians!', 'I\'m Jason, by the way. Ventus. Tuskor\'s my partner.',
      'I just got bumped into League 4 with all of them. Want a warm-up before I get flattened?'],
    challenge: 'Warm-up match? You\'re way less scary than the new guys.',
    notNow: 'Cool, cool. I\'ll go get flattened by Brodny instead.',
    theyWon: 'No way. I actually won. Okay, I\'m ready for the new guys now.',
    theyLost: 'Yeah, that tracks. Good match though!',
  },
  // ---- Season 4
  evelyn: {   // Raven, Vestal, Darkus
    intro: ['You\'re {you}. Your win rate goes up in the evening. Did you know that?', 'Raven. Darkus. Rattleoid and I don\'t chase every battle. We pick the ones that matter.',
      'This one might matter. Let\'s find out.'],
    challenge: 'I\'ve run the numbers on you, {you}. Let\'s see if they\'re right.',
    notNow: 'Fine. The numbers will keep.',
    theyWon: 'Within the margin. Thanks for the data.',
    theyLost: 'Outside the margin. I\'ll need to rework everything. Good.',
  },
  onyx: {
    intro: ['...You\'re the one people keep talking about.', 'Onyx. Subterra. This is Dryoid.',
      'I don\'t do warm-ups. If we battle, it counts.'],
    challenge: 'It counts this time too, {you}. Ready?',
    notNow: 'Then don\'t waste my time next time.',
    theyWon: 'That\'s what Dryoid is for.',
    theyLost: '...Nobody does that. Remember this match. I will.',
  },
  kala: {
    intro: ['Hiii! Are you {you}? Everyone said you were the one to beat. Or one of them.', 'I\'m Kala. Aquos, with Fifth Paladin. I just moved here and I want to battle everybody.',
      'You\'re first on my list! Well, second. The first one said no.'],
    challenge: 'Battle, battle, battle? Please?',
    notNow: 'Aw. Okay! I\'ll ask again tomorrow. And the day after.',
    theyWon: 'Yay! That was so fun. Can we do it again right now?',
    theyLost: 'That was amazing. You have to teach me that.',
  },
  olivia: {
    intro: ['Hold on, I\'m tying my boots. Okay.', 'Olivia. Subterra, with Wormquake. I train outside, before Interspace even opens.',
      'I\'m not here to make friends first. I\'m here to get good. Battle?'],
    challenge: 'Got time for a real match? I\'ve been training all week.',
    notNow: 'Fine. More training for me.',
    theyWon: 'All those early mornings. Worth it.',
    theyLost: 'Okay. Back to training. You\'ll see me again.',
  },
};

// the race bank: the other half of the time, a newcomer challenges you in their race's voice, by friendship tone
export const RACE_CHALLENGE = {
  Gundalian: { best: 'There you are. Come on, I\'ve been waiting all day to beat you.', friend: 'Got a match in you? Let\'s make it fast.',
    acq: 'You. Battle. Now, if you can keep up.', cold: 'Step up or step aside. I don\'t have time for both.' },
  Neathian: { best: 'I hoped I would find you here. Would you share a match with me?', friend: 'A match, if you have the time? I would welcome it.',
    acq: 'If you wish to battle, I am ready.', cold: 'You may challenge me. Expect a long match.' },
  Vestal: { best: 'Perfect timing. I\'ve got a plan and you\'re the only one who\'d get it.', friend: 'I\'ve been thinking about how you play. Want to test it?',
    acq: 'You free? I\'ve got something to try.', cold: 'One match. I\'ll tell you afterward what you did wrong.' },
};

// Season starts: ISA announces the newcomers
export const SEASON_INTRO = {
  3: ['Attention, all brawlers. Interspace has opened its gates to visitors from two other worlds.',
    'Eight Gundalians and seven Neathians have registered for League 4, along with one new local brawler.',
    'League 4 now plays in two divisions. There is no relegation this season.',
    'Please welcome our visitors. Battles are under Interspace rules for everyone.'],
  4: ['Attention, all brawlers. Four new brawlers have registered for League 4 this season.',
    'Two of them are Vestals. One of them, Onyx, has asked that his matches not be called warm-ups.',
    'Good luck to everyone this season.'],
};

// the first time a Gundalian and a Neathian are in the same place with you (Season 3 on): a short exchange
// g = the Gundalian, n = the Neathian
export const RACE_CLASH = [
  ['g', 'Look who it is. The Neathians, waiting for someone else to make the first move again.'],
  ['n', 'And the Gundalians, making the first move before they know where it goes.'],
  ['g', 'It goes through you. That\'s where.'],
  ['n', 'Then let the league decide. Not the floor of the arena lobby.'],
  ['ISA', 'Reminder: challenges are settled in the arenas. Thank you.'],
];
