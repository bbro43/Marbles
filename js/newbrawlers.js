// The 21 brawlers from Billy's Sim sheet, joining in Seasons 3 and 4. Built by tools/newbrawlers.mjs: edit the table there.
// Importing this file adds them to INTERSPACE and STORY_START (js/aiteams.js), so everything that looks brawlers up finds them.
import { INTERSPACE, STORY_START } from './aiteams.js';
export const NEW_BRAWLERS = {
 "brodny": {
  "name": "Brodny",
  "species": "Gundalian",
  "attrs": [
   "subterra"
  ],
  "signature": "Mantris",
  "joins": 3,
  "easy": {
   "attr": "subterra",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_11",
     "attr": "subterra",
     "name": "Mantris"
    },
    {
     "id": "dc_sp06_22",
     "attr": "subterra",
     "name": "Leefram"
    },
    {
     "id": "bt_bee",
     "attr": "subterra",
     "name": "Bee Striker"
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
     "id": "tt_11",
     "attr": "subterra",
     "name": "Mantris"
    },
    {
     "id": "dc_sp06_22",
     "attr": "subterra",
     "name": "Leefram"
    },
    {
     "id": "bt_bee",
     "attr": "subterra",
     "name": "Bee Striker"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_108",
     "name": "Hammer Gorem"
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
     "id": "tt_11",
     "attr": "subterra",
     "name": "Mantris"
    },
    {
     "id": "dc_sp06_22",
     "attr": "subterra",
     "name": "Leefram"
    },
    {
     "id": "bt_bee",
     "attr": "subterra",
     "name": "Bee Striker"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_108",
     "name": "Hammer Gorem"
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
 "kasimir": {
  "name": "Kasimir",
  "species": "Gundalian",
  "attrs": [
   "haos"
  ],
  "signature": "Oberus",
  "joins": 3,
  "easy": {
   "attr": "haos",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_12",
     "attr": "haos",
     "name": "Oberus"
    },
    {
     "id": "dc_sp06_24",
     "attr": "haos",
     "name": "Spindle"
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
     "id": "tt_12",
     "attr": "haos",
     "name": "Oberus"
    },
    {
     "id": "dc_sp06_24",
     "attr": "haos",
     "name": "Spindle"
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
     "id": "tt_12",
     "attr": "haos",
     "name": "Oberus"
    },
    {
     "id": "dc_sp06_24",
     "attr": "haos",
     "name": "Spindle"
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
 "pavel": {
  "name": "Pavel",
  "species": "Gundalian",
  "attrs": [
   "ventus"
  ],
  "signature": "El Condor",
  "joins": 3,
  "easy": {
   "attr": "ventus",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_19",
     "attr": "ventus",
     "name": "El Condor"
    },
    {
     "id": "bb_43",
     "attr": "ventus",
     "name": "Falconeer"
    },
    {
     "id": "bb_45",
     "attr": "ventus",
     "name": "Griffon"
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
     "id": "tt_19",
     "attr": "ventus",
     "name": "El Condor"
    },
    {
     "id": "bb_43",
     "attr": "ventus",
     "name": "Falconeer"
    },
    {
     "id": "bb_45",
     "attr": "ventus",
     "name": "Griffon"
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
     "id": "tt_19",
     "attr": "ventus",
     "name": "El Condor"
    },
    {
     "id": "bb_43",
     "attr": "ventus",
     "name": "Falconeer"
    },
    {
     "id": "bb_45",
     "attr": "ventus",
     "name": "Griffon"
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
   "pyrus",
   "ventus",
   "darkus"
  ],
  "signature": "Wormquake",
  "joins": 3,
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_17",
     "attr": "pyrus",
     "name": "Wormquake"
    },
    {
     "id": "dc_sp06_23",
     "attr": "ventus",
     "name": "Scraper"
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
     "id": "ds_413",
     "name": "Darkus Time Breaker"
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
      "id": "ds_616",
      "name": "Brushfire"
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
   },
   "trap": {
    "id": "dc_spt02",
    "name": "Tripod Epsilon",
    "color": "pyrus",
    "attrs": [
     "pyrus",
     "aquos",
     "haos",
     "subterra"
    ]
   }
  },
  "normal": {
   "attr": "pyrus",
   "upgrades": 5,
   "toys": [
    {
     "id": "tt_17",
     "attr": "pyrus",
     "name": "Wormquake"
    },
    {
     "id": "dc_sp06_23",
     "attr": "ventus",
     "name": "Scraper"
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
     "id": "ds_609",
     "name": "Hot Wind"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
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
    "color": "pyrus",
    "attrs": [
     "pyrus",
     "aquos",
     "haos",
     "subterra"
    ]
   }
  },
  "hard": {
   "attr": "pyrus",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_17",
     "attr": "pyrus",
     "name": "Wormquake"
    },
    {
     "id": "dc_sp06_23",
     "attr": "ventus",
     "name": "Scraper"
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
      "id": "ds_405",
      "name": "Darkus Swap"
     },
     {
      "id": "ds_406",
      "name": "Ventus Swap"
     }
    ],
    "blue": [
     {
      "id": "ds_609",
      "name": "Hot Wind"
     },
     {
      "id": "ds_622",
      "name": "The Gust"
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
    "color": "pyrus",
    "attrs": [
     "pyrus",
     "aquos",
     "haos",
     "subterra"
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
     "id": "bb_60",
     "attr": "haos",
     "name": "Warius"
    },
    {
     "id": "bb_61",
     "attr": "haos",
     "name": "Monarus"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_135",
     "name": "Monarus"
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
     "id": "bb_60",
     "attr": "haos",
     "name": "Warius"
    },
    {
     "id": "bb_61",
     "attr": "haos",
     "name": "Monarus"
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
     "id": "bb_60",
     "attr": "haos",
     "name": "Warius"
    },
    {
     "id": "bb_61",
     "attr": "haos",
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
  "signature": "Jelldon",
  "joins": 3,
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_21",
     "attr": "pyrus",
     "name": "Jelldon"
    },
    {
     "id": "bb_52",
     "attr": "ventus",
     "name": "Gargonoid"
    },
    {
     "id": "dc_sp06_25",
     "attr": "pyrus",
     "name": "Klawgor"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_131",
     "name": "Gargonoid"
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
     "id": "tt_21",
     "attr": "pyrus",
     "name": "Jelldon"
    },
    {
     "id": "bb_52",
     "attr": "ventus",
     "name": "Gargonoid"
    },
    {
     "id": "dc_sp06_25",
     "attr": "pyrus",
     "name": "Klawgor"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_131",
     "name": "Gargonoid"
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
     "id": "tt_21",
     "attr": "pyrus",
     "name": "Jelldon"
    },
    {
     "id": "bb_52",
     "attr": "ventus",
     "name": "Gargonoid"
    },
    {
     "id": "dc_sp06_25",
     "attr": "pyrus",
     "name": "Klawgor"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_131",
     "name": "Gargonoid"
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
 "zarek": {
  "name": "Zarek",
  "species": "Gundalian",
  "attrs": [
   "aquos",
   "subterra"
  ],
  "signature": "Limulus",
  "joins": 3,
  "easy": {
   "attr": "aquos",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_10",
     "attr": "aquos",
     "name": "Limulus"
    },
    {
     "id": "bb_46",
     "attr": "subterra",
     "name": "Laserman"
    },
    {
     "id": "bb_48",
     "attr": "aquos",
     "name": "Fear Ripper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_128",
     "name": "Fear Ripper"
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
     "id": "ds_625",
     "name": "Subterra and Aquos Combo"
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
      "id": "ds_427",
      "name": "Subterra Double Input"
     }
    ],
    "blue": [
     {
      "id": "ds_626",
      "name": "Pyrus and Subterra Combo"
     },
     {
      "id": "ds_627",
      "name": "Subterra and Haos Combo"
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
     "id": "tt_10",
     "attr": "aquos",
     "name": "Limulus"
    },
    {
     "id": "bb_46",
     "attr": "subterra",
     "name": "Laserman"
    },
    {
     "id": "bb_48",
     "attr": "aquos",
     "name": "Fear Ripper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_128",
     "name": "Fear Ripper"
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
     "id": "ds_403",
     "name": "Subterra Swap"
    },
    "blue": {
     "id": "ds_607",
     "name": "Summon Wave"
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
      "id": "ds_411",
      "name": "Subterra Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_608",
      "name": "Mega Impact"
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
   "attr": "aquos",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_10",
     "attr": "aquos",
     "name": "Limulus"
    },
    {
     "id": "bb_46",
     "attr": "subterra",
     "name": "Laserman"
    },
    {
     "id": "bb_48",
     "attr": "aquos",
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
      "id": "ds_403",
      "name": "Subterra Swap"
     },
     {
      "id": "ds_410",
      "name": "Aquos Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_607",
      "name": "Summon Wave"
     },
     {
      "id": "ds_608",
      "name": "Mega Impact"
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
     "id": "bb_41",
     "attr": "pyrus",
     "name": "Saurus"
    },
    {
     "id": "dc_sp06_20",
     "attr": "pyrus",
     "name": "Fencer"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_121",
     "name": "Saurus"
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
     "id": "bb_41",
     "attr": "pyrus",
     "name": "Saurus"
    },
    {
     "id": "dc_sp06_20",
     "attr": "pyrus",
     "name": "Fencer"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_121",
     "name": "Saurus"
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
     "id": "bb_41",
     "attr": "pyrus",
     "name": "Saurus"
    },
    {
     "id": "dc_sp06_20",
     "attr": "pyrus",
     "name": "Fencer"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_121",
     "name": "Saurus"
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
 "arcadius": {
  "name": "Arcadius",
  "species": "Neathian",
  "attrs": [
   "pyrus"
  ],
  "signature": "Exedra",
  "joins": 3,
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_05",
     "attr": "pyrus",
     "name": "Exedra"
    },
    {
     "id": "tt_16",
     "attr": "pyrus",
     "name": "Tuskor"
    },
    {
     "id": "bb_42",
     "attr": "pyrus",
     "name": "Serpenoid"
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
     "id": "tt_05",
     "attr": "pyrus",
     "name": "Exedra"
    },
    {
     "id": "tt_16",
     "attr": "pyrus",
     "name": "Tuskor"
    },
    {
     "id": "bb_42",
     "attr": "pyrus",
     "name": "Serpenoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_122",
     "name": "Serpenoid"
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
     "id": "tt_05",
     "attr": "pyrus",
     "name": "Exedra"
    },
    {
     "id": "tt_16",
     "attr": "pyrus",
     "name": "Tuskor"
    },
    {
     "id": "bb_42",
     "attr": "pyrus",
     "name": "Serpenoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_122",
     "name": "Serpenoid"
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
 "demitri": {
  "name": "Demitri",
  "species": "Neathian",
  "attrs": [
   "subterra"
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
     "id": "bb_40",
     "attr": "subterra",
     "name": "Robotallion"
    },
    {
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
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
     "id": "tt_15",
     "attr": "subterra",
     "name": "Tricloid"
    },
    {
     "id": "bb_40",
     "attr": "subterra",
     "name": "Robotallion"
    },
    {
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_120",
     "name": "Robotallion"
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
     "id": "tt_15",
     "attr": "subterra",
     "name": "Tricloid"
    },
    {
     "id": "bb_40",
     "attr": "subterra",
     "name": "Robotallion"
    },
    {
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_120",
     "name": "Robotallion"
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
 "eudocia": {
  "name": "Eudocia",
  "species": "Neathian",
  "attrs": [
   "ventus"
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
     "id": "bb_44",
     "attr": "ventus",
     "name": "Stinglash"
    },
    {
     "id": "bt_hynoid",
     "attr": "ventus",
     "name": "Hynoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_124",
     "name": "Stinglash"
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
     "id": "tt_08",
     "attr": "ventus",
     "name": "Hairadee"
    },
    {
     "id": "bb_44",
     "attr": "ventus",
     "name": "Stinglash"
    },
    {
     "id": "bt_hynoid",
     "attr": "ventus",
     "name": "Hynoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_124",
     "name": "Stinglash"
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
     "id": "tt_08",
     "attr": "ventus",
     "name": "Hairadee"
    },
    {
     "id": "bb_44",
     "attr": "ventus",
     "name": "Stinglash"
    },
    {
     "id": "bt_hynoid",
     "attr": "ventus",
     "name": "Hynoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_124",
     "name": "Stinglash"
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
     "id": "dc_sp06_21",
     "attr": "pyrus",
     "name": "Foxbat"
    },
    {
     "id": "tt_20",
     "attr": "pyrus",
     "name": "Goblin Ball"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_102",
     "name": "Delta Dragonoid II"
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
     "id": "tt_04",
     "attr": "pyrus",
     "name": "Druman"
    },
    {
     "id": "dc_sp06_21",
     "attr": "pyrus",
     "name": "Foxbat"
    },
    {
     "id": "tt_20",
     "attr": "pyrus",
     "name": "Goblin Ball"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_102",
     "name": "Delta Dragonoid II"
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
     "id": "tt_04",
     "attr": "pyrus",
     "name": "Druman"
    },
    {
     "id": "dc_sp06_21",
     "attr": "pyrus",
     "name": "Foxbat"
    },
    {
     "id": "tt_20",
     "attr": "pyrus",
     "name": "Goblin Ball"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_102",
     "name": "Delta Dragonoid II"
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
     "id": "bb_56",
     "attr": "aquos",
     "name": "Manion"
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
     "id": "tt_14",
     "attr": "aquos",
     "name": "Tayghen"
    },
    {
     "id": "bb_56",
     "attr": "aquos",
     "name": "Manion"
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
     "id": "tt_14",
     "attr": "aquos",
     "name": "Tayghen"
    },
    {
     "id": "bb_56",
     "attr": "aquos",
     "name": "Manion"
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
 "petronas": {
  "name": "Petronas",
  "species": "Neathian",
  "attrs": [
   "darkus"
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
     "id": "bb_58",
     "attr": "darkus",
     "name": "Ravenoid"
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
     "id": "tt_02",
     "attr": "darkus",
     "name": "Centorrior"
    },
    {
     "id": "bb_58",
     "attr": "darkus",
     "name": "Ravenoid"
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
     "id": "tt_02",
     "attr": "darkus",
     "name": "Centorrior"
    },
    {
     "id": "bb_58",
     "attr": "darkus",
     "name": "Ravenoid"
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
 "sophia": {
  "name": "Sophia",
  "species": "Neathian",
  "attrs": [
   "haos"
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
     "id": "bb_60",
     "attr": "haos",
     "name": "Warius"
    },
    {
     "id": "bb_61",
     "attr": "haos",
     "name": "Monarus"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_135",
     "name": "Monarus"
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
     "id": "tt_13",
     "attr": "haos",
     "name": "Rabeeder"
    },
    {
     "id": "bb_60",
     "attr": "haos",
     "name": "Warius"
    },
    {
     "id": "bb_61",
     "attr": "haos",
     "name": "Monarus"
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
     "id": "tt_13",
     "attr": "haos",
     "name": "Rabeeder"
    },
    {
     "id": "bb_60",
     "attr": "haos",
     "name": "Warius"
    },
    {
     "id": "bb_61",
     "attr": "haos",
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
 "jason": {
  "name": "Jason",
  "species": "Human",
  "attrs": [
   "ventus"
  ],
  "signature": "Frosch",
  "joins": 3,
  "easy": {
   "attr": "ventus",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_07",
     "attr": "ventus",
     "name": "Frosch"
    },
    {
     "id": "dc_sp06_22",
     "attr": "ventus",
     "name": "Leefram"
    },
    {
     "id": "bt_bee",
     "attr": "ventus",
     "name": "Bee Striker"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_110",
     "name": "Storm Skyress"
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
     "id": "tt_07",
     "attr": "ventus",
     "name": "Frosch"
    },
    {
     "id": "dc_sp06_22",
     "attr": "ventus",
     "name": "Leefram"
    },
    {
     "id": "bt_bee",
     "attr": "ventus",
     "name": "Bee Striker"
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
     "id": "tt_07",
     "attr": "ventus",
     "name": "Frosch"
    },
    {
     "id": "dc_sp06_22",
     "attr": "ventus",
     "name": "Leefram"
    },
    {
     "id": "bt_bee",
     "attr": "ventus",
     "name": "Bee Striker"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_110",
     "name": "Storm Skyress"
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
  "name": "Evelyn",
  "species": "Vestal",
  "attrs": [
   "darkus"
  ],
  "signature": "Dryoid",
  "joins": 4,
  "easy": {
   "attr": "darkus",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_23",
     "attr": "darkus",
     "name": "Dryoid"
    },
    {
     "id": "dc_sp06_24",
     "attr": "darkus",
     "name": "Spindle"
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
     "id": "tt_23",
     "attr": "darkus",
     "name": "Dryoid"
    },
    {
     "id": "dc_sp06_24",
     "attr": "darkus",
     "name": "Spindle"
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
     "id": "tt_23",
     "attr": "darkus",
     "name": "Dryoid"
    },
    {
     "id": "dc_sp06_24",
     "attr": "darkus",
     "name": "Spindle"
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
 "nina": {
  "name": "Nina",
  "species": "Vestal",
  "attrs": [
   "darkus"
  ],
  "signature": "Rattleoid",
  "joins": 4,
  "easy": {
   "attr": "darkus",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_18",
     "attr": "darkus",
     "name": "Rattleoid"
    },
    {
     "id": "dc_sp06_20",
     "attr": "darkus",
     "name": "Fencer"
    },
    {
     "id": "dc_sp06_23",
     "attr": "darkus",
     "name": "Scraper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_139",
     "name": "Battle Ax Vladitor"
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
     "id": "tt_18",
     "attr": "darkus",
     "name": "Rattleoid"
    },
    {
     "id": "dc_sp06_20",
     "attr": "darkus",
     "name": "Fencer"
    },
    {
     "id": "dc_sp06_23",
     "attr": "darkus",
     "name": "Scraper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_139",
     "name": "Battle Ax Vladitor"
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
     "id": "tt_18",
     "attr": "darkus",
     "name": "Rattleoid"
    },
    {
     "id": "dc_sp06_20",
     "attr": "darkus",
     "name": "Fencer"
    },
    {
     "id": "dc_sp06_23",
     "attr": "darkus",
     "name": "Scraper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_139",
     "name": "Battle Ax Vladitor"
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
 "kala": {
  "name": "Kala",
  "species": "Human",
  "attrs": [
   "aquos"
  ],
  "signature": "Fifth Paladin",
  "joins": 4,
  "easy": {
   "attr": "aquos",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_06",
     "attr": "aquos",
     "name": "Fifth Paladin"
    },
    {
     "id": "tt_16",
     "attr": "aquos",
     "name": "Tuskor"
    },
    {
     "id": "bb_42",
     "attr": "aquos",
     "name": "Serpenoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_122",
     "name": "Serpenoid"
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
     "id": "tt_06",
     "attr": "aquos",
     "name": "Fifth Paladin"
    },
    {
     "id": "tt_16",
     "attr": "aquos",
     "name": "Tuskor"
    },
    {
     "id": "bb_42",
     "attr": "aquos",
     "name": "Serpenoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_122",
     "name": "Serpenoid"
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
     "id": "tt_16",
     "attr": "aquos",
     "name": "Tuskor"
    },
    {
     "id": "bb_42",
     "attr": "aquos",
     "name": "Serpenoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_122",
     "name": "Serpenoid"
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
  "signature": "Clayf",
  "joins": 4,
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
     "id": "bb_40",
     "attr": "subterra",
     "name": "Robotallion"
    },
    {
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
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
     "id": "tt_03",
     "attr": "subterra",
     "name": "Clayf"
    },
    {
     "id": "bb_40",
     "attr": "subterra",
     "name": "Robotallion"
    },
    {
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_120",
     "name": "Robotallion"
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
     "id": "bb_40",
     "attr": "subterra",
     "name": "Robotallion"
    },
    {
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_120",
     "name": "Robotallion"
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
  "signature": "Alpha Hydranoid",
  "joins": 0,
  "easy": {
   "attr": "subterra",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_00",
     "attr": "subterra",
     "name": "Alpha Hydranoid"
    },
    {
     "id": "bb_40",
     "attr": "haos",
     "name": "Robotallion"
    },
    {
     "id": "bb_52",
     "attr": "aquos",
     "name": "Gargonoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_112",
     "name": "Dual Hydranoid"
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
     "id": "tt_00",
     "attr": "subterra",
     "name": "Alpha Hydranoid"
    },
    {
     "id": "bb_40",
     "attr": "haos",
     "name": "Robotallion"
    },
    {
     "id": "bb_52",
     "attr": "aquos",
     "name": "Gargonoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_112",
     "name": "Dual Hydranoid"
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
     "id": "tt_00",
     "attr": "subterra",
     "name": "Alpha Hydranoid"
    },
    {
     "id": "bb_40",
     "attr": "haos",
     "name": "Robotallion"
    },
    {
     "id": "bb_52",
     "attr": "aquos",
     "name": "Gargonoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_112",
     "name": "Dual Hydranoid"
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
export const JOINS = {"brodny":3,"kasimir":3,"pavel":3,"tibor":3,"vasek":3,"vesna":3,"zarek":3,"zorro":3,"arcadius":3,"demitri":3,"eudocia":3,"ignatios":3,"mousoulios":3,"petronas":3,"sophia":3,"jason":3,"evelyn":4,"nina":4,"kala":4,"olivia":4,"raymond":0};
export const SEASON3_NEW = Object.keys(JOINS).filter(id => JOINS[id] === 3);
export const SEASON4_NEW = Object.keys(JOINS).filter(id => JOINS[id] === 4);
Object.assign(INTERSPACE, NEW_BRAWLERS);
Object.assign(STORY_START, {"brodny":"normal","kasimir":"normal","pavel":"normal","tibor":"normal","vasek":"normal","vesna":"normal","zarek":"normal","zorro":"normal","arcadius":"normal","demitri":"normal","eudocia":"normal","ignatios":"normal","mousoulios":"normal","petronas":"normal","sophia":"normal","jason":"easy","evelyn":"easy","nina":"easy","kala":"easy","olivia":"easy","raymond":"easy"});
