// Looks for the 23 Interspace newcomers, built from the character creator's parts (js/avatar.js), including our own
// hair styles 10-15, soft eyebrows 6-7 and skirts (down 8-9). Humans have natural hair (blond, brunette, black);
// Vestals have the bright colors 6-11 and eye colors 6-11 (tinted pupils) (Billy, Nov 17). All original designs.
export const NEWCOMER_LOOKS = {
  richard: {"hair": [1, 1], "eye": [1, 0], "eyeblow": [1, 1], "facial": [0, 0], "top": [3, 0], "down": [2, 1], "shoes": [1, 0], "skin": 1, "band": "pyrus"},
  ryan: {"hair": [3, 2], "eye": [0, 2], "eyeblow": [0, 2], "facial": [1, 0], "top": [5, 3], "down": [0, 2], "shoes": [2, 2], "skin": 0, "band": "ventus"},
  george: {"hair": [6, 0], "glasses": [1, 0], "eye": [2, 0], "eyeblow": [2, 0], "facial": [2, 1], "top": [7, 1], "down": [4, 4], "shoes": [0, 1], "skin": 2, "band": "darkus"},
  brandon: {"hair": [0, 1], "eye": [3, 0], "eyeblow": [3, 1], "facial": [3, 0], "top": [2, 0], "down": [1, 0], "shoes": [3, 0], "skin": 3, "band": "pyrus"},
  gary: {"hair": [8, 0], "cap": [2, 1], "eye": [4, 0], "eyeblow": [4, 0], "facial": [4, 0], "top": [4, 2], "down": [5, 1], "shoes": [1, 3], "skin": 0, "band": "pyrus"},
  anthony: {"hair": [7, 2], "eye": [5, 1], "eyeblow": [5, 2], "facial": [5, 2], "top": [6, 4], "down": [3, 3], "shoes": [2, 4], "skin": 4, "band": "aquos"},
  nico: {"hair": [9, 8], "eye": [0, 9], "eyeblow": [0, 8], "facial": [0, 0], "top": [1, 5], "down": [6, 5], "shoes": [0, 5], "skin": 0, "band": "haos"},
  xander: {"hair": [4, 7], "eye": [3, 10], "eyeblow": [3, 7], "facial": [1, 0], "top": [0, 4], "down": [7, 0], "shoes": [3, 1], "skin": 0, "band": "ventus"},
  rocco: {"hair": [5, 10], "eye": [2, 11], "eyeblow": [2, 10], "facial": [3, 1], "top": [3, 3], "down": [2, 4], "shoes": [1, 1], "skin": 1, "band": "darkus"},
  otto: {"hair": [2, 9], "eye": [4, 9], "eyeblow": [4, 9], "facial": [2, 0], "top": [5, 1], "down": [6, 1], "shoes": [2, 0], "skin": 0, "band": "darkus"},
  maisie: {"hair": [10, 10], "eye": [2, 11], "eyeblow": [6, 10], "facial": [0, 0], "top": [7, 2], "down": [8, 2], "shoes": [1, 1], "skin": 0, "band": "pyrus"},
  ella: {"hair": [14, 6], "eye": [0, 9], "eyeblow": [7, 6], "facial": [1, 0], "top": [2, 0], "down": [9, 0], "shoes": [0, 4], "skin": 1, "band": "pyrus"},
  sophie: {"hair": [15, 9], "eye": [3, 10], "eyeblow": [6, 9], "facial": [2, 0], "top": [0, 5], "down": [5, 2], "shoes": [3, 2], "skin": 0, "band": "darkus"},
  freya: {"hair": [11, 7], "eye": [1, 7], "eyeblow": [6, 7], "facial": [0, 0], "top": [3, 1], "down": [9, 4], "shoes": [2, 3], "skin": 0, "band": "pyrus"},
  zoya: {"hair": [13, 11], "eye": [4, 8], "eyeblow": [7, 11], "facial": [3, 0], "top": [6, 2], "down": [8, 5], "shoes": [1, 5], "skin": 2, "band": "pyrus"},
  ellie: {"hair": [12, 8], "eye": [5, 9], "eyeblow": [6, 8], "facial": [1, 0], "top": [5, 4], "down": [9, 3], "shoes": [0, 2], "skin": 0, "band": "aquos"},
  sarah: {"hair": [11, 2], "eye": [0, 2], "eyeblow": [6, 2], "facial": [2, 0], "top": [4, 3], "down": [8, 5], "shoes": [2, 0], "skin": 0, "band": "ventus"},
  heather: {"hair": [10, 0], "eye": [2, 0], "eyeblow": [6, 0], "facial": [0, 0], "top": [1, 4], "down": [3, 1], "shoes": [3, 1], "skin": 1, "band": "aquos"},
  margaret: {"hair": [13, 1], "glasses": [0, 0], "eye": [3, 0], "eyeblow": [7, 1], "facial": [4, 0], "top": [7, 5], "down": [9, 3], "shoes": [0, 0], "skin": 3, "band": "haos"},
  melissa: {"hair": [15, 2], "eye": [1, 4], "eyeblow": [6, 2], "facial": [1, 0], "top": [5, 0], "down": [9, 1], "shoes": [1, 2], "skin": 0, "band": "pyrus"},
  karen: {"hair": [12, 1], "eye": [4, 0], "eyeblow": [6, 1], "facial": [3, 0], "top": [2, 2], "down": [8, 2], "shoes": [2, 4], "skin": 4, "band": "pyrus"},
  brenda: {"hair": [14, 0], "eye": [5, 1], "eyeblow": [7, 0], "facial": [2, 0], "top": [3, 3], "down": [1, 2], "shoes": [3, 3], "skin": 2, "band": "pyrus"},
  amanda: {"hair": [10, 5], "eye": [0, 5], "eyeblow": [6, 5], "facial": [5, 0], "top": [6, 3], "down": [9, 0], "shoes": [0, 5], "skin": 1, "band": "haos"},
};

