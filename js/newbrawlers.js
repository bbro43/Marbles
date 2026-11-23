// The 21 brawlers from Billy's Sim sheet, joining in Seasons 3 and 4. Built by tools/newbrawlers.mjs: edit the table there.
// Importing this file adds them to INTERSPACE and STORY_START (js/aiteams.js), so everything that looks brawlers up finds them.
import { INTERSPACE, STORY_START } from './aiteams.js';
export const NEW_BRAWLERS = {
 "brodny": {
  "name": "Brodny",
  "species": "Gundalian",
  "attrs": [
   "subterra",
   "haos"
  ],
  "signature": "Tricloid",
  "joins": 3,
  "easy": {
   "attr": "subterra",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_15",
     "attr": "subterra",
     "name": "Tricloid"
    },
    {
     "id": "bb_41",
     "attr": "subterra",
     "name": "Saurus"
    },
    {
     "id": "tt_11",
     "attr": "haos",
     "name": "Mantris"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_121",
     "name": "Saurus"
    },
    "silver": {
     "id": "ds_202",
     "name": "Muddy Ground"
    },
    "copper": {
     "id": "ds_303",
     "name": "Clipped Wings"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_418",
     "name": "Spin Battle Redo"
    },
    "blue": {
     "id": "ds_612",
     "name": "G-Power Up"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_427",
      "name": "Subterra Double Input"
     },
     {
      "id": "ds_428",
      "name": "Haos Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_605",
      "name": "Home Advantage"
     },
     {
      "id": "ds_624",
      "name": "Ventus and Haos Combo"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "subterra",
   "upgrades": 5,
   "toys": [
    {
     "id": "tt_15",
     "attr": "subterra",
     "name": "Tricloid"
    },
    {
     "id": "tt_11",
     "attr": "subterra",
     "name": "Mantris"
    },
    {
     "id": "bb_25",
     "attr": "haos",
     "name": "Reaper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_113",
     "name": "Reaper"
    },
    "silver": {
     "id": "ds_208",
     "name": "Whirlpool"
    },
    "copper": {
     "id": "ds_305",
     "name": "Down For The Count"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_404",
     "name": "Haos Swap"
    },
    "blue": {
     "id": "ds_620",
     "name": "The Glow"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_411",
      "name": "Subterra Time Breaker"
     },
     {
      "id": "ds_412",
      "name": "Haos Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_601",
      "name": "Bright Light"
     },
     {
      "id": "ds_608",
      "name": "Mega Impact"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "subterra",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_15",
     "attr": "subterra",
     "name": "Tricloid"
    },
    {
     "id": "bb_25",
     "attr": "subterra",
     "name": "Reaper"
    },
    {
     "id": "tt_10",
     "attr": "haos",
     "name": "Limulus"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_113",
     "name": "Reaper"
    },
    "silver": {
     "id": "ds_209",
     "name": "Earthen Mound"
    },
    "copper": {
     "id": "ds_309",
     "name": "Electrified"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_403",
     "name": "Subterra Swap"
    },
    "blue": {
     "id": "ds_610",
     "name": "Flash"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_404",
      "name": "Haos Swap"
     },
     {
      "id": "ds_411",
      "name": "Subterra Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_620",
      "name": "The Glow"
     },
     {
      "id": "ds_601",
      "name": "Bright Light"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 },
 "kasimir": {
  "name": "Kasimir",
  "species": "Gundalian",
  "attrs": [
   "haos",
   "subterra"
  ],
  "signature": "Rabeeder",
  "joins": 3,
  "easy": {
   "attr": "haos",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_13",
     "attr": "haos",
     "name": "Rabeeder"
    },
    {
     "id": "tt_20",
     "attr": "haos",
     "name": "Goblin Ball"
    },
    {
     "id": "bb_52",
     "attr": "subterra",
     "name": "Gargonoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_131",
     "name": "Gargonoid"
    },
    "silver": {
     "id": "ds_223",
     "name": "Nightmare"
    },
    "copper": {
     "id": "ds_305",
     "name": "Down For The Count"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_418",
     "name": "Spin Battle Redo"
    },
    "blue": {
     "id": "ds_612",
     "name": "G-Power Up"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_427",
      "name": "Subterra Double Input"
     },
     {
      "id": "ds_428",
      "name": "Haos Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_605",
      "name": "Home Advantage"
     },
     {
      "id": "ds_624",
      "name": "Ventus and Haos Combo"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "haos",
   "upgrades": 5,
   "toys": [
    {
     "id": "tt_13",
     "attr": "haos",
     "name": "Rabeeder"
    },
    {
     "id": "bb_52",
     "attr": "haos",
     "name": "Gargonoid"
    },
    {
     "id": "bb_48",
     "attr": "subterra",
     "name": "Fear Ripper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_128",
     "name": "Fear Ripper"
    },
    "silver": {
     "id": "ds_209",
     "name": "Earthen Mound"
    },
    "copper": {
     "id": "ds_316",
     "name": "Elements"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_404",
     "name": "Haos Swap"
    },
    "blue": {
     "id": "ds_620",
     "name": "The Glow"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_411",
      "name": "Subterra Time Breaker"
     },
     {
      "id": "ds_412",
      "name": "Haos Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_601",
      "name": "Bright Light"
     },
     {
      "id": "ds_608",
      "name": "Mega Impact"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "haos",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_13",
     "attr": "haos",
     "name": "Rabeeder"
    },
    {
     "id": "bb_48",
     "attr": "haos",
     "name": "Fear Ripper"
    },
    {
     "id": "bt_hynoid",
     "attr": "subterra",
     "name": "Hynoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_128",
     "name": "Fear Ripper"
    },
    "silver": {
     "id": "ds_203",
     "name": "Light-Burst"
    },
    "copper": {
     "id": "ds_309",
     "name": "Electrified"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_403",
     "name": "Subterra Swap"
    },
    "blue": {
     "id": "ds_610",
     "name": "Flash"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_404",
      "name": "Haos Swap"
     },
     {
      "id": "ds_411",
      "name": "Subterra Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_620",
      "name": "The Glow"
     },
     {
      "id": "ds_601",
      "name": "Bright Light"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 },
 "pavel": {
  "name": "Pavel",
  "species": "Gundalian",
  "attrs": [
   "ventus",
   "aquos"
  ],
  "signature": "Hairadee",
  "joins": 3,
  "easy": {
   "attr": "ventus",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_08",
     "attr": "ventus",
     "name": "Hairadee"
    },
    {
     "id": "bb_40",
     "attr": "ventus",
     "name": "Robotallion"
    },
    {
     "id": "tt_18",
     "attr": "aquos",
     "name": "Rattleoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_120",
     "name": "Robotallion"
    },
    "silver": {
     "id": "ds_232",
     "name": "Blue Sky"
    },
    "copper": {
     "id": "ds_317",
     "name": "Waist Deep"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_418",
     "name": "Spin Battle Redo"
    },
    "blue": {
     "id": "ds_622",
     "name": "The Gust"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_426",
      "name": "Aquos Double Input"
     },
     {
      "id": "ds_430",
      "name": "Ventus Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_604",
      "name": "Blaze"
     },
     {
      "id": "ds_621",
      "name": "The Shadow"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   },
   "trap": {
    "id": "dc_spt06",
    "name": "Metalfencer",
    "color": "ventus",
    "attrs": [
     "ventus",
     "aquos",
     "subterra"
    ]
   }
  },
  "normal": {
   "attr": "ventus",
   "upgrades": 5,
   "toys": [
    {
     "id": "tt_08",
     "attr": "ventus",
     "name": "Hairadee"
    },
    {
     "id": "tt_18",
     "attr": "ventus",
     "name": "Rattleoid"
    },
    {
     "id": "tt_06",
     "attr": "aquos",
     "name": "Fifth Paladin"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_110",
     "name": "Storm Skyress"
    },
    "silver": {
     "id": "ds_213",
     "name": "Sand Storm"
    },
    "copper": {
     "id": "ds_308",
     "name": "Load Up"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_406",
     "name": "Ventus Swap"
    },
    "blue": {
     "id": "ds_615",
     "name": "Updraft"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_410",
      "name": "Aquos Time Breaker"
     },
     {
      "id": "ds_414",
      "name": "Ventus Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_603",
      "name": "G-Power Bump"
     },
     {
      "id": "ds_611",
      "name": "G-Power Bonus"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   },
   "trap": {
    "id": "dc_spt06",
    "name": "Metalfencer",
    "color": "ventus",
    "attrs": [
     "ventus",
     "aquos",
     "subterra"
    ]
   }
  },
  "hard": {
   "attr": "ventus",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_08",
     "attr": "ventus",
     "name": "Hairadee"
    },
    {
     "id": "tt_06",
     "attr": "ventus",
     "name": "Fifth Paladin"
    },
    {
     "id": "bb_46",
     "attr": "aquos",
     "name": "Laserman"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_126",
     "name": "Laserman"
    },
    "silver": {
     "id": "ds_207",
     "name": "Tornado Alley"
    },
    "copper": {
     "id": "ds_312",
     "name": "Heat Haze"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_402",
     "name": "Aquos Swap"
    },
    "blue": {
     "id": "ds_607",
     "name": "Summon Wave"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_406",
      "name": "Ventus Swap"
     },
     {
      "id": "ds_410",
      "name": "Aquos Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_615",
      "name": "Updraft"
     },
     {
      "id": "ds_603",
      "name": "G-Power Bump"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   },
   "trap": {
    "id": "dc_spt06",
    "name": "Metalfencer",
    "color": "ventus",
    "attrs": [
     "ventus",
     "aquos",
     "subterra"
    ]
   }
  }
 },
 "tibor": {
  "name": "Tibor",
  "species": "Gundalian",
  "attrs": [
   "darkus",
   "pyrus"
  ],
  "signature": "Centorrior",
  "joins": 3,
  "easy": {
   "attr": "darkus",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_02",
     "attr": "darkus",
     "name": "Centorrior"
    },
    {
     "id": "bb_44",
     "attr": "darkus",
     "name": "Stinglash"
    },
    {
     "id": "bb_43",
     "attr": "pyrus",
     "name": "Falconeer"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_124",
     "name": "Stinglash"
    },
    "silver": {
     "id": "ds_222",
     "name": "Pit Dweller"
    },
    "copper": {
     "id": "ds_331",
     "name": "Mega Warrior"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_418",
     "name": "Spin Battle Redo"
    },
    "blue": {
     "id": "ds_614",
     "name": "Circle Of Fire"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_424",
      "name": "Level Field"
     },
     {
      "id": "ds_425",
      "name": "Pyrus Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_609",
      "name": "Hot Wind"
     },
     {
      "id": "ds_620",
      "name": "The Glow"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   },
   "trap": {
    "id": "dc_spt02",
    "name": "Tripod Epsilon",
    "color": "darkus",
    "attrs": [
     "darkus",
     "aquos",
     "haos",
     "subterra"
    ]
   }
  },
  "normal": {
   "attr": "darkus",
   "upgrades": 5,
   "toys": [
    {
     "id": "tt_02",
     "attr": "darkus",
     "name": "Centorrior"
    },
    {
     "id": "bb_43",
     "attr": "darkus",
     "name": "Falconeer"
    },
    {
     "id": "bb_60",
     "attr": "pyrus",
     "name": "Warius"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_134",
     "name": "Warius"
    },
    "silver": {
     "id": "ds_203",
     "name": "Light-Burst"
    },
    "copper": {
     "id": "ds_321",
     "name": "Reflexes"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_405",
     "name": "Darkus Swap"
    },
    "blue": {
     "id": "ds_616",
     "name": "Brushfire"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_409",
      "name": "Pyrus Time Breaker"
     },
     {
      "id": "ds_413",
      "name": "Darkus Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_602",
      "name": "G-Power Boost"
     },
     {
      "id": "ds_621",
      "name": "The Shadow"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   },
   "trap": {
    "id": "dc_spt02",
    "name": "Tripod Epsilon",
    "color": "darkus",
    "attrs": [
     "darkus",
     "aquos",
     "haos",
     "subterra"
    ]
   }
  },
  "hard": {
   "attr": "darkus",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_02",
     "attr": "darkus",
     "name": "Centorrior"
    },
    {
     "id": "bb_60",
     "attr": "darkus",
     "name": "Warius"
    },
    {
     "id": "tt_19",
     "attr": "pyrus",
     "name": "El Condor"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_134",
     "name": "Warius"
    },
    "silver": {
     "id": "ds_214",
     "name": "Haunted Night"
    },
    "copper": {
     "id": "ds_309",
     "name": "Electrified"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_401",
     "name": "Pyrus Swap"
    },
    "blue": {
     "id": "ds_606",
     "name": "Power From Darkness"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_405",
      "name": "Darkus Swap"
     },
     {
      "id": "ds_409",
      "name": "Pyrus Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_616",
      "name": "Brushfire"
     },
     {
      "id": "ds_602",
      "name": "G-Power Boost"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   },
   "trap": {
    "id": "dc_spt02",
    "name": "Tripod Epsilon",
    "color": "darkus",
    "attrs": [
     "darkus",
     "aquos",
     "haos",
     "subterra"
    ]
   }
  }
 },
 "zarek": {
  "name": "Zarek",
  "species": "Gundalian",
  "attrs": [
   "aquos",
   "ventus"
  ],
  "signature": "Tayghen",
  "joins": 3,
  "easy": {
   "attr": "aquos",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_14",
     "attr": "aquos",
     "name": "Tayghen"
    },
    {
     "id": "tt_21",
     "attr": "aquos",
     "name": "Jelldon"
    },
    {
     "id": "tt_16",
     "attr": "ventus",
     "name": "Tuskor"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_008",
     "name": "Elfin"
    },
    "silver": {
     "id": "ds_225",
     "name": "Spitting Fire"
    },
    "copper": {
     "id": "ds_308",
     "name": "Load Up"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_418",
     "name": "Spin Battle Redo"
    },
    "blue": {
     "id": "ds_622",
     "name": "The Gust"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_426",
      "name": "Aquos Double Input"
     },
     {
      "id": "ds_430",
      "name": "Ventus Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_604",
      "name": "Blaze"
     },
     {
      "id": "ds_621",
      "name": "The Shadow"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "aquos",
   "upgrades": 5,
   "toys": [
    {
     "id": "tt_14",
     "attr": "aquos",
     "name": "Tayghen"
    },
    {
     "id": "tt_16",
     "attr": "aquos",
     "name": "Tuskor"
    },
    {
     "id": "bt_bee",
     "attr": "ventus",
     "name": "Bee Striker"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_008",
     "name": "Elfin"
    },
    "silver": {
     "id": "ds_204",
     "name": "Tsunami"
    },
    "copper": {
     "id": "ds_303",
     "name": "Clipped Wings"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_406",
     "name": "Ventus Swap"
    },
    "blue": {
     "id": "ds_615",
     "name": "Updraft"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_410",
      "name": "Aquos Time Breaker"
     },
     {
      "id": "ds_414",
      "name": "Ventus Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_603",
      "name": "G-Power Bump"
     },
     {
      "id": "ds_611",
      "name": "G-Power Bonus"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "aquos",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_14",
     "attr": "aquos",
     "name": "Tayghen"
    },
    {
     "id": "bt_bee",
     "attr": "aquos",
     "name": "Bee Striker"
    },
    {
     "id": "bb_61",
     "attr": "ventus",
     "name": "Monarus"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_135",
     "name": "Monarus"
    },
    "silver": {
     "id": "ds_208",
     "name": "Whirlpool"
    },
    "copper": {
     "id": "ds_309",
     "name": "Electrified"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_402",
     "name": "Aquos Swap"
    },
    "blue": {
     "id": "ds_607",
     "name": "Summon Wave"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_406",
      "name": "Ventus Swap"
     },
     {
      "id": "ds_410",
      "name": "Aquos Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_615",
      "name": "Updraft"
     },
     {
      "id": "ds_603",
      "name": "G-Power Bump"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 },
 "zorro": {
  "name": "Zorro",
  "species": "Gundalian",
  "attrs": [
   "pyrus",
   "darkus"
  ],
  "signature": "Druman",
  "joins": 3,
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_04",
     "attr": "pyrus",
     "name": "Druman"
    },
    {
     "id": "bb_56",
     "attr": "pyrus",
     "name": "Manion"
    },
    {
     "id": "bb_50",
     "attr": "darkus",
     "name": "Terrorclaw"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_132",
     "name": "Manion"
    },
    "silver": {
     "id": "ds_226",
     "name": "Earthen Wave"
    },
    "copper": {
     "id": "ds_310",
     "name": "Bait and Switch"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_418",
     "name": "Spin Battle Redo"
    },
    "blue": {
     "id": "ds_614",
     "name": "Circle Of Fire"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_424",
      "name": "Level Field"
     },
     {
      "id": "ds_425",
      "name": "Pyrus Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_609",
      "name": "Hot Wind"
     },
     {
      "id": "ds_620",
      "name": "The Glow"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "pyrus",
   "upgrades": 5,
   "toys": [
    {
     "id": "tt_04",
     "attr": "pyrus",
     "name": "Druman"
    },
    {
     "id": "bb_50",
     "attr": "pyrus",
     "name": "Terrorclaw"
    },
    {
     "id": "tt_17",
     "attr": "darkus",
     "name": "Wormquake"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_130",
     "name": "Terrorclaw"
    },
    "silver": {
     "id": "ds_207",
     "name": "Tornado Alley"
    },
    "copper": {
     "id": "ds_317",
     "name": "Waist Deep"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_405",
     "name": "Darkus Swap"
    },
    "blue": {
     "id": "ds_616",
     "name": "Brushfire"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_409",
      "name": "Pyrus Time Breaker"
     },
     {
      "id": "ds_413",
      "name": "Darkus Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_602",
      "name": "G-Power Boost"
     },
     {
      "id": "ds_621",
      "name": "The Shadow"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "pyrus",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_04",
     "attr": "pyrus",
     "name": "Druman"
    },
    {
     "id": "tt_17",
     "attr": "pyrus",
     "name": "Wormquake"
    },
    {
     "id": "bb_25",
     "attr": "darkus",
     "name": "Reaper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_113",
     "name": "Reaper"
    },
    "silver": {
     "id": "ds_216",
     "name": "Volcanic Lake"
    },
    "copper": {
     "id": "ds_309",
     "name": "Electrified"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_401",
     "name": "Pyrus Swap"
    },
    "blue": {
     "id": "ds_606",
     "name": "Power From Darkness"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_405",
      "name": "Darkus Swap"
     },
     {
      "id": "ds_409",
      "name": "Pyrus Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_616",
      "name": "Brushfire"
     },
     {
      "id": "ds_602",
      "name": "G-Power Boost"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 },
 "vasek": {
  "name": "Vasek",
  "species": "Gundalian",
  "attrs": [
   "haos"
  ],
  "signature": null,
  "joins": 3,
  "easy": {
   "attr": "haos",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_41",
     "attr": "haos",
     "name": "Saurus"
    },
    {
     "id": "bb_39",
     "attr": "haos",
     "name": "Juggernoid"
    },
    {
     "id": "tt_11",
     "attr": "haos",
     "name": "Mantris"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_119",
     "name": "Juggernoid"
    },
    "silver": {
     "id": "ds_223",
     "name": "Nightmare"
    },
    "copper": {
     "id": "ds_305",
     "name": "Down For The Count"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_407",
     "name": "Twin Swap"
    },
    "blue": {
     "id": "ds_606",
     "name": "Power From Darkness"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_408",
      "name": "Counter Swap"
     },
     {
      "id": "ds_415",
      "name": "Twin Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_612",
      "name": "G-Power Up"
     },
     {
      "id": "ds_617",
      "name": "G-Power Increase"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "haos",
   "upgrades": 5,
   "toys": [
    {
     "id": "tt_11",
     "attr": "haos",
     "name": "Mantris"
    },
    {
     "id": "bb_58",
     "attr": "haos",
     "name": "Ravenoid"
    },
    {
     "id": "bt_bee",
     "attr": "haos",
     "name": "Bee Striker"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_133",
     "name": "Ravenoid"
    },
    "silver": {
     "id": "ds_209",
     "name": "Earthen Mound"
    },
    "copper": {
     "id": "ds_316",
     "name": "Elements"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_412",
     "name": "Haos Time Breaker"
    },
    "blue": {
     "id": "ds_610",
     "name": "Flash"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     },
     {
      "id": "ds_428",
      "name": "Haos Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_601",
      "name": "Bright Light"
     },
     {
      "id": "ds_603",
      "name": "G-Power Bump"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "haos",
   "upgrades": 10,
   "toys": [
    {
     "id": "bt_bee",
     "attr": "haos",
     "name": "Bee Striker"
    },
    {
     "id": "bb_61",
     "attr": "haos",
     "name": "Monarus"
    },
    {
     "id": "bb_58",
     "attr": "haos",
     "name": "Ravenoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_133",
     "name": "Ravenoid"
    },
    "silver": {
     "id": "ds_203",
     "name": "Light-Burst"
    },
    "copper": {
     "id": "ds_309",
     "name": "Electrified"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_404",
     "name": "Haos Swap"
    },
    "blue": {
     "id": "ds_620",
     "name": "The Glow"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_412",
      "name": "Haos Time Breaker"
     },
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     }
    ],
    "blue": [
     {
      "id": "ds_610",
      "name": "Flash"
     },
     {
      "id": "ds_601",
      "name": "Bright Light"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 },
 "vesna": {
  "name": "Vesna",
  "species": "Gundalian",
  "attrs": [
   "pyrus",
   "ventus"
  ],
  "signature": null,
  "joins": 3,
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_44",
     "attr": "pyrus",
     "name": "Stinglash"
    },
    {
     "id": "bb_40",
     "attr": "ventus",
     "name": "Robotallion"
    },
    {
     "id": "bb_43",
     "attr": "pyrus",
     "name": "Falconeer"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_120",
     "name": "Robotallion"
    },
    "silver": {
     "id": "ds_226",
     "name": "Earthen Wave"
    },
    "copper": {
     "id": "ds_310",
     "name": "Bait and Switch"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_418",
     "name": "Spin Battle Redo"
    },
    "blue": {
     "id": "ds_604",
     "name": "Blaze"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_424",
      "name": "Level Field"
     },
     {
      "id": "ds_425",
      "name": "Pyrus Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_609",
      "name": "Hot Wind"
     },
     {
      "id": "ds_617",
      "name": "G-Power Increase"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "pyrus",
   "upgrades": 5,
   "toys": [
    {
     "id": "bb_43",
     "attr": "pyrus",
     "name": "Falconeer"
    },
    {
     "id": "tt_18",
     "attr": "ventus",
     "name": "Rattleoid"
    },
    {
     "id": "bb_46",
     "attr": "pyrus",
     "name": "Laserman"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_123",
     "name": "Falconeer"
    },
    "silver": {
     "id": "ds_207",
     "name": "Tornado Alley"
    },
    "copper": {
     "id": "ds_317",
     "name": "Waist Deep"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_406",
     "name": "Ventus Swap"
    },
    "blue": {
     "id": "ds_622",
     "name": "The Gust"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_409",
      "name": "Pyrus Time Breaker"
     },
     {
      "id": "ds_414",
      "name": "Ventus Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_614",
      "name": "Circle Of Fire"
     },
     {
      "id": "ds_616",
      "name": "Brushfire"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "pyrus",
   "upgrades": 10,
   "toys": [
    {
     "id": "bb_46",
     "attr": "pyrus",
     "name": "Laserman"
    },
    {
     "id": "bb_60",
     "attr": "ventus",
     "name": "Warius"
    },
    {
     "id": "tt_18",
     "attr": "pyrus",
     "name": "Rattleoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_134",
     "name": "Warius"
    },
    "silver": {
     "id": "ds_216",
     "name": "Volcanic Lake"
    },
    "copper": {
     "id": "ds_309",
     "name": "Electrified"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_401",
     "name": "Pyrus Swap"
    },
    "blue": {
     "id": "ds_615",
     "name": "Updraft"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_406",
      "name": "Ventus Swap"
     },
     {
      "id": "ds_409",
      "name": "Pyrus Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_622",
      "name": "The Gust"
     },
     {
      "id": "ds_614",
      "name": "Circle Of Fire"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 },
 "arcadius": {
  "name": "Arcadius",
  "species": "Neathian",
  "attrs": [
   "pyrus"
  ],
  "signature": "Apollonir",
  "joins": 3,
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_01",
     "attr": "pyrus",
     "name": "Apollonir"
    },
    {
     "id": "bb_42",
     "attr": "pyrus",
     "name": "Serpenoid"
    },
    {
     "id": "bb_45",
     "attr": "pyrus",
     "name": "Griffon"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_122",
     "name": "Serpenoid"
    },
    "silver": {
     "id": "ds_226",
     "name": "Earthen Wave"
    },
    "copper": {
     "id": "ds_310",
     "name": "Bait and Switch"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_425",
     "name": "Pyrus Double Input"
    },
    "blue": {
     "id": "ds_615",
     "name": "Updraft"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_407",
      "name": "Twin Swap"
     },
     {
      "id": "ds_408",
      "name": "Counter Swap"
     }
    ],
    "blue": [
     {
      "id": "ds_602",
      "name": "G-Power Boost"
     },
     {
      "id": "ds_607",
      "name": "Summon Wave"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "pyrus",
   "upgrades": 5,
   "toys": [
    {
     "id": "tt_01",
     "attr": "pyrus",
     "name": "Apollonir"
    },
    {
     "id": "bb_45",
     "attr": "pyrus",
     "name": "Griffon"
    },
    {
     "id": "tt_10",
     "attr": "pyrus",
     "name": "Limulus"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_125",
     "name": "Griffon"
    },
    "silver": {
     "id": "ds_207",
     "name": "Tornado Alley"
    },
    "copper": {
     "id": "ds_317",
     "name": "Waist Deep"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_409",
     "name": "Pyrus Time Breaker"
    },
    "blue": {
     "id": "ds_614",
     "name": "Circle Of Fire"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     },
     {
      "id": "ds_424",
      "name": "Level Field"
     }
    ],
    "blue": [
     {
      "id": "ds_620",
      "name": "The Glow"
     },
     {
      "id": "ds_604",
      "name": "Blaze"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "pyrus",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_01",
     "attr": "pyrus",
     "name": "Apollonir"
    },
    {
     "id": "tt_10",
     "attr": "pyrus",
     "name": "Limulus"
    },
    {
     "id": "bb_48",
     "attr": "pyrus",
     "name": "Fear Ripper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_128",
     "name": "Fear Ripper"
    },
    "silver": {
     "id": "ds_216",
     "name": "Volcanic Lake"
    },
    "copper": {
     "id": "ds_309",
     "name": "Electrified"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_401",
     "name": "Pyrus Swap"
    },
    "blue": {
     "id": "ds_616",
     "name": "Brushfire"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_409",
      "name": "Pyrus Time Breaker"
     },
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     }
    ],
    "blue": [
     {
      "id": "ds_614",
      "name": "Circle Of Fire"
     },
     {
      "id": "ds_620",
      "name": "The Glow"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 },
 "mousoulios": {
  "name": "Mousoulios",
  "species": "Neathian",
  "attrs": [
   "aquos"
  ],
  "signature": "Frosch",
  "joins": 3,
  "easy": {
   "attr": "aquos",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_07",
     "attr": "aquos",
     "name": "Frosch"
    },
    {
     "id": "bb_39",
     "attr": "aquos",
     "name": "Juggernoid"
    },
    {
     "id": "bb_58",
     "attr": "aquos",
     "name": "Ravenoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_119",
     "name": "Juggernoid"
    },
    "silver": {
     "id": "ds_225",
     "name": "Spitting Fire"
    },
    "copper": {
     "id": "ds_308",
     "name": "Load Up"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_407",
     "name": "Twin Swap"
    },
    "blue": {
     "id": "ds_604",
     "name": "Blaze"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_408",
      "name": "Counter Swap"
     },
     {
      "id": "ds_415",
      "name": "Twin Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_605",
      "name": "Home Advantage"
     },
     {
      "id": "ds_608",
      "name": "Mega Impact"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "aquos",
   "upgrades": 5,
   "toys": [
    {
     "id": "tt_07",
     "attr": "aquos",
     "name": "Frosch"
    },
    {
     "id": "bb_58",
     "attr": "aquos",
     "name": "Ravenoid"
    },
    {
     "id": "tt_19",
     "attr": "aquos",
     "name": "El Condor"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_133",
     "name": "Ravenoid"
    },
    "silver": {
     "id": "ds_204",
     "name": "Tsunami"
    },
    "copper": {
     "id": "ds_303",
     "name": "Clipped Wings"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_410",
     "name": "Aquos Time Breaker"
    },
    "blue": {
     "id": "ds_621",
     "name": "The Shadow"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     },
     {
      "id": "ds_426",
      "name": "Aquos Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_603",
      "name": "G-Power Bump"
     },
     {
      "id": "ds_611",
      "name": "G-Power Bonus"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "aquos",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_07",
     "attr": "aquos",
     "name": "Frosch"
    },
    {
     "id": "tt_19",
     "attr": "aquos",
     "name": "El Condor"
    },
    {
     "id": "tt_06",
     "attr": "aquos",
     "name": "Fifth Paladin"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_008",
     "name": "Elfin"
    },
    "silver": {
     "id": "ds_208",
     "name": "Whirlpool"
    },
    "copper": {
     "id": "ds_309",
     "name": "Electrified"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_402",
     "name": "Aquos Swap"
    },
    "blue": {
     "id": "ds_607",
     "name": "Summon Wave"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_410",
      "name": "Aquos Time Breaker"
     },
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     }
    ],
    "blue": [
     {
      "id": "ds_621",
      "name": "The Shadow"
     },
     {
      "id": "ds_603",
      "name": "G-Power Bump"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 },
 "demitri": {
  "name": "Demitri",
  "species": "Neathian",
  "attrs": [
   "subterra"
  ],
  "signature": "Clayf",
  "joins": 3,
  "easy": {
   "attr": "subterra",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_03",
     "attr": "subterra",
     "name": "Clayf"
    },
    {
     "id": "bb_41",
     "attr": "subterra",
     "name": "Saurus"
    },
    {
     "id": "tt_11",
     "attr": "subterra",
     "name": "Mantris"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_121",
     "name": "Saurus"
    },
    "silver": {
     "id": "ds_202",
     "name": "Muddy Ground"
    },
    "copper": {
     "id": "ds_303",
     "name": "Clipped Wings"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_407",
     "name": "Twin Swap"
    },
    "blue": {
     "id": "ds_602",
     "name": "G-Power Boost"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_408",
      "name": "Counter Swap"
     },
     {
      "id": "ds_415",
      "name": "Twin Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_612",
      "name": "G-Power Up"
     },
     {
      "id": "ds_601",
      "name": "Bright Light"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "subterra",
   "upgrades": 5,
   "toys": [
    {
     "id": "tt_03",
     "attr": "subterra",
     "name": "Clayf"
    },
    {
     "id": "tt_11",
     "attr": "subterra",
     "name": "Mantris"
    },
    {
     "id": "bb_46",
     "attr": "subterra",
     "name": "Laserman"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_126",
     "name": "Laserman"
    },
    "silver": {
     "id": "ds_208",
     "name": "Whirlpool"
    },
    "copper": {
     "id": "ds_305",
     "name": "Down For The Count"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_411",
     "name": "Subterra Time Breaker"
    },
    "blue": {
     "id": "ds_608",
     "name": "Mega Impact"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     },
     {
      "id": "ds_427",
      "name": "Subterra Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_616",
      "name": "Brushfire"
     },
     {
      "id": "ds_622",
      "name": "The Gust"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "subterra",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_03",
     "attr": "subterra",
     "name": "Clayf"
    },
    {
     "id": "bb_46",
     "attr": "subterra",
     "name": "Laserman"
    },
    {
     "id": "bb_60",
     "attr": "subterra",
     "name": "Warius"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_126",
     "name": "Laserman"
    },
    "silver": {
     "id": "ds_209",
     "name": "Earthen Mound"
    },
    "copper": {
     "id": "ds_309",
     "name": "Electrified"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_403",
     "name": "Subterra Swap"
    },
    "blue": {
     "id": "ds_605",
     "name": "Home Advantage"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_411",
      "name": "Subterra Time Breaker"
     },
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     }
    ],
    "blue": [
     {
      "id": "ds_608",
      "name": "Mega Impact"
     },
     {
      "id": "ds_616",
      "name": "Brushfire"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 },
 "eirene": {
  "name": "Eirene",
  "species": "Neathian",
  "attrs": [
   "haos"
  ],
  "signature": "Lars Lion",
  "joins": 3,
  "easy": {
   "attr": "haos",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_09",
     "attr": "haos",
     "name": "Lars Lion"
    },
    {
     "id": "tt_20",
     "attr": "haos",
     "name": "Goblin Ball"
    },
    {
     "id": "bb_52",
     "attr": "haos",
     "name": "Gargonoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_131",
     "name": "Gargonoid"
    },
    "silver": {
     "id": "ds_223",
     "name": "Nightmare"
    },
    "copper": {
     "id": "ds_305",
     "name": "Down For The Count"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_407",
     "name": "Twin Swap"
    },
    "blue": {
     "id": "ds_606",
     "name": "Power From Darkness"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_408",
      "name": "Counter Swap"
     },
     {
      "id": "ds_415",
      "name": "Twin Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_612",
      "name": "G-Power Up"
     },
     {
      "id": "ds_617",
      "name": "G-Power Increase"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "haos",
   "upgrades": 5,
   "toys": [
    {
     "id": "tt_09",
     "attr": "haos",
     "name": "Lars Lion"
    },
    {
     "id": "bb_52",
     "attr": "haos",
     "name": "Gargonoid"
    },
    {
     "id": "bt_hynoid",
     "attr": "haos",
     "name": "Hynoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_131",
     "name": "Gargonoid"
    },
    "silver": {
     "id": "ds_209",
     "name": "Earthen Mound"
    },
    "copper": {
     "id": "ds_316",
     "name": "Elements"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_412",
     "name": "Haos Time Breaker"
    },
    "blue": {
     "id": "ds_610",
     "name": "Flash"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     },
     {
      "id": "ds_428",
      "name": "Haos Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_601",
      "name": "Bright Light"
     },
     {
      "id": "ds_603",
      "name": "G-Power Bump"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "haos",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_09",
     "attr": "haos",
     "name": "Lars Lion"
    },
    {
     "id": "bt_hynoid",
     "attr": "haos",
     "name": "Hynoid"
    },
    {
     "id": "bt_bee",
     "attr": "haos",
     "name": "Bee Striker"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_104",
     "name": "Blade Tigrerra"
    },
    "silver": {
     "id": "ds_203",
     "name": "Light-Burst"
    },
    "copper": {
     "id": "ds_309",
     "name": "Electrified"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_404",
     "name": "Haos Swap"
    },
    "blue": {
     "id": "ds_620",
     "name": "The Glow"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_412",
      "name": "Haos Time Breaker"
     },
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     }
    ],
    "blue": [
     {
      "id": "ds_610",
      "name": "Flash"
     },
     {
      "id": "ds_601",
      "name": "Bright Light"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 },
 "petronas": {
  "name": "Petronas",
  "species": "Neathian",
  "attrs": [
   "darkus"
  ],
  "signature": "Exedra",
  "joins": 3,
  "easy": {
   "attr": "darkus",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_05",
     "attr": "darkus",
     "name": "Exedra"
    },
    {
     "id": "bb_40",
     "attr": "darkus",
     "name": "Robotallion"
    },
    {
     "id": "tt_18",
     "attr": "darkus",
     "name": "Rattleoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_120",
     "name": "Robotallion"
    },
    "silver": {
     "id": "ds_222",
     "name": "Pit Dweller"
    },
    "copper": {
     "id": "ds_331",
     "name": "Mega Warrior"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_407",
     "name": "Twin Swap"
    },
    "blue": {
     "id": "ds_611",
     "name": "G-Power Bonus"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_408",
      "name": "Counter Swap"
     },
     {
      "id": "ds_415",
      "name": "Twin Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_601",
      "name": "Bright Light"
     },
     {
      "id": "ds_609",
      "name": "Hot Wind"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "darkus",
   "upgrades": 5,
   "toys": [
    {
     "id": "tt_05",
     "attr": "darkus",
     "name": "Exedra"
    },
    {
     "id": "tt_18",
     "attr": "darkus",
     "name": "Rattleoid"
    },
    {
     "id": "bb_61",
     "attr": "darkus",
     "name": "Monarus"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_135",
     "name": "Monarus"
    },
    "silver": {
     "id": "ds_203",
     "name": "Light-Burst"
    },
    "copper": {
     "id": "ds_321",
     "name": "Reflexes"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_413",
     "name": "Darkus Time Breaker"
    },
    "blue": {
     "id": "ds_621",
     "name": "The Shadow"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     },
     {
      "id": "ds_429",
      "name": "Darkus Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_613",
      "name": "Dark Growth"
     },
     {
      "id": "ds_602",
      "name": "G-Power Boost"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "darkus",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_05",
     "attr": "darkus",
     "name": "Exedra"
    },
    {
     "id": "bb_61",
     "attr": "darkus",
     "name": "Monarus"
    },
    {
     "id": "tt_17",
     "attr": "darkus",
     "name": "Wormquake"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_135",
     "name": "Monarus"
    },
    "silver": {
     "id": "ds_214",
     "name": "Haunted Night"
    },
    "copper": {
     "id": "ds_309",
     "name": "Electrified"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_405",
     "name": "Darkus Swap"
    },
    "blue": {
     "id": "ds_606",
     "name": "Power From Darkness"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_413",
      "name": "Darkus Time Breaker"
     },
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     }
    ],
    "blue": [
     {
      "id": "ds_621",
      "name": "The Shadow"
     },
     {
      "id": "ds_613",
      "name": "Dark Growth"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 },
 "eudocia": {
  "name": "Eudocia",
  "species": "Neathian",
  "attrs": [
   "ventus"
  ],
  "signature": "Oberus",
  "joins": 3,
  "easy": {
   "attr": "ventus",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_12",
     "attr": "ventus",
     "name": "Oberus"
    },
    {
     "id": "bb_44",
     "attr": "ventus",
     "name": "Stinglash"
    },
    {
     "id": "bb_43",
     "attr": "ventus",
     "name": "Falconeer"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_123",
     "name": "Falconeer"
    },
    "silver": {
     "id": "ds_232",
     "name": "Blue Sky"
    },
    "copper": {
     "id": "ds_317",
     "name": "Waist Deep"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_407",
     "name": "Twin Swap"
    },
    "blue": {
     "id": "ds_611",
     "name": "G-Power Bonus"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_408",
      "name": "Counter Swap"
     },
     {
      "id": "ds_415",
      "name": "Twin Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_617",
      "name": "G-Power Increase"
     },
     {
      "id": "ds_604",
      "name": "Blaze"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "ventus",
   "upgrades": 5,
   "toys": [
    {
     "id": "tt_12",
     "attr": "ventus",
     "name": "Oberus"
    },
    {
     "id": "bb_43",
     "attr": "ventus",
     "name": "Falconeer"
    },
    {
     "id": "bb_25",
     "attr": "ventus",
     "name": "Reaper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_123",
     "name": "Falconeer"
    },
    "silver": {
     "id": "ds_213",
     "name": "Sand Storm"
    },
    "copper": {
     "id": "ds_308",
     "name": "Load Up"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_414",
     "name": "Ventus Time Breaker"
    },
    "blue": {
     "id": "ds_622",
     "name": "The Gust"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     },
     {
      "id": "ds_430",
      "name": "Ventus Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_609",
      "name": "Hot Wind"
     },
     {
      "id": "ds_603",
      "name": "G-Power Bump"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "ventus",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_12",
     "attr": "ventus",
     "name": "Oberus"
    },
    {
     "id": "bb_25",
     "attr": "ventus",
     "name": "Reaper"
    },
    {
     "id": "tt_10",
     "attr": "ventus",
     "name": "Limulus"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_113",
     "name": "Reaper"
    },
    "silver": {
     "id": "ds_207",
     "name": "Tornado Alley"
    },
    "copper": {
     "id": "ds_312",
     "name": "Heat Haze"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_406",
     "name": "Ventus Swap"
    },
    "blue": {
     "id": "ds_615",
     "name": "Updraft"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_414",
      "name": "Ventus Time Breaker"
     },
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     }
    ],
    "blue": [
     {
      "id": "ds_622",
      "name": "The Gust"
     },
     {
      "id": "ds_609",
      "name": "Hot Wind"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 },
 "ignatios": {
  "name": "Ignatios",
  "species": "Neathian",
  "attrs": [
   "pyrus"
  ],
  "signature": null,
  "joins": 3,
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_42",
     "attr": "pyrus",
     "name": "Serpenoid"
    },
    {
     "id": "bb_56",
     "attr": "pyrus",
     "name": "Manion"
    },
    {
     "id": "bb_45",
     "attr": "pyrus",
     "name": "Griffon"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_122",
     "name": "Serpenoid"
    },
    "silver": {
     "id": "ds_226",
     "name": "Earthen Wave"
    },
    "copper": {
     "id": "ds_310",
     "name": "Bait and Switch"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_425",
     "name": "Pyrus Double Input"
    },
    "blue": {
     "id": "ds_615",
     "name": "Updraft"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_407",
      "name": "Twin Swap"
     },
     {
      "id": "ds_408",
      "name": "Counter Swap"
     }
    ],
    "blue": [
     {
      "id": "ds_602",
      "name": "G-Power Boost"
     },
     {
      "id": "ds_607",
      "name": "Summon Wave"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "pyrus",
   "upgrades": 5,
   "toys": [
    {
     "id": "bb_45",
     "attr": "pyrus",
     "name": "Griffon"
    },
    {
     "id": "bb_50",
     "attr": "pyrus",
     "name": "Terrorclaw"
    },
    {
     "id": "bb_48",
     "attr": "pyrus",
     "name": "Fear Ripper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_125",
     "name": "Griffon"
    },
    "silver": {
     "id": "ds_207",
     "name": "Tornado Alley"
    },
    "copper": {
     "id": "ds_317",
     "name": "Waist Deep"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_409",
     "name": "Pyrus Time Breaker"
    },
    "blue": {
     "id": "ds_614",
     "name": "Circle Of Fire"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     },
     {
      "id": "ds_424",
      "name": "Level Field"
     }
    ],
    "blue": [
     {
      "id": "ds_620",
      "name": "The Glow"
     },
     {
      "id": "ds_604",
      "name": "Blaze"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "pyrus",
   "upgrades": 10,
   "toys": [
    {
     "id": "bb_48",
     "attr": "pyrus",
     "name": "Fear Ripper"
    },
    {
     "id": "bt_hynoid",
     "attr": "pyrus",
     "name": "Hynoid"
    },
    {
     "id": "bb_50",
     "attr": "pyrus",
     "name": "Terrorclaw"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_128",
     "name": "Fear Ripper"
    },
    "silver": {
     "id": "ds_216",
     "name": "Volcanic Lake"
    },
    "copper": {
     "id": "ds_309",
     "name": "Electrified"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_401",
     "name": "Pyrus Swap"
    },
    "blue": {
     "id": "ds_616",
     "name": "Brushfire"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_409",
      "name": "Pyrus Time Breaker"
     },
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     }
    ],
    "blue": [
     {
      "id": "ds_614",
      "name": "Circle Of Fire"
     },
     {
      "id": "ds_620",
      "name": "The Glow"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 },
 "jason": {
  "name": "Jason",
  "species": "Human",
  "attrs": [
   "ventus"
  ],
  "signature": null,
  "joins": 3,
  "easy": {
   "attr": "ventus",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_20",
     "attr": "ventus",
     "name": "Goblin Ball"
    },
    {
     "id": "tt_21",
     "attr": "ventus",
     "name": "Jelldon"
    },
    {
     "id": "bb_52",
     "attr": "ventus",
     "name": "Gargonoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_131",
     "name": "Gargonoid"
    },
    "silver": {
     "id": "ds_232",
     "name": "Blue Sky"
    },
    "copper": {
     "id": "ds_317",
     "name": "Waist Deep"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_407",
     "name": "Twin Swap"
    },
    "blue": {
     "id": "ds_611",
     "name": "G-Power Bonus"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_408",
      "name": "Counter Swap"
     },
     {
      "id": "ds_415",
      "name": "Twin Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_617",
      "name": "G-Power Increase"
     },
     {
      "id": "ds_604",
      "name": "Blaze"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "ventus",
   "upgrades": 5,
   "toys": [
    {
     "id": "bb_52",
     "attr": "ventus",
     "name": "Gargonoid"
    },
    {
     "id": "tt_16",
     "attr": "ventus",
     "name": "Tuskor"
    },
    {
     "id": "tt_17",
     "attr": "ventus",
     "name": "Wormquake"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_131",
     "name": "Gargonoid"
    },
    "silver": {
     "id": "ds_213",
     "name": "Sand Storm"
    },
    "copper": {
     "id": "ds_308",
     "name": "Load Up"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_414",
     "name": "Ventus Time Breaker"
    },
    "blue": {
     "id": "ds_622",
     "name": "The Gust"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     },
     {
      "id": "ds_430",
      "name": "Ventus Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_609",
      "name": "Hot Wind"
     },
     {
      "id": "ds_603",
      "name": "G-Power Bump"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "ventus",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_17",
     "attr": "ventus",
     "name": "Wormquake"
    },
    {
     "id": "bb_25",
     "attr": "ventus",
     "name": "Reaper"
    },
    {
     "id": "tt_16",
     "attr": "ventus",
     "name": "Tuskor"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_113",
     "name": "Reaper"
    },
    "silver": {
     "id": "ds_207",
     "name": "Tornado Alley"
    },
    "copper": {
     "id": "ds_312",
     "name": "Heat Haze"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_406",
     "name": "Ventus Swap"
    },
    "blue": {
     "id": "ds_615",
     "name": "Updraft"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_414",
      "name": "Ventus Time Breaker"
     },
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     }
    ],
    "blue": [
     {
      "id": "ds_622",
      "name": "The Gust"
     },
     {
      "id": "ds_609",
      "name": "Hot Wind"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 },
 "evelyn": {
  "name": "Raven",
  "species": "Vestal",
  "attrs": [
   "darkus"
  ],
  "signature": null,
  "joins": 4,
  "easy": {
   "attr": "darkus",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_21",
     "attr": "darkus",
     "name": "Jelldon"
    },
    {
     "id": "bb_44",
     "attr": "darkus",
     "name": "Stinglash"
    },
    {
     "id": "tt_16",
     "attr": "darkus",
     "name": "Tuskor"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_124",
     "name": "Stinglash"
    },
    "silver": {
     "id": "ds_222",
     "name": "Pit Dweller"
    },
    "copper": {
     "id": "ds_331",
     "name": "Mega Warrior"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_407",
     "name": "Twin Swap"
    },
    "blue": {
     "id": "ds_611",
     "name": "G-Power Bonus"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_408",
      "name": "Counter Swap"
     },
     {
      "id": "ds_415",
      "name": "Twin Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_601",
      "name": "Bright Light"
     },
     {
      "id": "ds_609",
      "name": "Hot Wind"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "darkus",
   "upgrades": 5,
   "toys": [
    {
     "id": "tt_16",
     "attr": "darkus",
     "name": "Tuskor"
    },
    {
     "id": "bb_43",
     "attr": "darkus",
     "name": "Falconeer"
    },
    {
     "id": "bt_hynoid",
     "attr": "darkus",
     "name": "Hynoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_123",
     "name": "Falconeer"
    },
    "silver": {
     "id": "ds_203",
     "name": "Light-Burst"
    },
    "copper": {
     "id": "ds_321",
     "name": "Reflexes"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_413",
     "name": "Darkus Time Breaker"
    },
    "blue": {
     "id": "ds_621",
     "name": "The Shadow"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     },
     {
      "id": "ds_429",
      "name": "Darkus Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_613",
      "name": "Dark Growth"
     },
     {
      "id": "ds_602",
      "name": "G-Power Boost"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "darkus",
   "upgrades": 10,
   "toys": [
    {
     "id": "bt_hynoid",
     "attr": "darkus",
     "name": "Hynoid"
    },
    {
     "id": "bt_bee",
     "attr": "darkus",
     "name": "Bee Striker"
    },
    {
     "id": "bb_43",
     "attr": "darkus",
     "name": "Falconeer"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_123",
     "name": "Falconeer"
    },
    "silver": {
     "id": "ds_214",
     "name": "Haunted Night"
    },
    "copper": {
     "id": "ds_309",
     "name": "Electrified"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_405",
     "name": "Darkus Swap"
    },
    "blue": {
     "id": "ds_606",
     "name": "Power From Darkness"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_413",
      "name": "Darkus Time Breaker"
     },
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     }
    ],
    "blue": [
     {
      "id": "ds_621",
      "name": "The Shadow"
     },
     {
      "id": "ds_613",
      "name": "Dark Growth"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 },
 "onyx": {
  "name": "Onyx",
  "species": "Vestal",
  "attrs": [
   "subterra"
  ],
  "signature": "Dryoid",
  "joins": 4,
  "easy": {
   "attr": "subterra",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_23",
     "attr": "subterra",
     "name": "Dryoid"
    },
    {
     "id": "tt_21",
     "attr": "subterra",
     "name": "Jelldon"
    },
    {
     "id": "tt_16",
     "attr": "subterra",
     "name": "Tuskor"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_108",
     "name": "Hammer Gorem"
    },
    "silver": {
     "id": "ds_202",
     "name": "Muddy Ground"
    },
    "copper": {
     "id": "ds_303",
     "name": "Clipped Wings"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_407",
     "name": "Twin Swap"
    },
    "blue": {
     "id": "ds_602",
     "name": "G-Power Boost"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_408",
      "name": "Counter Swap"
     },
     {
      "id": "ds_415",
      "name": "Twin Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_612",
      "name": "G-Power Up"
     },
     {
      "id": "ds_601",
      "name": "Bright Light"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "subterra",
   "upgrades": 5,
   "toys": [
    {
     "id": "tt_23",
     "attr": "subterra",
     "name": "Dryoid"
    },
    {
     "id": "tt_16",
     "attr": "subterra",
     "name": "Tuskor"
    },
    {
     "id": "bb_48",
     "attr": "subterra",
     "name": "Fear Ripper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_128",
     "name": "Fear Ripper"
    },
    "silver": {
     "id": "ds_208",
     "name": "Whirlpool"
    },
    "copper": {
     "id": "ds_305",
     "name": "Down For The Count"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_411",
     "name": "Subterra Time Breaker"
    },
    "blue": {
     "id": "ds_608",
     "name": "Mega Impact"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     },
     {
      "id": "ds_427",
      "name": "Subterra Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_616",
      "name": "Brushfire"
     },
     {
      "id": "ds_622",
      "name": "The Gust"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "subterra",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_23",
     "attr": "subterra",
     "name": "Dryoid"
    },
    {
     "id": "bb_48",
     "attr": "subterra",
     "name": "Fear Ripper"
    },
    {
     "id": "bt_hynoid",
     "attr": "subterra",
     "name": "Hynoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_128",
     "name": "Fear Ripper"
    },
    "silver": {
     "id": "ds_209",
     "name": "Earthen Mound"
    },
    "copper": {
     "id": "ds_309",
     "name": "Electrified"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_403",
     "name": "Subterra Swap"
    },
    "blue": {
     "id": "ds_605",
     "name": "Home Advantage"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_411",
      "name": "Subterra Time Breaker"
     },
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     }
    ],
    "blue": [
     {
      "id": "ds_608",
      "name": "Mega Impact"
     },
     {
      "id": "ds_616",
      "name": "Brushfire"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 },
 "kala": {
  "name": "Kala",
  "species": "Human",
  "attrs": [
   "aquos"
  ],
  "signature": null,
  "joins": 4,
  "easy": {
   "attr": "aquos",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_39",
     "attr": "aquos",
     "name": "Juggernoid"
    },
    {
     "id": "bb_42",
     "attr": "aquos",
     "name": "Serpenoid"
    },
    {
     "id": "bb_58",
     "attr": "aquos",
     "name": "Ravenoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_119",
     "name": "Juggernoid"
    },
    "silver": {
     "id": "ds_225",
     "name": "Spitting Fire"
    },
    "copper": {
     "id": "ds_308",
     "name": "Load Up"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_407",
     "name": "Twin Swap"
    },
    "blue": {
     "id": "ds_604",
     "name": "Blaze"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_408",
      "name": "Counter Swap"
     },
     {
      "id": "ds_415",
      "name": "Twin Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_605",
      "name": "Home Advantage"
     },
     {
      "id": "ds_608",
      "name": "Mega Impact"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "aquos",
   "upgrades": 5,
   "toys": [
    {
     "id": "bb_58",
     "attr": "aquos",
     "name": "Ravenoid"
    },
    {
     "id": "bb_45",
     "attr": "aquos",
     "name": "Griffon"
    },
    {
     "id": "tt_06",
     "attr": "aquos",
     "name": "Fifth Paladin"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_125",
     "name": "Griffon"
    },
    "silver": {
     "id": "ds_204",
     "name": "Tsunami"
    },
    "copper": {
     "id": "ds_303",
     "name": "Clipped Wings"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_410",
     "name": "Aquos Time Breaker"
    },
    "blue": {
     "id": "ds_621",
     "name": "The Shadow"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     },
     {
      "id": "ds_426",
      "name": "Aquos Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_603",
      "name": "G-Power Bump"
     },
     {
      "id": "ds_611",
      "name": "G-Power Bonus"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "aquos",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_06",
     "attr": "aquos",
     "name": "Fifth Paladin"
    },
    {
     "id": "bb_46",
     "attr": "aquos",
     "name": "Laserman"
    },
    {
     "id": "bb_45",
     "attr": "aquos",
     "name": "Griffon"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_125",
     "name": "Griffon"
    },
    "silver": {
     "id": "ds_208",
     "name": "Whirlpool"
    },
    "copper": {
     "id": "ds_309",
     "name": "Electrified"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_402",
     "name": "Aquos Swap"
    },
    "blue": {
     "id": "ds_607",
     "name": "Summon Wave"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_410",
      "name": "Aquos Time Breaker"
     },
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     }
    ],
    "blue": [
     {
      "id": "ds_621",
      "name": "The Shadow"
     },
     {
      "id": "ds_603",
      "name": "G-Power Bump"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 },
 "olivia": {
  "name": "Olivia",
  "species": "Human",
  "attrs": [
   "subterra"
  ],
  "signature": null,
  "joins": 4,
  "easy": {
   "attr": "subterra",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_40",
     "attr": "subterra",
     "name": "Robotallion"
    },
    {
     "id": "tt_20",
     "attr": "subterra",
     "name": "Goblin Ball"
    },
    {
     "id": "tt_18",
     "attr": "subterra",
     "name": "Rattleoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_120",
     "name": "Robotallion"
    },
    "silver": {
     "id": "ds_202",
     "name": "Muddy Ground"
    },
    "copper": {
     "id": "ds_303",
     "name": "Clipped Wings"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_407",
     "name": "Twin Swap"
    },
    "blue": {
     "id": "ds_602",
     "name": "G-Power Boost"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_408",
      "name": "Counter Swap"
     },
     {
      "id": "ds_415",
      "name": "Twin Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_612",
      "name": "G-Power Up"
     },
     {
      "id": "ds_601",
      "name": "Bright Light"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "subterra",
   "upgrades": 5,
   "toys": [
    {
     "id": "tt_18",
     "attr": "subterra",
     "name": "Rattleoid"
    },
    {
     "id": "bb_52",
     "attr": "subterra",
     "name": "Gargonoid"
    },
    {
     "id": "tt_10",
     "attr": "subterra",
     "name": "Limulus"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_131",
     "name": "Gargonoid"
    },
    "silver": {
     "id": "ds_208",
     "name": "Whirlpool"
    },
    "copper": {
     "id": "ds_305",
     "name": "Down For The Count"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_411",
     "name": "Subterra Time Breaker"
    },
    "blue": {
     "id": "ds_608",
     "name": "Mega Impact"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     },
     {
      "id": "ds_427",
      "name": "Subterra Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_616",
      "name": "Brushfire"
     },
     {
      "id": "ds_622",
      "name": "The Gust"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "subterra",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_10",
     "attr": "subterra",
     "name": "Limulus"
    },
    {
     "id": "bb_48",
     "attr": "subterra",
     "name": "Fear Ripper"
    },
    {
     "id": "bb_52",
     "attr": "subterra",
     "name": "Gargonoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_128",
     "name": "Fear Ripper"
    },
    "silver": {
     "id": "ds_209",
     "name": "Earthen Mound"
    },
    "copper": {
     "id": "ds_309",
     "name": "Electrified"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_403",
     "name": "Subterra Swap"
    },
    "blue": {
     "id": "ds_605",
     "name": "Home Advantage"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_411",
      "name": "Subterra Time Breaker"
     },
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     }
    ],
    "blue": [
     {
      "id": "ds_608",
      "name": "Mega Impact"
     },
     {
      "id": "ds_616",
      "name": "Brushfire"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 },
 "raymond": {
  "name": "Raymond",
  "species": "Human",
  "attrs": [
   "subterra",
   "haos",
   "aquos"
  ],
  "signature": null,
  "joins": 0,
  "easy": {
   "attr": "subterra",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_56",
     "attr": "subterra",
     "name": "Manion"
    },
    {
     "id": "bb_41",
     "attr": "haos",
     "name": "Saurus"
    },
    {
     "id": "bb_50",
     "attr": "aquos",
     "name": "Terrorclaw"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_121",
     "name": "Saurus"
    },
    "silver": {
     "id": "ds_202",
     "name": "Muddy Ground"
    },
    "copper": {
     "id": "ds_303",
     "name": "Clipped Wings"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_411",
     "name": "Subterra Time Breaker"
    },
    "blue": {
     "id": "ds_607",
     "name": "Summon Wave"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_412",
      "name": "Haos Time Breaker"
     },
     {
      "id": "ds_418",
      "name": "Spin Battle Redo"
     }
    ],
    "blue": [
     {
      "id": "ds_601",
      "name": "Bright Light"
     },
     {
      "id": "ds_603",
      "name": "G-Power Bump"
     }
    ],
    "green": [
     {
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_507",
      "name": "Prevention"
     }
    ]
   }
  },
  "normal": {
   "attr": "subterra",
   "upgrades": 5,
   "toys": [
    {
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
    },
    {
     "id": "tt_11",
     "attr": "haos",
     "name": "Mantris"
    },
    {
     "id": "bb_61",
     "attr": "aquos",
     "name": "Monarus"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_130",
     "name": "Terrorclaw"
    },
    "silver": {
     "id": "ds_208",
     "name": "Whirlpool"
    },
    "copper": {
     "id": "ds_305",
     "name": "Down For The Count"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_403",
     "name": "Subterra Swap"
    },
    "blue": {
     "id": "ds_608",
     "name": "Mega Impact"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_404",
      "name": "Haos Swap"
     },
     {
      "id": "ds_410",
      "name": "Aquos Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_605",
      "name": "Home Advantage"
     },
     {
      "id": "ds_610",
      "name": "Flash"
     }
    ],
    "green": [
     {
      "id": "ds_503",
      "name": "Out Of Time"
     },
     {
      "id": "ds_504",
      "name": "Double Input Cancel"
     }
    ]
   }
  },
  "hard": {
   "attr": "subterra",
   "upgrades": 10,
   "toys": [
    {
     "id": "bb_61",
     "attr": "subterra",
     "name": "Monarus"
    },
    {
     "id": "tt_17",
     "attr": "haos",
     "name": "Wormquake"
    },
    {
     "id": "tt_11",
     "attr": "aquos",
     "name": "Mantris"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_135",
     "name": "Monarus"
    },
    "silver": {
     "id": "ds_209",
     "name": "Earthen Mound"
    },
    "copper": {
     "id": "ds_309",
     "name": "Electrified"
    }
   },
   "abilities": {
    "red": {
     "id": "ds_402",
     "name": "Aquos Swap"
    },
    "blue": {
     "id": "ds_620",
     "name": "The Glow"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_403",
      "name": "Subterra Swap"
     },
     {
      "id": "ds_404",
      "name": "Haos Swap"
     }
    ],
    "blue": [
     {
      "id": "ds_608",
      "name": "Mega Impact"
     },
     {
      "id": "ds_605",
      "name": "Home Advantage"
     }
    ],
    "green": [
     {
      "id": "ds_502",
      "name": "No Trading"
     },
     {
      "id": "ds_503",
      "name": "Out Of Time"
     }
    ]
   }
  }
 }
};
// the season each joins in (0 = never: Raymond)
export const JOINS = {"brodny":3,"kasimir":3,"pavel":3,"tibor":3,"zarek":3,"zorro":3,"vasek":3,"vesna":3,"arcadius":3,"mousoulios":3,"demitri":3,"eirene":3,"petronas":3,"eudocia":3,"ignatios":3,"jason":3,"evelyn":4,"onyx":4,"kala":4,"olivia":4,"raymond":0};
export const SEASON3_NEW = Object.keys(JOINS).filter(id => JOINS[id] === 3);
export const SEASON4_NEW = Object.keys(JOINS).filter(id => JOINS[id] === 4);
Object.assign(INTERSPACE, NEW_BRAWLERS);
Object.assign(STORY_START, {"brodny":"normal","kasimir":"normal","pavel":"normal","tibor":"normal","zarek":"normal","zorro":"normal","vasek":"normal","vesna":"normal","arcadius":"normal","mousoulios":"normal","demitri":"normal","eirene":"normal","petronas":"normal","eudocia":"normal","ignatios":"normal","jason":"easy","evelyn":"easy","onyx":"normal","kala":"easy","olivia":"easy","raymond":"easy"});