// Looks for the 21 brawlers from Billy's Sim sheet (Seasons 3 and 4, js/newbrawlers.js). Original designs from the creator's parts:
// race (Gundalian gray skin, eye marks and gold plate; Neathian diamond eyes and blue or pink skin by sex; Vestal tinted eyes 6-11
// and bright hair 6-11; Human natural hair 0-5), the darker race hair colors 12-21 (EXTRA_HAIR), Billy's outfit pieces
// (tops 18-29, pants 14-25, shoes 7-20) and whole outfits (0 Formal Gown, 1 High Uniform Dress, 2 Blue Dueling Coat, 3 Navy Leader Coat),
// and our own clothes 8-17 (top), 10-13 (pants), 4-6 (shoes). Gundalian hair is always a style that leaves the plate showing.
const O = { gloves: [-1, 0], accent: [-1, 0], cap: [-1, 0], glasses: [-1, 0], outfit: [-1, 0] };
export const NEW_LOOKS = {
  // Gundalians
  brodny: { ...O, race: 'gundalian', sex: 'm', hair: [4, 15], eye: [3, 2], eyeblow: [3, 15], facial: [2, 0], top: [26, 0], down: [19, 0], shoes: [12, 0], skin: 0, band: 'subterra' },
  kasimir: { ...O, race: 'gundalian', sex: 'm', hair: [7, 17], eye: [1, 0], eyeblow: [1, 17], facial: [4, 0], top: [29, 0], down: [22, 0], shoes: [15, 0], skin: 0, band: 'haos', outfit: [3, 0] },
  pavel: { ...O, race: 'gundalian', sex: 'm', hair: [9, 16], eye: [4, 3], eyeblow: [4, 16], facial: [1, 0], top: [20, 0], down: [20, 0], shoes: [13, 0], skin: 0, band: 'ventus' },
  tibor: { ...O, race: 'gundalian', sex: 'm', hair: [2, 21], eye: [5, 1], eyeblow: [5, 21], facial: [3, 0], top: [21, 0], down: [24, 0], shoes: [17, 0], skin: 0, band: 'darkus', gloves: [0, 0] },
  vasek: { ...O, race: 'gundalian', sex: 'm', hair: [6, 12], eye: [2, 4], eyeblow: [2, 12], facial: [0, 0], top: [28, 0], down: [15, 0], shoes: [8, 0], skin: 0, band: 'haos' },
  vesna: { ...O, race: 'gundalian', sex: 'f', hair: [11, 20], eye: [0, 1], eyeblow: [6, 20], facial: [0, 0], top: [23, 0], down: [9, 2], shoes: [11, 0], skin: 0, band: 'pyrus' },
  zarek: { ...O, race: 'gundalian', sex: 'm', hair: [10, 13], eye: [3, 4], eyeblow: [3, 13], facial: [2, 0], top: [27, 0], down: [14, 0], shoes: [7, 0], skin: 0, band: 'aquos', outfit: [2, 0] },
  zorro: { ...O, race: 'gundalian', sex: 'm', hair: [9, 19], eye: [4, 1], eyeblow: [4, 19], facial: [5, 0], top: [14, 0], down: [10, 0], shoes: [4, 0], skin: 0, band: 'pyrus', accent: [0, 7] },
  // Neathians
  arcadius: { ...O, race: 'neathian', sex: 'm', hair: [7, 18], eye: [1, 0], eyeblow: [1, 18], facial: [0, 0], top: [15, 1], down: [10, 1], shoes: [5, 1], skin: 0, band: 'pyrus' },
  demitri: { ...O, race: 'neathian', sex: 'm', hair: [4, 16], eye: [2, 0], eyeblow: [2, 16], facial: [1, 0], top: [19, 0], down: [17, 0], shoes: [10, 0], skin: 0, band: 'subterra' },
  eudocia: { ...O, race: 'neathian', sex: 'f', hair: [13, 18], eye: [0, 0], eyeblow: [6, 18], facial: [0, 0], top: [31, 0], down: [14, 0], shoes: [20, 0], skin: 0, band: 'ventus', outfit: [1, 0] },
  ignatios: { ...O, race: 'neathian', sex: 'm', hair: [2, 19], eye: [3, 0], eyeblow: [3, 19], facial: [3, 0], top: [22, 0], down: [23, 0], shoes: [16, 0], skin: 0, band: 'pyrus' },
  mousoulios: { ...O, race: 'neathian', sex: 'm', hair: [9, 13], eye: [4, 0], eyeblow: [4, 13], facial: [2, 0], top: [27, 0], down: [14, 0], shoes: [7, 0], skin: 0, band: 'aquos' },
  petronas: { ...O, race: 'neathian', sex: 'm', hair: [10, 21], eye: [5, 0], eyeblow: [5, 21], facial: [4, 0], top: [29, 0], down: [18, 0], shoes: [15, 0], skin: 0, band: 'darkus' },
  sophia: { ...O, race: 'neathian', sex: 'f', hair: [14, 19], eye: [0, 0], eyeblow: [7, 19], facial: [0, 0], top: [30, 0], down: [14, 0], shoes: [19, 0], skin: 0, band: 'haos', outfit: [0, 0] },
  // Humans
  jason: { ...O, race: 'human', sex: 'm', hair: [3, 2], eye: [1, 2], eyeblow: [1, 2], facial: [2, 1], top: [25, 0], down: [21, 0], shoes: [14, 0], skin: 1, band: 'ventus' },
  kala: { ...O, race: 'human', sex: 'f', hair: [12, 3], eye: [0, 3], eyeblow: [6, 3], facial: [1, 2], top: [16, 1], down: [8, 1], shoes: [6, 1], skin: 3, band: 'aquos' },
  olivia: { ...O, race: 'human', sex: 'f', hair: [15, 1], eye: [2, 1], eyeblow: [7, 1], facial: [3, 0], top: [24, 0], down: [25, 0], shoes: [18, 0], skin: 0, band: 'subterra' },
  raymond: { ...O, race: 'human', sex: 'm', hair: [5, 4], eye: [3, 5], eyeblow: [3, 4], facial: [4, 2], top: [10, 2], down: [12, 2], shoes: [4, 2], skin: 2, band: 'subterra', glasses: [2, 1] },
  // Vestals
  evelyn: { ...O, race: 'vestal', sex: 'f', hair: [11, 9], eye: [1, 7], eyeblow: [6, 9], facial: [0, 0], top: [9, 4], down: [9, 4], shoes: [6, 4], skin: 0, band: 'darkus' },
  nina: { ...O, race: 'vestal', sex: 'f', hair: [13, 10], eye: [2, 10], eyeblow: [7, 10], facial: [1, 0], top: [17, 4], down: [13, 4], shoes: [5, 4], skin: 1, band: 'darkus' },
};
