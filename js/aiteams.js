// Computer opponents: each character's team at Easy / Normal / Hard. Built by tools/aiteams.mjs — edit the table there.
// upgrades: each upgrade adds 10G to every Bakugan on the team (capped at 600G).
export const UPGRADE_G = 10;
export const AI_TEAMS = {
 "dan": {
  "attr": "pyrus",
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_00",
     "attr": "pyrus",
     "name": "Dragonoid"
    },
    {
     "id": "bb_56",
     "attr": "pyrus",
     "name": "Manion"
    },
    {
     "id": "bb_50",
     "attr": "pyrus",
     "name": "Terrorclaw"
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
     "id": "bb_00",
     "attr": "pyrus",
     "name": "Dragonoid"
    },
    {
     "id": "bb_50",
     "attr": "pyrus",
     "name": "Terrorclaw"
    },
    {
     "id": "tt_19",
     "attr": "pyrus",
     "name": "El Condor"
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
      "id": "ds_704",
      "name": "Trickster"
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
     "id": "bb_01",
     "attr": "pyrus",
     "name": "Delta Dragonoid II"
    },
    {
     "id": "tt_19",
     "attr": "pyrus",
     "name": "El Condor"
    },
    {
     "id": "tt_06",
     "attr": "pyrus",
     "name": "Fifth Paladin"
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
     "id": "ds_706",
     "name": "Surprise Attack"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_409",
      "name": "Pyrus Time Breaker"
     },
     {
      "id": "ds_703",
      "name": "Sleight of Hand"
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
      "id": "ds_707",
      "name": "Road Trip"
     }
    ]
   }
  }
 },
 "runo": {
  "attr": "haos",
  "easy": {
   "attr": "haos",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_04",
     "attr": "haos",
     "name": "Tigrerra"
    },
    {
     "id": "bb_42",
     "attr": "haos",
     "name": "Serpenoid"
    },
    {
     "id": "bb_45",
     "attr": "haos",
     "name": "Griffon"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_104",
     "name": "Blade Tigrerra"
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
     "id": "bb_04",
     "attr": "haos",
     "name": "Tigrerra"
    },
    {
     "id": "bb_45",
     "attr": "haos",
     "name": "Griffon"
    },
    {
     "id": "bb_46",
     "attr": "haos",
     "name": "Laserman"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_104",
     "name": "Blade Tigrerra"
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
      "id": "ds_703",
      "name": "Sleight of Hand"
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
     "id": "bb_05",
     "attr": "haos",
     "name": "Blade Tigrerra"
    },
    {
     "id": "bb_46",
     "attr": "haos",
     "name": "Laserman"
    },
    {
     "id": "bb_60",
     "attr": "haos",
     "name": "Warius"
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
     "id": "ds_708",
     "name": "Invulnerable"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_412",
      "name": "Haos Time Breaker"
     },
     {
      "id": "ds_701",
      "name": "Another Throw"
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
      "id": "ds_706",
      "name": "Surprise Attack"
     }
    ]
   }
  }
 },
 "marucho": {
  "attr": "aquos",
  "easy": {
   "attr": "aquos",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_06",
     "attr": "aquos",
     "name": "Preyas"
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
     "id": "ds_106",
     "name": "Preyas's"
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
     "id": "bb_06",
     "attr": "aquos",
     "name": "Preyas"
    },
    {
     "id": "bb_58",
     "attr": "aquos",
     "name": "Ravenoid"
    },
    {
     "id": "bt_hynoid",
     "attr": "aquos",
     "name": "Hynoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_106",
     "name": "Preyas's"
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
      "id": "ds_701",
      "name": "Another Throw"
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
     "id": "bb_07",
     "attr": "aquos",
     "name": "Preyas II (Angelo)"
    },
    {
     "id": "bt_hynoid",
     "attr": "aquos",
     "name": "Hynoid"
    },
    {
     "id": "bt_bee",
     "attr": "aquos",
     "name": "Bee Striker"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_106",
     "name": "Preyas's"
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
     "id": "ds_708",
     "name": "Invulnerable"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_410",
      "name": "Aquos Time Breaker"
     },
     {
      "id": "ds_702",
      "name": "Second Chance"
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
      "id": "ds_706",
      "name": "Surprise Attack"
     }
    ]
   }
  }
 },
 "julie": {
  "attr": "subterra",
  "easy": {
   "attr": "subterra",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_09",
     "attr": "subterra",
     "name": "Gorem"
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
     "id": "bb_09",
     "attr": "subterra",
     "name": "Gorem"
    },
    {
     "id": "tt_11",
     "attr": "subterra",
     "name": "Mantris"
    },
    {
     "id": "bb_61",
     "attr": "subterra",
     "name": "Monarus"
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
      "id": "ds_704",
      "name": "Trickster"
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
     "id": "bb_10",
     "attr": "subterra",
     "name": "Hammer Gorem"
    },
    {
     "id": "bb_61",
     "attr": "subterra",
     "name": "Monarus"
    },
    {
     "id": "tt_17",
     "attr": "subterra",
     "name": "Wormquake"
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
     "id": "ds_707",
     "name": "Road Trip"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_411",
      "name": "Subterra Time Breaker"
     },
     {
      "id": "ds_703",
      "name": "Sleight of Hand"
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
      "id": "ds_708",
      "name": "Invulnerable"
     }
    ]
   }
  }
 },
 "shun": {
  "attr": "ventus",
  "easy": {
   "attr": "ventus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_11",
     "attr": "ventus",
     "name": "Skyress"
    },
    {
     "id": "tt_20",
     "attr": "ventus",
     "name": "Goblin Ball"
    },
    {
     "id": "bb_52",
     "attr": "ventus",
     "name": "Gargonoid"
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
     "id": "bb_11",
     "attr": "ventus",
     "name": "Skyress"
    },
    {
     "id": "bb_52",
     "attr": "ventus",
     "name": "Gargonoid"
    },
    {
     "id": "bb_25",
     "attr": "ventus",
     "name": "Reaper"
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
      "id": "ds_702",
      "name": "Second Chance"
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
     "id": "bb_12",
     "attr": "ventus",
     "name": "Storm Skyress"
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
     "id": "ds_708",
     "name": "Invulnerable"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_414",
      "name": "Ventus Time Breaker"
     },
     {
      "id": "ds_704",
      "name": "Trickster"
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
      "id": "ds_706",
      "name": "Surprise Attack"
     }
    ]
   }
  }
 },
 "akira": {
  "attr": "subterra",
  "easy": {
   "attr": "subterra",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_41",
     "attr": "subterra",
     "name": "Saurus"
    },
    {
     "id": "bb_40",
     "attr": "subterra",
     "name": "Robotallion"
    },
    {
     "id": "tt_18",
     "attr": "subterra",
     "name": "Rattleoid"
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
     "id": "bb_43",
     "attr": "subterra",
     "name": "Falconeer"
    },
    {
     "id": "tt_18",
     "attr": "subterra",
     "name": "Rattleoid"
    },
    {
     "id": "bb_48",
     "attr": "subterra",
     "name": "Fear Ripper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_123",
     "name": "Falconeer"
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
      "id": "ds_703",
      "name": "Sleight of Hand"
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
     "id": "bb_46",
     "attr": "subterra",
     "name": "Laserman"
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
     "id": "ds_706",
     "name": "Surprise Attack"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_411",
      "name": "Subterra Time Breaker"
     },
     {
      "id": "ds_701",
      "name": "Another Throw"
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
      "id": "ds_707",
      "name": "Road Trip"
     }
    ]
   }
  }
 },
 "shuji": {
  "attr": "subterra/darkus/darkus",
  "easy": {
   "attr": "subterra",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_48",
     "attr": "subterra",
     "name": "Fear Ripper"
    },
    {
     "id": "bb_44",
     "attr": "subterra",
     "name": "Stinglash"
    },
    {
     "id": "bb_43",
     "attr": "subterra",
     "name": "Falconeer"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_128",
     "name": "Fear Ripper"
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
   "attr": "darkus",
   "upgrades": 5,
   "toys": [
    {
     "id": "bb_48",
     "attr": "darkus",
     "name": "Fear Ripper"
    },
    {
     "id": "bb_43",
     "attr": "darkus",
     "name": "Falconeer"
    },
    {
     "id": "tt_06",
     "attr": "darkus",
     "name": "Fifth Paladin"
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
      "id": "ds_701",
      "name": "Another Throw"
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
     "id": "bb_60",
     "attr": "darkus",
     "name": "Warius"
    },
    {
     "id": "tt_06",
     "attr": "darkus",
     "name": "Fifth Paladin"
    },
    {
     "id": "bb_46",
     "attr": "darkus",
     "name": "Laserman"
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
     "id": "ds_405",
     "name": "Darkus Swap"
    },
    "blue": {
     "id": "ds_606",
     "name": "Power From Darkness"
    },
    "green": {
     "id": "ds_706",
     "name": "Surprise Attack"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_413",
      "name": "Darkus Time Breaker"
     },
     {
      "id": "ds_702",
      "name": "Second Chance"
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
      "id": "ds_707",
      "name": "Road Trip"
     }
    ]
   }
  }
 },
 "jenny": {
  "attr": "aquos",
  "easy": {
   "attr": "aquos",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_49",
     "attr": "aquos",
     "name": "Siege"
    },
    {
     "id": "tt_21",
     "attr": "aquos",
     "name": "Jelldon"
    },
    {
     "id": "tt_16",
     "attr": "aquos",
     "name": "Tuskor"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_129",
     "name": "Siege"
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
     "id": "bb_49",
     "attr": "aquos",
     "name": "Siege"
    },
    {
     "id": "tt_16",
     "attr": "aquos",
     "name": "Tuskor"
    },
    {
     "id": "bb_60",
     "attr": "aquos",
     "name": "Warius"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_129",
     "name": "Siege"
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
      "id": "ds_703",
      "name": "Sleight of Hand"
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
     "id": "bb_49",
     "attr": "aquos",
     "name": "Siege"
    },
    {
     "id": "bb_60",
     "attr": "aquos",
     "name": "Warius"
    },
    {
     "id": "tt_19",
     "attr": "aquos",
     "name": "El Condor"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_129",
     "name": "Siege"
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
     "id": "ds_708",
     "name": "Invulnerable"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_410",
      "name": "Aquos Time Breaker"
     },
     {
      "id": "ds_701",
      "name": "Another Throw"
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
      "id": "ds_706",
      "name": "Surprise Attack"
     }
    ]
   }
  }
 },
 "jewls": {
  "attr": "subterra",
  "easy": {
   "attr": "subterra",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_47",
     "attr": "subterra",
     "name": "Centipoid"
    },
    {
     "id": "bb_56",
     "attr": "subterra",
     "name": "Manion"
    },
    {
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_127",
     "name": "Centipoid"
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
     "id": "bb_47",
     "attr": "subterra",
     "name": "Centipoid"
    },
    {
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
    },
    {
     "id": "bt_bee",
     "attr": "subterra",
     "name": "Bee Striker"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_127",
     "name": "Centipoid"
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
      "id": "ds_701",
      "name": "Another Throw"
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
     "id": "bb_47",
     "attr": "subterra",
     "name": "Centipoid"
    },
    {
     "id": "bt_bee",
     "attr": "subterra",
     "name": "Bee Striker"
    },
    {
     "id": "bb_61",
     "attr": "subterra",
     "name": "Monarus"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_127",
     "name": "Centipoid"
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
     "id": "ds_707",
     "name": "Road Trip"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_411",
      "name": "Subterra Time Breaker"
     },
     {
      "id": "ds_702",
      "name": "Second Chance"
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
      "id": "ds_708",
      "name": "Invulnerable"
     }
    ]
   }
  }
 },
 "billy": {
  "attr": "subterra",
  "easy": {
   "attr": "subterra",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_26",
     "attr": "subterra",
     "name": "Cycloid"
    },
    {
     "id": "bb_42",
     "attr": "subterra",
     "name": "Serpenoid"
    },
    {
     "id": "bb_45",
     "attr": "subterra",
     "name": "Griffon"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_114",
     "name": "Cycloid"
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
     "id": "bb_26",
     "attr": "subterra",
     "name": "Cycloid"
    },
    {
     "id": "bb_45",
     "attr": "subterra",
     "name": "Griffon"
    },
    {
     "id": "tt_17",
     "attr": "subterra",
     "name": "Wormquake"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_114",
     "name": "Cycloid"
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
      "id": "ds_703",
      "name": "Sleight of Hand"
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
     "id": "bb_26",
     "attr": "subterra",
     "name": "Cycloid"
    },
    {
     "id": "tt_17",
     "attr": "subterra",
     "name": "Wormquake"
    },
    {
     "id": "bb_25",
     "attr": "subterra",
     "name": "Reaper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_114",
     "name": "Cycloid"
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
     "id": "ds_707",
     "name": "Road Trip"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_411",
      "name": "Subterra Time Breaker"
     },
     {
      "id": "ds_701",
      "name": "Another Throw"
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
      "id": "ds_708",
      "name": "Invulnerable"
     }
    ]
   }
  }
 },
 "komba": {
  "attr": "ventus",
  "easy": {
   "attr": "ventus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_30",
     "attr": "ventus",
     "name": "Harpus"
    },
    {
     "id": "bb_39",
     "attr": "ventus",
     "name": "Juggernoid"
    },
    {
     "id": "bb_58",
     "attr": "ventus",
     "name": "Ravenoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_118",
     "name": "Harpus"
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
     "id": "bb_30",
     "attr": "ventus",
     "name": "Harpus"
    },
    {
     "id": "bb_58",
     "attr": "ventus",
     "name": "Ravenoid"
    },
    {
     "id": "tt_10",
     "attr": "ventus",
     "name": "Limulus"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_118",
     "name": "Harpus"
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
      "id": "ds_702",
      "name": "Second Chance"
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
     "id": "bb_30",
     "attr": "ventus",
     "name": "Harpus"
    },
    {
     "id": "tt_10",
     "attr": "ventus",
     "name": "Limulus"
    },
    {
     "id": "bb_48",
     "attr": "ventus",
     "name": "Fear Ripper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_118",
     "name": "Harpus"
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
     "id": "ds_707",
     "name": "Road Trip"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_414",
      "name": "Ventus Time Breaker"
     },
     {
      "id": "ds_704",
      "name": "Trickster"
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
      "id": "ds_708",
      "name": "Invulnerable"
     }
    ]
   }
  }
 },
 "julio": {
  "attr": "haos",
  "easy": {
   "attr": "haos",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_29",
     "attr": "haos",
     "name": "Tentaclear"
    },
    {
     "id": "bb_41",
     "attr": "haos",
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
     "id": "ds_117",
     "name": "Tentaclear"
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
     "id": "bb_29",
     "attr": "haos",
     "name": "Tentaclear"
    },
    {
     "id": "tt_11",
     "attr": "haos",
     "name": "Mantris"
    },
    {
     "id": "tt_19",
     "attr": "haos",
     "name": "El Condor"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_117",
     "name": "Tentaclear"
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
      "id": "ds_701",
      "name": "Another Throw"
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
     "id": "bb_29",
     "attr": "haos",
     "name": "Tentaclear"
    },
    {
     "id": "tt_19",
     "attr": "haos",
     "name": "El Condor"
    },
    {
     "id": "tt_06",
     "attr": "haos",
     "name": "Fifth Paladin"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_117",
     "name": "Tentaclear"
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
     "id": "ds_706",
     "name": "Surprise Attack"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_412",
      "name": "Haos Time Breaker"
     },
     {
      "id": "ds_702",
      "name": "Second Chance"
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
      "id": "ds_707",
      "name": "Road Trip"
     }
    ]
   }
  }
 },
 "chanlee": {
  "attr": "pyrus",
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_28",
     "attr": "pyrus",
     "name": "Fortress"
    },
    {
     "id": "tt_20",
     "attr": "pyrus",
     "name": "Goblin Ball"
    },
    {
     "id": "bb_52",
     "attr": "pyrus",
     "name": "Gargonoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_116",
     "name": "Fortress"
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
     "id": "bb_28",
     "attr": "pyrus",
     "name": "Fortress"
    },
    {
     "id": "bb_52",
     "attr": "pyrus",
     "name": "Gargonoid"
    },
    {
     "id": "bb_46",
     "attr": "pyrus",
     "name": "Laserman"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_116",
     "name": "Fortress"
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
      "id": "ds_703",
      "name": "Sleight of Hand"
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
     "id": "bb_28",
     "attr": "pyrus",
     "name": "Fortress"
    },
    {
     "id": "bb_46",
     "attr": "pyrus",
     "name": "Laserman"
    },
    {
     "id": "bb_60",
     "attr": "pyrus",
     "name": "Warius"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_116",
     "name": "Fortress"
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
     "id": "ds_707",
     "name": "Road Trip"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_409",
      "name": "Pyrus Time Breaker"
     },
     {
      "id": "ds_701",
      "name": "Another Throw"
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
      "id": "ds_708",
      "name": "Invulnerable"
     }
    ]
   }
  }
 },
 "klaus": {
  "attr": "aquos",
  "easy": {
   "attr": "aquos",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_27",
     "attr": "aquos",
     "name": "Sirenoid"
    },
    {
     "id": "bb_40",
     "attr": "aquos",
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
     "id": "ds_115",
     "name": "Sirenoid"
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
     "id": "bb_27",
     "attr": "aquos",
     "name": "Sirenoid"
    },
    {
     "id": "tt_18",
     "attr": "aquos",
     "name": "Rattleoid"
    },
    {
     "id": "bt_hynoid",
     "attr": "aquos",
     "name": "Hynoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_115",
     "name": "Sirenoid"
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
      "id": "ds_703",
      "name": "Sleight of Hand"
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
     "id": "bb_27",
     "attr": "aquos",
     "name": "Sirenoid"
    },
    {
     "id": "bt_hynoid",
     "attr": "aquos",
     "name": "Hynoid"
    },
    {
     "id": "bt_bee",
     "attr": "aquos",
     "name": "Bee Striker"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_115",
     "name": "Sirenoid"
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
     "id": "ds_426",
     "name": "Aquos Double Input"
    },
    "blue": {
     "id": "ds_607",
     "name": "Summon Wave"
    },
    "green": {
     "id": "ds_523",
     "name": "Forcing Wave"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_402",
      "name": "Aquos Swap"
     },
     {
      "id": "ds_410",
      "name": "Aquos Time Breaker"
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
      "id": "ds_506",
      "name": "Imbalance"
     },
     {
      "id": "ds_706",
      "name": "Surprise Attack"
     }
    ]
   }
  }
 },
 "masquerade": {
  "attr": "darkus",
  "easy": {
   "attr": "darkus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_13",
     "attr": "darkus",
     "name": "Hydranoid"
    },
    {
     "id": "bb_41",
     "attr": "darkus",
     "name": "Saurus"
    },
    {
     "id": "tt_11",
     "attr": "darkus",
     "name": "Mantris"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_112",
     "name": "Dual Hydranoid"
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
     "id": "bb_14",
     "attr": "darkus",
     "name": "Dual Hydranoid"
    },
    {
     "id": "tt_11",
     "attr": "darkus",
     "name": "Mantris"
    },
    {
     "id": "tt_10",
     "attr": "darkus",
     "name": "Limulus"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_112",
     "name": "Dual Hydranoid"
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
      "id": "ds_702",
      "name": "Second Chance"
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
     "id": "tt_00",
     "attr": "darkus",
     "name": "Alpha Hydranoid"
    },
    {
     "id": "tt_10",
     "attr": "darkus",
     "name": "Limulus"
    },
    {
     "id": "bb_48",
     "attr": "darkus",
     "name": "Fear Ripper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_112",
     "name": "Dual Hydranoid"
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
     "id": "ds_520",
     "name": "Chaos of the Darkness"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_413",
      "name": "Darkus Time Breaker"
     },
     {
      "id": "ds_704",
      "name": "Trickster"
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
      "id": "ds_706",
      "name": "Surprise Attack"
     }
    ]
   }
  }
 },
 "nv_dan": {
  "attr": "pyrus",
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "dc_sp00",
     "attr": "pyrus",
     "name": "Neo Dragonoid"
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
   },
   "trap": {
    "id": "dc_spt00",
    "name": "Scorpion",
    "color": "pyrus",
    "attrs": [
     "pyrus",
     "subterra"
    ]
   }
  },
  "normal": {
   "attr": "pyrus",
   "upgrades": 5,
   "toys": [
    {
     "id": "dc_sp00",
     "attr": "pyrus",
     "name": "Neo Dragonoid"
    },
    {
     "id": "bb_45",
     "attr": "pyrus",
     "name": "Griffon"
    },
    {
     "id": "bb_60",
     "attr": "pyrus",
     "name": "Warius"
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
      "id": "ds_702",
      "name": "Second Chance"
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
   },
   "trap": {
    "id": "dc_spt00",
    "name": "Scorpion",
    "color": "pyrus",
    "attrs": [
     "pyrus",
     "ventus"
    ]
   }
  },
  "hard": {
   "attr": "pyrus",
   "upgrades": 10,
   "toys": [
    {
     "id": "dc_sp00_00",
     "attr": "pyrus",
     "name": "Hyper Dragonoid"
    },
    {
     "id": "bb_60",
     "attr": "pyrus",
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
     "id": "ds_706",
     "name": "Surprise Attack"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_409",
      "name": "Pyrus Time Breaker"
     },
     {
      "id": "ds_704",
      "name": "Trickster"
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
      "id": "ds_707",
      "name": "Road Trip"
     }
    ]
   },
   "trap": {
    "id": "dc_spt00",
    "name": "Scorpion",
    "color": "pyrus",
    "attrs": [
     "pyrus",
     "subterra"
    ]
   }
  }
 },
 "nv_shun": {
  "attr": "ventus",
  "easy": {
   "attr": "ventus",
   "upgrades": 0,
   "toys": [
    {
     "id": "dc_sp01",
     "attr": "ventus",
     "name": "Ingram"
    },
    {
     "id": "tt_21",
     "attr": "ventus",
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
     "id": "cu_007",
     "name": "Ingram"
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
    "id": "dc_spt01",
    "name": "Hylash",
    "color": "ventus",
    "attrs": [
     "ventus",
     "pyrus"
    ]
   }
  },
  "normal": {
   "attr": "ventus",
   "upgrades": 5,
   "toys": [
    {
     "id": "dc_sp01",
     "attr": "ventus",
     "name": "Ingram"
    },
    {
     "id": "tt_16",
     "attr": "ventus",
     "name": "Tuskor"
    },
    {
     "id": "bb_25",
     "attr": "ventus",
     "name": "Reaper"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_007",
     "name": "Ingram"
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
      "id": "ds_704",
      "name": "Trickster"
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
    "id": "dc_spt01",
    "name": "Hylash",
    "color": "ventus",
    "attrs": [
     "ventus",
     "pyrus"
    ]
   }
  },
  "hard": {
   "attr": "ventus",
   "upgrades": 10,
   "toys": [
    {
     "id": "dc_sp01_00",
     "attr": "ventus",
     "name": "Cosmic Ingram"
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
     "id": "cu_007",
     "name": "Ingram"
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
     "id": "ds_708",
     "name": "Invulnerable"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_414",
      "name": "Ventus Time Breaker"
     },
     {
      "id": "ds_703",
      "name": "Sleight of Hand"
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
      "id": "ds_706",
      "name": "Surprise Attack"
     }
    ]
   },
   "trap": {
    "id": "dc_spt01",
    "name": "Hylash",
    "color": "ventus",
    "attrs": [
     "ventus",
     "pyrus"
    ]
   }
  }
 },
 "nv_marucho": {
  "attr": "aquos",
  "easy": {
   "attr": "aquos",
   "upgrades": 0,
   "toys": [
    {
     "id": "dc_sp02",
     "attr": "aquos",
     "name": "Elfin"
    },
    {
     "id": "bb_40",
     "attr": "aquos",
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
   },
   "trap": {
    "id": "dc_spt02",
    "name": "Tripod Epsilon",
    "color": "aquos",
    "attrs": [
     "aquos",
     "subterra",
     "haos"
    ]
   }
  },
  "normal": {
   "attr": "aquos",
   "upgrades": 5,
   "toys": [
    {
     "id": "dc_sp02",
     "attr": "aquos",
     "name": "Elfin"
    },
    {
     "id": "tt_18",
     "attr": "aquos",
     "name": "Rattleoid"
    },
    {
     "id": "bb_46",
     "attr": "aquos",
     "name": "Laserman"
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
      "id": "ds_703",
      "name": "Sleight of Hand"
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
    "id": "dc_spt02",
    "name": "Tripod Epsilon",
    "color": "aquos",
    "attrs": [
     "aquos",
     "haos",
     "subterra"
    ]
   }
  },
  "hard": {
   "attr": "aquos",
   "upgrades": 10,
   "toys": [
    {
     "id": "dc_sp02_00",
     "attr": "aquos",
     "name": "Dual Elfin"
    },
    {
     "id": "bb_46",
     "attr": "aquos",
     "name": "Laserman"
    },
    {
     "id": "bb_60",
     "attr": "aquos",
     "name": "Warius"
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
     "id": "ds_708",
     "name": "Invulnerable"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_410",
      "name": "Aquos Time Breaker"
     },
     {
      "id": "ds_701",
      "name": "Another Throw"
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
      "id": "ds_706",
      "name": "Surprise Attack"
     }
    ]
   },
   "trap": {
    "id": "dc_spt02",
    "name": "Tripod Epsilon",
    "color": "aquos",
    "attrs": [
     "aquos",
     "subterra",
     "haos"
    ]
   }
  }
 },
 "ace": {
  "attr": "darkus",
  "easy": {
   "attr": "darkus",
   "upgrades": 0,
   "toys": [
    {
     "id": "dc_sp03",
     "attr": "darkus",
     "name": "Percival"
    },
    {
     "id": "bb_41",
     "attr": "darkus",
     "name": "Saurus"
    },
    {
     "id": "tt_11",
     "attr": "darkus",
     "name": "Mantris"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_009",
     "name": "Percival Field"
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
   },
   "trap": {
    "id": "dc_spt03",
    "name": "Falcon Fly",
    "color": "darkus",
    "attrs": [
     "darkus",
     "pyrus"
    ]
   }
  },
  "normal": {
   "attr": "darkus",
   "upgrades": 5,
   "toys": [
    {
     "id": "dc_sp03",
     "attr": "darkus",
     "name": "Percival"
    },
    {
     "id": "tt_11",
     "attr": "darkus",
     "name": "Mantris"
    },
    {
     "id": "tt_17",
     "attr": "darkus",
     "name": "Wormquake"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_009",
     "name": "Percival Field"
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
      "id": "ds_701",
      "name": "Another Throw"
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
   },
   "trap": {
    "id": "dc_spt03",
    "name": "Falcon Fly",
    "color": "darkus",
    "attrs": [
     "darkus",
     "haos"
    ]
   }
  },
  "hard": {
   "attr": "darkus",
   "upgrades": 10,
   "toys": [
    {
     "id": "dc_sp03_00",
     "attr": "darkus",
     "name": "Midnight Percival"
    },
    {
     "id": "tt_17",
     "attr": "darkus",
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
     "id": "cu_009",
     "name": "Percival Field"
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
     "id": "ds_707",
     "name": "Road Trip"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_413",
      "name": "Darkus Time Breaker"
     },
     {
      "id": "ds_702",
      "name": "Second Chance"
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
      "id": "ds_708",
      "name": "Invulnerable"
     }
    ]
   },
   "trap": {
    "id": "dc_spt03",
    "name": "Falcon Fly",
    "color": "darkus",
    "attrs": [
     "darkus",
     "pyrus"
    ]
   }
  }
 },
 "mira": {
  "attr": "subterra",
  "easy": {
   "attr": "subterra",
   "upgrades": 0,
   "toys": [
    {
     "id": "dc_sp04",
     "attr": "subterra",
     "name": "Wilda"
    },
    {
     "id": "bb_42",
     "attr": "subterra",
     "name": "Serpenoid"
    },
    {
     "id": "bb_45",
     "attr": "subterra",
     "name": "Griffon"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_010",
     "name": "Wilda"
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
   },
   "trap": {
    "id": "dc_spt04",
    "name": "Baliton",
    "color": "subterra",
    "attrs": [
     "subterra",
     "haos"
    ]
   }
  },
  "normal": {
   "attr": "subterra",
   "upgrades": 5,
   "toys": [
    {
     "id": "dc_sp04",
     "attr": "subterra",
     "name": "Wilda"
    },
    {
     "id": "bb_45",
     "attr": "subterra",
     "name": "Griffon"
    },
    {
     "id": "tt_06",
     "attr": "subterra",
     "name": "Fifth Paladin"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_010",
     "name": "Wilda"
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
      "id": "ds_704",
      "name": "Trickster"
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
   },
   "trap": {
    "id": "dc_spt04",
    "name": "Baliton",
    "color": "subterra",
    "attrs": [
     "subterra",
     "haos"
    ]
   }
  },
  "hard": {
   "attr": "subterra",
   "upgrades": 10,
   "toys": [
    {
     "id": "dc_sp04_00",
     "attr": "subterra",
     "name": "Thunder Wilda"
    },
    {
     "id": "tt_06",
     "attr": "subterra",
     "name": "Fifth Paladin"
    },
    {
     "id": "bb_46",
     "attr": "subterra",
     "name": "Laserman"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_010",
     "name": "Wilda"
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
     "id": "ds_708",
     "name": "Invulnerable"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_411",
      "name": "Subterra Time Breaker"
     },
     {
      "id": "ds_703",
      "name": "Sleight of Hand"
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
      "id": "ds_706",
      "name": "Surprise Attack"
     }
    ]
   },
   "trap": {
    "id": "dc_spt04",
    "name": "Baliton",
    "color": "subterra",
    "attrs": [
     "subterra",
     "haos"
    ]
   }
  }
 },
 "baron": {
  "attr": "haos",
  "easy": {
   "attr": "haos",
   "upgrades": 0,
   "toys": [
    {
     "id": "dc_sp05",
     "attr": "haos",
     "name": "Nemus"
    },
    {
     "id": "tt_21",
     "attr": "haos",
     "name": "Jelldon"
    },
    {
     "id": "tt_16",
     "attr": "haos",
     "name": "Tuskor"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_011",
     "name": "Nemus"
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
   },
   "trap": {
    "id": "dc_spt05",
    "name": "Piercian",
    "color": "haos",
    "attrs": [
     "haos",
     "darkus",
     "ventus"
    ]
   }
  },
  "normal": {
   "attr": "haos",
   "upgrades": 5,
   "toys": [
    {
     "id": "dc_sp05",
     "attr": "haos",
     "name": "Nemus"
    },
    {
     "id": "tt_16",
     "attr": "haos",
     "name": "Tuskor"
    },
    {
     "id": "bb_61",
     "attr": "haos",
     "name": "Monarus"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_011",
     "name": "Nemus"
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
      "id": "ds_703",
      "name": "Sleight of Hand"
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
   },
   "trap": {
    "id": "dc_spt05",
    "name": "Piercian",
    "color": "haos",
    "attrs": [
     "haos",
     "darkus",
     "subterra"
    ]
   }
  },
  "hard": {
   "attr": "haos",
   "upgrades": 10,
   "toys": [
    {
     "id": "dc_sp05_00",
     "attr": "haos",
     "name": "Mega Nemus"
    },
    {
     "id": "bb_61",
     "attr": "haos",
     "name": "Monarus"
    },
    {
     "id": "tt_17",
     "attr": "haos",
     "name": "Wormquake"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_011",
     "name": "Nemus"
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
     "id": "ds_708",
     "name": "Invulnerable"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_412",
      "name": "Haos Time Breaker"
     },
     {
      "id": "ds_701",
      "name": "Another Throw"
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
      "id": "ds_706",
      "name": "Surprise Attack"
     }
    ]
   },
   "trap": {
    "id": "dc_spt05",
    "name": "Piercian",
    "color": "haos",
    "attrs": [
     "haos",
     "darkus",
     "subterra"
    ]
   }
  }
 },
 "spectra": {
  "attr": "pyrus",
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "dc_sp06",
     "attr": "pyrus",
     "name": "Helios"
    },
    {
     "id": "dc_sp06_25",
     "attr": "pyrus",
     "name": "Klawgor"
    },
    {
     "id": "dc_sp06_21",
     "attr": "pyrus",
     "name": "Foxbat"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_001",
     "name": "Viper Helios"
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
   },
   "trap": {
    "id": "dc_spt06",
    "name": "Metalfencer",
    "color": "pyrus",
    "attrs": [
     "pyrus",
     "subterra"
    ]
   }
  },
  "normal": {
   "attr": "pyrus",
   "upgrades": 5,
   "toys": [
    {
     "id": "dc_sp06",
     "attr": "pyrus",
     "name": "Helios"
    },
    {
     "id": "dc_sp06_20",
     "attr": "pyrus",
     "name": "Fencer"
    },
    {
     "id": "dc_sp06_22",
     "attr": "pyrus",
     "name": "Leefram"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_001",
     "name": "Viper Helios"
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
      "id": "ds_702",
      "name": "Second Chance"
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
   },
   "trap": {
    "id": "dc_spt06",
    "name": "Metalfencer",
    "color": "pyrus",
    "attrs": [
     "pyrus",
     "ventus"
    ]
   }
  },
  "hard": {
   "attr": "pyrus",
   "upgrades": 10,
   "toys": [
    {
     "id": "dc_sp06",
     "attr": "pyrus",
     "name": "Helios"
    },
    {
     "id": "dc_sp06_24",
     "attr": "pyrus",
     "name": "Spindle"
    },
    {
     "id": "dc_sp06_20",
     "attr": "pyrus",
     "name": "Fencer"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_001",
     "name": "Viper Helios"
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
     "id": "ds_506",
     "name": "Imbalance"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_409",
      "name": "Pyrus Time Breaker"
     },
     {
      "id": "ds_704",
      "name": "Trickster"
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
      "id": "ds_708",
      "name": "Invulnerable"
     }
    ]
   },
   "trap": {
    "id": "dc_spt06",
    "name": "Metalfencer",
    "color": "pyrus",
    "attrs": [
     "pyrus",
     "subterra"
    ]
   }
  }
 },
 "mylene": {
  "attr": "aquos",
  "easy": {
   "attr": "aquos",
   "upgrades": 0,
   "toys": [
    {
     "id": "dc_sp07",
     "attr": "aquos",
     "name": "Elico"
    },
    {
     "id": "dc_sp06_21",
     "attr": "aquos",
     "name": "Foxbat"
    },
    {
     "id": "dc_sp06_25",
     "attr": "aquos",
     "name": "Klawgor"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_002",
     "name": "Elico"
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
   },
   "trap": {
    "id": "dc_spt07",
    "name": "Tripod Theta",
    "color": "aquos",
    "attrs": [
     "aquos",
     "ventus",
     "haos"
    ]
   }
  },
  "normal": {
   "attr": "aquos",
   "upgrades": 5,
   "toys": [
    {
     "id": "dc_sp07",
     "attr": "aquos",
     "name": "Elico"
    },
    {
     "id": "dc_sp06_21",
     "attr": "aquos",
     "name": "Foxbat"
    },
    {
     "id": "dc_sp06_23",
     "attr": "aquos",
     "name": "Scraper"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_002",
     "name": "Elico"
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
      "id": "ds_703",
      "name": "Sleight of Hand"
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
    "id": "dc_spt07",
    "name": "Tripod Theta",
    "color": "aquos",
    "attrs": [
     "aquos",
     "haos",
     "subterra"
    ]
   }
  },
  "hard": {
   "attr": "aquos",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_24",
     "attr": "aquos",
     "name": "Macubass"
    },
    {
     "id": "dc_sp06_24",
     "attr": "aquos",
     "name": "Spindle"
    },
    {
     "id": "dc_sp06_23",
     "attr": "aquos",
     "name": "Scraper"
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
     "id": "ds_707",
     "name": "Road Trip"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_410",
      "name": "Aquos Time Breaker"
     },
     {
      "id": "ds_701",
      "name": "Another Throw"
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
      "id": "ds_708",
      "name": "Invulnerable"
     }
    ]
   },
   "trap": {
    "id": "dc_spt07",
    "name": "Tripod Theta",
    "color": "aquos",
    "attrs": [
     "aquos",
     "subterra",
     "haos"
    ]
   }
  }
 },
 "volt": {
  "attr": "haos",
  "easy": {
   "attr": "haos",
   "upgrades": 0,
   "toys": [
    {
     "id": "dc_sp08",
     "attr": "haos",
     "name": "Brontes"
    },
    {
     "id": "dc_sp06_22",
     "attr": "haos",
     "name": "Leefram"
    },
    {
     "id": "dc_sp06_21",
     "attr": "haos",
     "name": "Foxbat"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_006",
     "name": "Brontes"
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
   },
   "trap": {
    "id": "dc_spt08",
    "name": "Dynamo",
    "color": "haos",
    "attrs": [
     "haos",
     "darkus",
     "pyrus"
    ]
   }
  },
  "normal": {
   "attr": "haos",
   "upgrades": 5,
   "toys": [
    {
     "id": "dc_sp08",
     "attr": "haos",
     "name": "Brontes"
    },
    {
     "id": "dc_sp06_20",
     "attr": "haos",
     "name": "Fencer"
    },
    {
     "id": "dc_sp06_21",
     "attr": "haos",
     "name": "Foxbat"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_006",
     "name": "Brontes"
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
      "id": "ds_701",
      "name": "Another Throw"
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
   },
   "trap": {
    "id": "dc_spt08",
    "name": "Dynamo",
    "color": "haos",
    "attrs": [
     "haos",
     "subterra",
     "darkus"
    ]
   }
  },
  "hard": {
   "attr": "haos",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_22",
     "attr": "haos",
     "name": "Boriates"
    },
    {
     "id": "dc_sp06_20",
     "attr": "haos",
     "name": "Fencer"
    },
    {
     "id": "dc_sp06_24",
     "attr": "haos",
     "name": "Spindle"
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
     "id": "ds_707",
     "name": "Road Trip"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_412",
      "name": "Haos Time Breaker"
     },
     {
      "id": "ds_702",
      "name": "Second Chance"
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
      "id": "ds_708",
      "name": "Invulnerable"
     }
    ]
   },
   "trap": {
    "id": "dc_spt08",
    "name": "Dynamo",
    "color": "haos",
    "attrs": [
     "haos",
     "darkus",
     "subterra"
    ]
   }
  }
 },
 "gus": {
  "attr": "subterra",
  "easy": {
   "attr": "subterra",
   "upgrades": 0,
   "toys": [
    {
     "id": "dc_sp09",
     "attr": "subterra",
     "name": "Premo Vulcan"
    },
    {
     "id": "dc_sp06_22",
     "attr": "subterra",
     "name": "Leefram"
    },
    {
     "id": "dc_sp06_25",
     "attr": "subterra",
     "name": "Klawgor"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_005",
     "name": "Vulcan"
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
   },
   "trap": {
    "id": "dc_spt_grakashound",
    "name": "Grakas Hound",
    "color": "subterra",
    "attrs": [
     "subterra",
     "haos"
    ]
   }
  },
  "normal": {
   "attr": "subterra",
   "upgrades": 5,
   "toys": [
    {
     "id": "dc_sp09",
     "attr": "subterra",
     "name": "Premo Vulcan"
    },
    {
     "id": "dc_sp06_23",
     "attr": "subterra",
     "name": "Scraper"
    },
    {
     "id": "dc_sp06_22",
     "attr": "subterra",
     "name": "Leefram"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_005",
     "name": "Vulcan"
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
      "id": "ds_704",
      "name": "Trickster"
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
   },
   "trap": {
    "id": "dc_spt_grakashound",
    "name": "Grakas Hound",
    "color": "subterra",
    "attrs": [
     "subterra",
     "haos"
    ]
   }
  },
  "hard": {
   "attr": "subterra",
   "upgrades": 10,
   "toys": [
    {
     "id": "dc_sp09",
     "attr": "subterra",
     "name": "Premo Vulcan"
    },
    {
     "id": "dc_sp06_23",
     "attr": "subterra",
     "name": "Scraper"
    },
    {
     "id": "dc_sp06_24",
     "attr": "subterra",
     "name": "Spindle"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_005",
     "name": "Vulcan"
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
     "id": "ds_708",
     "name": "Invulnerable"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_411",
      "name": "Subterra Time Breaker"
     },
     {
      "id": "ds_703",
      "name": "Sleight of Hand"
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
      "id": "ds_706",
      "name": "Surprise Attack"
     }
    ]
   },
   "trap": {
    "id": "dc_spt_grakashound",
    "name": "Grakas Hound",
    "color": "subterra",
    "attrs": [
     "subterra",
     "haos"
    ]
   }
  }
 },
 "shadow": {
  "attr": "darkus",
  "easy": {
   "attr": "darkus",
   "upgrades": 0,
   "toys": [
    {
     "id": "dc_sp10",
     "attr": "darkus",
     "name": "Hades"
    },
    {
     "id": "dc_sp06_25",
     "attr": "darkus",
     "name": "Klawgor"
    },
    {
     "id": "dc_sp06_22",
     "attr": "darkus",
     "name": "Leefram"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_004",
     "name": "Myriad Hades"
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
   },
   "trap": {
    "id": "dc_spt10",
    "name": "Fortress",
    "color": "darkus",
    "attrs": [
     "darkus",
     "haos"
    ]
   }
  },
  "normal": {
   "attr": "darkus",
   "upgrades": 5,
   "toys": [
    {
     "id": "dc_sp10",
     "attr": "darkus",
     "name": "Hades"
    },
    {
     "id": "dc_sp06_23",
     "attr": "darkus",
     "name": "Scraper"
    },
    {
     "id": "dc_sp06_25",
     "attr": "darkus",
     "name": "Klawgor"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_004",
     "name": "Myriad Hades"
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
      "id": "ds_703",
      "name": "Sleight of Hand"
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
   },
   "trap": {
    "id": "dc_spt10",
    "name": "Fortress",
    "color": "darkus",
    "attrs": [
     "darkus",
     "haos"
    ]
   }
  },
  "hard": {
   "attr": "darkus",
   "upgrades": 10,
   "toys": [
    {
     "id": "dc_sp10",
     "attr": "darkus",
     "name": "Hades"
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
     "id": "cu_004",
     "name": "Myriad Hades"
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
     "id": "ds_708",
     "name": "Invulnerable"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_413",
      "name": "Darkus Time Breaker"
     },
     {
      "id": "ds_701",
      "name": "Another Throw"
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
      "id": "ds_706",
      "name": "Surprise Attack"
     }
    ]
   },
   "trap": {
    "id": "dc_spt10",
    "name": "Fortress",
    "color": "darkus",
    "attrs": [
     "darkus",
     "haos"
    ]
   }
  }
 },
 "lync": {
  "attr": "ventus",
  "easy": {
   "attr": "ventus",
   "upgrades": 0,
   "toys": [
    {
     "id": "dc_sp11",
     "attr": "ventus",
     "name": "Altair"
    },
    {
     "id": "dc_sp13",
     "attr": "ventus",
     "name": "Wired"
    },
    {
     "id": "dc_sp06_21",
     "attr": "ventus",
     "name": "Foxbat"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_003",
     "name": "Altair"
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
    "id": "dc_spt_spitarm",
    "name": "Spitarm",
    "color": "ventus",
    "attrs": [
     "ventus",
     "haos"
    ]
   }
  },
  "normal": {
   "attr": "ventus",
   "upgrades": 5,
   "toys": [
    {
     "id": "dc_sp11",
     "attr": "ventus",
     "name": "Altair"
    },
    {
     "id": "dc_sp13",
     "attr": "ventus",
     "name": "Wired"
    },
    {
     "id": "dc_sp06_25",
     "attr": "ventus",
     "name": "Klawgor"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_003",
     "name": "Altair"
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
      "id": "ds_702",
      "name": "Second Chance"
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
    "id": "dc_spt_spitarm",
    "name": "Spitarm",
    "color": "ventus",
    "attrs": [
     "ventus",
     "aquos"
    ]
   }
  },
  "hard": {
   "attr": "ventus",
   "upgrades": 10,
   "toys": [
    {
     "id": "dc_sp11",
     "attr": "ventus",
     "name": "Altair"
    },
    {
     "id": "dc_sp13",
     "attr": "ventus",
     "name": "Wired"
    },
    {
     "id": "dc_sp06_24",
     "attr": "ventus",
     "name": "Spindle"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_003",
     "name": "Altair"
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
     "id": "ds_707",
     "name": "Road Trip"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_414",
      "name": "Ventus Time Breaker"
     },
     {
      "id": "ds_704",
      "name": "Trickster"
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
      "id": "ds_708",
      "name": "Invulnerable"
     }
    ]
   },
   "trap": {
    "id": "dc_spt_spitarm",
    "name": "Spitarm",
    "color": "ventus",
    "attrs": [
     "ventus",
     "aquos"
    ]
   }
  }
 }
};
// new players' starter decks, by attribute
export const STARTERS = {
 "pyrus": {
  "toys": [
   {
    "id": "bb_41",
    "attr": "pyrus",
    "name": "Saurus"
   },
   {
    "id": "bb_43",
    "attr": "pyrus",
    "name": "Falconeer"
   },
   {
    "id": "bb_40",
    "attr": "pyrus",
    "name": "Robotallion"
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
 "aquos": {
  "toys": [
   {
    "id": "bb_44",
    "attr": "aquos",
    "name": "Stinglash"
   },
   {
    "id": "bb_42",
    "attr": "aquos",
    "name": "Serpenoid"
   },
   {
    "id": "bb_50",
    "attr": "aquos",
    "name": "Terrorclaw"
   }
  ],
  "gates": {
   "gold": {
    "id": "ds_124",
    "name": "Stinglash"
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
 "subterra": {
  "toys": [
   {
    "id": "bb_52",
    "attr": "subterra",
    "name": "Gargonoid"
   },
   {
    "id": "bb_44",
    "attr": "subterra",
    "name": "Stinglash"
   },
   {
    "id": "bb_41",
    "attr": "subterra",
    "name": "Saurus"
   }
  ],
  "gates": {
   "gold": {
    "id": "ds_131",
    "name": "Gargonoid"
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
 "haos": {
  "toys": [
   {
    "id": "bb_41",
    "attr": "haos",
    "name": "Saurus"
   },
   {
    "id": "bb_56",
    "attr": "haos",
    "name": "Manion"
   },
   {
    "id": "bb_45",
    "attr": "haos",
    "name": "Griffon"
   }
  ],
  "gates": {
   "gold": {
    "id": "ds_121",
    "name": "Saurus"
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
 "darkus": {
  "toys": [
   {
    "id": "bb_48",
    "attr": "darkus",
    "name": "Fear Ripper"
   },
   {
    "id": "bb_42",
    "attr": "darkus",
    "name": "Serpenoid"
   },
   {
    "id": "bb_44",
    "attr": "darkus",
    "name": "Stinglash"
   }
  ],
  "gates": {
   "gold": {
    "id": "ds_128",
    "name": "Fear Ripper"
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
 "ventus": {
  "toys": [
   {
    "id": "bb_58",
    "attr": "ventus",
    "name": "Ravenoid"
   },
   {
    "id": "bb_40",
    "attr": "ventus",
    "name": "Robotallion"
   },
   {
    "id": "bb_41",
    "attr": "ventus",
    "name": "Saurus"
   }
  ],
  "gates": {
   "gold": {
    "id": "ds_133",
    "name": "Ravenoid"
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
 }
};
// story mode: each character's starting level
export const STORY_START = {"masquerade":"hard","klaus":"hard","chanlee":"hard","spectra":"hard","gus":"hard","nv_dan":"hard","nv_shun":"hard","xander":"hard","runo":"normal","julie":"normal","julio":"normal","komba":"normal","billy":"normal","mylene":"normal","volt":"normal","shadow":"normal","lync":"normal","mira":"normal","ace":"normal","nv_marucho":"normal","baron":"normal","maisie":"normal","richard":"normal","brandon":"normal","otto":"normal","akira":"easy","shuji":"easy","jenny":"easy","jewls":"easy","heather":"easy","rocco":"easy","ryan":"easy","margaret":"easy","melissa":"easy","sarah":"easy","karen":"easy","brenda":"easy","george":"easy","ellie":"easy","amanda":"easy","gary":"easy","ella":"easy","anthony":"easy","sophie":"easy","nico":"easy","freya":"easy","zoya":"easy"};
// Interspace brawlers (story mode): all synthetic Bakugan
export const INTERSPACE = {
 "maisie": {
  "name": "Ashe",
  "species": "Vestal",
  "attrs": [
   "pyrus",
   "darkus",
   "subterra"
  ],
  "signature": null,
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
     "attr": "darkus",
     "name": "Robotallion"
    },
    {
     "id": "bb_43",
     "attr": "subterra",
     "name": "Falconeer"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_124",
     "name": "Stinglash"
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
     "id": "ds_411",
     "name": "Subterra Time Breaker"
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
      "id": "ds_622",
      "name": "The Gust"
     },
     {
      "id": "ds_623",
      "name": "Pyrus and Darkus Combo"
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
     "attr": "darkus",
     "name": "Rattleoid"
    },
    {
     "id": "bt_bee",
     "attr": "subterra",
     "name": "Bee Striker"
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
     "id": "ds_403",
     "name": "Subterra Swap"
    },
    "blue": {
     "id": "ds_602",
     "name": "G-Power Boost"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
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
      "id": "ds_606",
      "name": "Power From Darkness"
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
     "id": "bt_bee",
     "attr": "pyrus",
     "name": "Bee Striker"
    },
    {
     "id": "bb_61",
     "attr": "darkus",
     "name": "Monarus"
    },
    {
     "id": "tt_18",
     "attr": "subterra",
     "name": "Rattleoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_135",
     "name": "Monarus"
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
      "id": "ds_403",
      "name": "Subterra Swap"
     },
     {
      "id": "ds_405",
      "name": "Darkus Swap"
     }
    ],
    "blue": [
     {
      "id": "ds_602",
      "name": "G-Power Boost"
     },
     {
      "id": "ds_606",
      "name": "Power From Darkness"
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
 "richard": {
  "name": "Richard",
  "species": "Human",
  "attrs": [
   "pyrus",
   "ventus",
   "subterra"
  ],
  "signature": null,
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
     "id": "bb_39",
     "attr": "ventus",
     "name": "Juggernoid"
    },
    {
     "id": "tt_16",
     "attr": "subterra",
     "name": "Tuskor"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_119",
     "name": "Juggernoid"
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
     "id": "ds_411",
     "name": "Subterra Time Breaker"
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
      "id": "ds_609",
      "name": "Hot Wind"
     },
     {
      "id": "ds_602",
      "name": "G-Power Boost"
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
     "id": "tt_16",
     "attr": "pyrus",
     "name": "Tuskor"
    },
    {
     "id": "bb_58",
     "attr": "ventus",
     "name": "Ravenoid"
    },
    {
     "id": "tt_17",
     "attr": "subterra",
     "name": "Wormquake"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_133",
     "name": "Ravenoid"
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
     "id": "ds_403",
     "name": "Subterra Swap"
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
      "id": "ds_616",
      "name": "Brushfire"
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
     "id": "bb_25",
     "attr": "ventus",
     "name": "Reaper"
    },
    {
     "id": "bb_58",
     "attr": "subterra",
     "name": "Ravenoid"
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
     "id": "ds_622",
     "name": "The Gust"
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
      "id": "ds_406",
      "name": "Ventus Swap"
     }
    ],
    "blue": [
     {
      "id": "ds_615",
      "name": "Updraft"
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
 "ryan": {
  "name": "Ryan",
  "species": "Human",
  "attrs": [
   "ventus",
   "aquos",
   "haos"
  ],
  "signature": null,
  "easy": {
   "attr": "ventus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_56",
     "attr": "ventus",
     "name": "Manion"
    },
    {
     "id": "tt_21",
     "attr": "aquos",
     "name": "Jelldon"
    },
    {
     "id": "bb_50",
     "attr": "haos",
     "name": "Terrorclaw"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_132",
     "name": "Manion"
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
     "id": "ds_412",
     "name": "Haos Time Breaker"
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
      "id": "ds_617",
      "name": "G-Power Increase"
     },
     {
      "id": "ds_622",
      "name": "The Gust"
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
     "id": "bb_50",
     "attr": "ventus",
     "name": "Terrorclaw"
    },
    {
     "id": "tt_16",
     "attr": "aquos",
     "name": "Tuskor"
    },
    {
     "id": "tt_10",
     "attr": "haos",
     "name": "Limulus"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_130",
     "name": "Terrorclaw"
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
     "id": "ds_404",
     "name": "Haos Swap"
    },
    "blue": {
     "id": "ds_603",
     "name": "G-Power Bump"
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
      "id": "ds_615",
      "name": "Updraft"
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
     "id": "tt_10",
     "attr": "ventus",
     "name": "Limulus"
    },
    {
     "id": "bb_48",
     "attr": "aquos",
     "name": "Fear Ripper"
    },
    {
     "id": "tt_16",
     "attr": "haos",
     "name": "Tuskor"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_128",
     "name": "Fear Ripper"
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
      "id": "ds_404",
      "name": "Haos Swap"
     },
     {
      "id": "ds_406",
      "name": "Ventus Swap"
     }
    ],
    "blue": [
     {
      "id": "ds_603",
      "name": "G-Power Bump"
     },
     {
      "id": "ds_607",
      "name": "Summon Wave"
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
 "sarah": {
  "name": "Sarah",
  "species": "Human",
  "attrs": [
   "ventus",
   "aquos",
   "subterra"
  ],
  "signature": null,
  "easy": {
   "attr": "ventus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_42",
     "attr": "ventus",
     "name": "Serpenoid"
    },
    {
     "id": "tt_20",
     "attr": "aquos",
     "name": "Goblin Ball"
    },
    {
     "id": "bb_45",
     "attr": "subterra",
     "name": "Griffon"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_122",
     "name": "Serpenoid"
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
     "id": "ds_411",
     "name": "Subterra Time Breaker"
    },
    "blue": {
     "id": "ds_608",
     "name": "Mega Impact"
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
     "id": "bb_45",
     "attr": "ventus",
     "name": "Griffon"
    },
    {
     "id": "bb_52",
     "attr": "aquos",
     "name": "Gargonoid"
    },
    {
     "id": "tt_19",
     "attr": "subterra",
     "name": "El Condor"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_125",
     "name": "Griffon"
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
     "id": "ds_403",
     "name": "Subterra Swap"
    },
    "blue": {
     "id": "ds_605",
     "name": "Home Advantage"
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
      "id": "ds_615",
      "name": "Updraft"
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
     "id": "tt_19",
     "attr": "ventus",
     "name": "El Condor"
    },
    {
     "id": "tt_06",
     "attr": "aquos",
     "name": "Fifth Paladin"
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
     "id": "ds_622",
     "name": "The Gust"
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
      "id": "ds_406",
      "name": "Ventus Swap"
     }
    ],
    "blue": [
     {
      "id": "ds_605",
      "name": "Home Advantage"
     },
     {
      "id": "ds_607",
      "name": "Summon Wave"
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
 "george": {
  "name": "George",
  "species": "Human",
  "attrs": [
   "darkus",
   "aquos",
   "subterra"
  ],
  "signature": null,
  "easy": {
   "attr": "darkus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_39",
     "attr": "darkus",
     "name": "Juggernoid"
    },
    {
     "id": "bb_42",
     "attr": "aquos",
     "name": "Serpenoid"
    },
    {
     "id": "bb_58",
     "attr": "subterra",
     "name": "Ravenoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_119",
     "name": "Juggernoid"
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
     "id": "ds_411",
     "name": "Subterra Time Breaker"
    },
    "blue": {
     "id": "ds_608",
     "name": "Mega Impact"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
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
      "id": "ds_602",
      "name": "G-Power Boost"
     },
     {
      "id": "ds_611",
      "name": "G-Power Bonus"
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
     "id": "bb_58",
     "attr": "darkus",
     "name": "Ravenoid"
    },
    {
     "id": "bb_45",
     "attr": "aquos",
     "name": "Griffon"
    },
    {
     "id": "bb_46",
     "attr": "subterra",
     "name": "Laserman"
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
     "id": "ds_321",
     "name": "Reflexes"
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
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_405",
      "name": "Darkus Swap"
     },
     {
      "id": "ds_410",
      "name": "Aquos Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_606",
      "name": "Power From Darkness"
     },
     {
      "id": "ds_607",
      "name": "Summon Wave"
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
     "id": "bb_46",
     "attr": "darkus",
     "name": "Laserman"
    },
    {
     "id": "bb_60",
     "attr": "aquos",
     "name": "Warius"
    },
    {
     "id": "bb_45",
     "attr": "subterra",
     "name": "Griffon"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_126",
     "name": "Laserman"
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
     "id": "ds_402",
     "name": "Aquos Swap"
    },
    "blue": {
     "id": "ds_621",
     "name": "The Shadow"
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
      "id": "ds_405",
      "name": "Darkus Swap"
     }
    ],
    "blue": [
     {
      "id": "ds_605",
      "name": "Home Advantage"
     },
     {
      "id": "ds_606",
      "name": "Power From Darkness"
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
 "ella": {
  "name": "Scarlet",
  "species": "Vestal",
  "attrs": [
   "pyrus",
   "darkus"
  ],
  "signature": null,
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_41",
     "attr": "pyrus",
     "name": "Saurus"
    },
    {
     "id": "bb_44",
     "attr": "darkus",
     "name": "Stinglash"
    },
    {
     "id": "tt_11",
     "attr": "pyrus",
     "name": "Mantris"
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
     "id": "tt_11",
     "attr": "pyrus",
     "name": "Mantris"
    },
    {
     "id": "bb_43",
     "attr": "darkus",
     "name": "Falconeer"
    },
    {
     "id": "bt_hynoid",
     "attr": "pyrus",
     "name": "Hynoid"
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
     "id": "bt_hynoid",
     "attr": "pyrus",
     "name": "Hynoid"
    },
    {
     "id": "bt_bee",
     "attr": "darkus",
     "name": "Bee Striker"
    },
    {
     "id": "bb_43",
     "attr": "pyrus",
     "name": "Falconeer"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_123",
     "name": "Falconeer"
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
 "sophie": {
  "name": "Dusk",
  "species": "Vestal",
  "attrs": [
   "darkus",
   "ventus",
   "subterra"
  ],
  "signature": null,
  "easy": {
   "attr": "darkus",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_20",
     "attr": "darkus",
     "name": "Goblin Ball"
    },
    {
     "id": "bb_41",
     "attr": "ventus",
     "name": "Saurus"
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
     "id": "ds_413",
     "name": "Darkus Time Breaker"
    },
    "blue": {
     "id": "ds_609",
     "name": "Hot Wind"
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
     "id": "bb_52",
     "attr": "darkus",
     "name": "Gargonoid"
    },
    {
     "id": "tt_11",
     "attr": "ventus",
     "name": "Mantris"
    },
    {
     "id": "bb_61",
     "attr": "subterra",
     "name": "Monarus"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_131",
     "name": "Gargonoid"
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
     "id": "ds_606",
     "name": "Power From Darkness"
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
      "id": "ds_411",
      "name": "Subterra Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_615",
      "name": "Updraft"
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
   "attr": "darkus",
   "upgrades": 10,
   "toys": [
    {
     "id": "bb_61",
     "attr": "darkus",
     "name": "Monarus"
    },
    {
     "id": "tt_17",
     "attr": "ventus",
     "name": "Wormquake"
    },
    {
     "id": "tt_11",
     "attr": "subterra",
     "name": "Mantris"
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
     "id": "ds_403",
     "name": "Subterra Swap"
    },
    "blue": {
     "id": "ds_622",
     "name": "The Gust"
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
      "id": "ds_606",
      "name": "Power From Darkness"
     },
     {
      "id": "ds_615",
      "name": "Updraft"
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
 "nico": {
  "name": "Lux",
  "species": "Vestal",
  "attrs": [
   "haos"
  ],
  "signature": null,
  "easy": {
   "attr": "haos",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_40",
     "attr": "haos",
     "name": "Robotallion"
    },
    {
     "id": "bb_56",
     "attr": "haos",
     "name": "Manion"
    },
    {
     "id": "tt_18",
     "attr": "haos",
     "name": "Rattleoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_120",
     "name": "Robotallion"
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
     "id": "tt_18",
     "attr": "haos",
     "name": "Rattleoid"
    },
    {
     "id": "bb_50",
     "attr": "haos",
     "name": "Terrorclaw"
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
     "id": "bb_25",
     "attr": "haos",
     "name": "Reaper"
    },
    {
     "id": "tt_10",
     "attr": "haos",
     "name": "Limulus"
    },
    {
     "id": "bb_50",
     "attr": "haos",
     "name": "Terrorclaw"
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
 "freya": {
  "name": "Steam",
  "species": "Vestal",
  "attrs": [
   "pyrus",
   "aquos"
  ],
  "signature": null,
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
     "attr": "aquos",
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
     "id": "ds_124",
     "name": "Stinglash"
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
      "id": "ds_621",
      "name": "The Shadow"
     },
     {
      "id": "ds_623",
      "name": "Pyrus and Darkus Combo"
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
     "attr": "aquos",
     "name": "Rattleoid"
    },
    {
     "id": "bb_48",
     "attr": "pyrus",
     "name": "Fear Ripper"
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
     "id": "ds_402",
     "name": "Aquos Swap"
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
      "id": "ds_410",
      "name": "Aquos Time Breaker"
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
     "attr": "aquos",
     "name": "Hynoid"
    },
    {
     "id": "tt_18",
     "attr": "pyrus",
     "name": "Rattleoid"
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
      "id": "ds_402",
      "name": "Aquos Swap"
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
 "zoya": {
  "name": "Magma",
  "species": "Vestal",
  "attrs": [
   "pyrus",
   "subterra"
  ],
  "signature": null,
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
     "id": "bb_39",
     "attr": "subterra",
     "name": "Juggernoid"
    },
    {
     "id": "tt_16",
     "attr": "pyrus",
     "name": "Tuskor"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_119",
     "name": "Juggernoid"
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
     "id": "ds_605",
     "name": "Home Advantage"
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
     "id": "tt_16",
     "attr": "pyrus",
     "name": "Tuskor"
    },
    {
     "id": "bb_58",
     "attr": "subterra",
     "name": "Ravenoid"
    },
    {
     "id": "tt_06",
     "attr": "pyrus",
     "name": "Fifth Paladin"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_133",
     "name": "Ravenoid"
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
     "id": "ds_403",
     "name": "Subterra Swap"
    },
    "blue": {
     "id": "ds_602",
     "name": "G-Power Boost"
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
      "id": "ds_411",
      "name": "Subterra Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_612",
      "name": "G-Power Up"
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
   "attr": "pyrus",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_06",
     "attr": "pyrus",
     "name": "Fifth Paladin"
    },
    {
     "id": "bb_46",
     "attr": "subterra",
     "name": "Laserman"
    },
    {
     "id": "bb_58",
     "attr": "pyrus",
     "name": "Ravenoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_126",
     "name": "Laserman"
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
      "id": "ds_403",
      "name": "Subterra Swap"
     },
     {
      "id": "ds_409",
      "name": "Pyrus Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_602",
      "name": "G-Power Boost"
     },
     {
      "id": "ds_612",
      "name": "G-Power Up"
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
 "xander": {
  "name": "Gale",
  "species": "Vestal",
  "attrs": [
   "ventus",
   "aquos"
  ],
  "signature": null,
  "easy": {
   "attr": "ventus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_56",
     "attr": "ventus",
     "name": "Manion"
    },
    {
     "id": "tt_21",
     "attr": "aquos",
     "name": "Jelldon"
    },
    {
     "id": "bb_50",
     "attr": "ventus",
     "name": "Terrorclaw"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_132",
     "name": "Manion"
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
   }
  },
  "normal": {
   "attr": "ventus",
   "upgrades": 5,
   "toys": [
    {
     "id": "bb_50",
     "attr": "ventus",
     "name": "Terrorclaw"
    },
    {
     "id": "tt_16",
     "attr": "aquos",
     "name": "Tuskor"
    },
    {
     "id": "bb_60",
     "attr": "ventus",
     "name": "Warius"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_130",
     "name": "Terrorclaw"
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
   }
  },
  "hard": {
   "attr": "ventus",
   "upgrades": 10,
   "toys": [
    {
     "id": "bb_60",
     "attr": "ventus",
     "name": "Warius"
    },
    {
     "id": "tt_19",
     "attr": "aquos",
     "name": "El Condor"
    },
    {
     "id": "tt_16",
     "attr": "ventus",
     "name": "Tuskor"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_134",
     "name": "Warius"
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
   }
  }
 },
 "heather": {
  "name": "Heather",
  "species": "Human",
  "attrs": [
   "aquos",
   "subterra"
  ],
  "signature": null,
  "easy": {
   "attr": "aquos",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_42",
     "attr": "aquos",
     "name": "Serpenoid"
    },
    {
     "id": "tt_20",
     "attr": "subterra",
     "name": "Goblin Ball"
    },
    {
     "id": "bb_45",
     "attr": "aquos",
     "name": "Griffon"
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
     "id": "bb_45",
     "attr": "aquos",
     "name": "Griffon"
    },
    {
     "id": "bb_52",
     "attr": "subterra",
     "name": "Gargonoid"
    },
    {
     "id": "bt_bee",
     "attr": "aquos",
     "name": "Bee Striker"
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
     "id": "bt_bee",
     "attr": "aquos",
     "name": "Bee Striker"
    },
    {
     "id": "bb_61",
     "attr": "subterra",
     "name": "Monarus"
    },
    {
     "id": "bb_52",
     "attr": "aquos",
     "name": "Gargonoid"
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
 "brandon": {
  "name": "Brandon",
  "species": "Human",
  "attrs": [
   "pyrus"
  ],
  "signature": null,
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_39",
     "attr": "pyrus",
     "name": "Juggernoid"
    },
    {
     "id": "bb_42",
     "attr": "pyrus",
     "name": "Serpenoid"
    },
    {
     "id": "bb_58",
     "attr": "pyrus",
     "name": "Ravenoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_119",
     "name": "Juggernoid"
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
     "id": "bb_58",
     "attr": "pyrus",
     "name": "Ravenoid"
    },
    {
     "id": "bb_45",
     "attr": "pyrus",
     "name": "Griffon"
    },
    {
     "id": "tt_17",
     "attr": "pyrus",
     "name": "Wormquake"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_133",
     "name": "Ravenoid"
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
     "id": "tt_17",
     "attr": "pyrus",
     "name": "Wormquake"
    },
    {
     "id": "bb_25",
     "attr": "pyrus",
     "name": "Reaper"
    },
    {
     "id": "bb_45",
     "attr": "pyrus",
     "name": "Griffon"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_125",
     "name": "Griffon"
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
 "rocco": {
  "name": "Grim",
  "species": "Vestal",
  "attrs": [
   "darkus",
   "ventus",
   "subterra"
  ],
  "signature": null,
  "easy": {
   "attr": "darkus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_56",
     "attr": "darkus",
     "name": "Manion"
    },
    {
     "id": "bb_44",
     "attr": "ventus",
     "name": "Stinglash"
    },
    {
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_132",
     "name": "Manion"
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
     "id": "ds_413",
     "name": "Darkus Time Breaker"
    },
    "blue": {
     "id": "ds_609",
     "name": "Hot Wind"
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
     "id": "bb_50",
     "attr": "darkus",
     "name": "Terrorclaw"
    },
    {
     "id": "bb_43",
     "attr": "ventus",
     "name": "Falconeer"
    },
    {
     "id": "tt_06",
     "attr": "subterra",
     "name": "Fifth Paladin"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_130",
     "name": "Terrorclaw"
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
     "id": "ds_606",
     "name": "Power From Darkness"
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
      "id": "ds_411",
      "name": "Subterra Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_615",
      "name": "Updraft"
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
   "attr": "darkus",
   "upgrades": 10,
   "toys": [
    {
     "id": "tt_06",
     "attr": "darkus",
     "name": "Fifth Paladin"
    },
    {
     "id": "bb_46",
     "attr": "ventus",
     "name": "Laserman"
    },
    {
     "id": "bb_43",
     "attr": "subterra",
     "name": "Falconeer"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_126",
     "name": "Laserman"
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
     "id": "ds_403",
     "name": "Subterra Swap"
    },
    "blue": {
     "id": "ds_622",
     "name": "The Gust"
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
      "id": "ds_606",
      "name": "Power From Darkness"
     },
     {
      "id": "ds_615",
      "name": "Updraft"
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
 "otto": {
  "name": "Eclipse",
  "species": "Vestal",
  "attrs": [
   "darkus",
   "aquos",
   "haos"
  ],
  "signature": null,
  "easy": {
   "attr": "darkus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_44",
     "attr": "darkus",
     "name": "Stinglash"
    },
    {
     "id": "bb_40",
     "attr": "aquos",
     "name": "Robotallion"
    },
    {
     "id": "bb_43",
     "attr": "haos",
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
     "id": "ds_412",
     "name": "Haos Time Breaker"
    },
    "blue": {
     "id": "ds_601",
     "name": "Bright Light"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
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
      "id": "ds_613",
      "name": "Dark Growth"
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
   "attr": "darkus",
   "upgrades": 5,
   "toys": [
    {
     "id": "bb_43",
     "attr": "darkus",
     "name": "Falconeer"
    },
    {
     "id": "tt_18",
     "attr": "aquos",
     "name": "Rattleoid"
    },
    {
     "id": "bb_61",
     "attr": "haos",
     "name": "Monarus"
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
     "id": "ds_404",
     "name": "Haos Swap"
    },
    "blue": {
     "id": "ds_606",
     "name": "Power From Darkness"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_405",
      "name": "Darkus Swap"
     },
     {
      "id": "ds_410",
      "name": "Aquos Time Breaker"
     }
    ],
    "blue": [
     {
      "id": "ds_620",
      "name": "The Glow"
     },
     {
      "id": "ds_607",
      "name": "Summon Wave"
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
     "id": "bb_61",
     "attr": "darkus",
     "name": "Monarus"
    },
    {
     "id": "tt_17",
     "attr": "aquos",
     "name": "Wormquake"
    },
    {
     "id": "tt_18",
     "attr": "haos",
     "name": "Rattleoid"
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
     "id": "ds_402",
     "name": "Aquos Swap"
    },
    "blue": {
     "id": "ds_621",
     "name": "The Shadow"
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
      "id": "ds_405",
      "name": "Darkus Swap"
     }
    ],
    "blue": [
     {
      "id": "ds_606",
      "name": "Power From Darkness"
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
 "margaret": {
  "name": "Margaret",
  "species": "Human",
  "attrs": [
   "haos"
  ],
  "signature": null,
  "easy": {
   "attr": "haos",
   "upgrades": 0,
   "toys": [
    {
     "id": "tt_20",
     "attr": "haos",
     "name": "Goblin Ball"
    },
    {
     "id": "bb_41",
     "attr": "haos",
     "name": "Saurus"
    },
    {
     "id": "bb_52",
     "attr": "haos",
     "name": "Gargonoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_121",
     "name": "Saurus"
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
     "id": "bb_52",
     "attr": "haos",
     "name": "Gargonoid"
    },
    {
     "id": "tt_11",
     "attr": "haos",
     "name": "Mantris"
    },
    {
     "id": "tt_19",
     "attr": "haos",
     "name": "El Condor"
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
     "id": "tt_19",
     "attr": "haos",
     "name": "El Condor"
    },
    {
     "id": "tt_06",
     "attr": "haos",
     "name": "Fifth Paladin"
    },
    {
     "id": "tt_11",
     "attr": "haos",
     "name": "Mantris"
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
 "melissa": {
  "name": "Melissa",
  "species": "Human",
  "attrs": [
   "pyrus",
   "darkus",
   "aquos"
  ],
  "signature": null,
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_39",
     "attr": "pyrus",
     "name": "Juggernoid"
    },
    {
     "id": "bb_56",
     "attr": "darkus",
     "name": "Manion"
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
     "id": "ds_410",
     "name": "Aquos Time Breaker"
    },
    "blue": {
     "id": "ds_620",
     "name": "The Glow"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
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
      "id": "ds_604",
      "name": "Blaze"
     },
     {
      "id": "ds_602",
      "name": "G-Power Boost"
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
     "id": "bb_58",
     "attr": "pyrus",
     "name": "Ravenoid"
    },
    {
     "id": "bb_50",
     "attr": "darkus",
     "name": "Terrorclaw"
    },
    {
     "id": "bt_bee",
     "attr": "aquos",
     "name": "Bee Striker"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_133",
     "name": "Ravenoid"
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
     "id": "ds_402",
     "name": "Aquos Swap"
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
      "id": "ds_606",
      "name": "Power From Darkness"
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
     "id": "bt_bee",
     "attr": "pyrus",
     "name": "Bee Striker"
    },
    {
     "id": "bb_61",
     "attr": "darkus",
     "name": "Monarus"
    },
    {
     "id": "bb_50",
     "attr": "aquos",
     "name": "Terrorclaw"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_130",
     "name": "Terrorclaw"
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
     "id": "ds_621",
     "name": "The Shadow"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "extra": {
    "red": [
     {
      "id": "ds_402",
      "name": "Aquos Swap"
     },
     {
      "id": "ds_405",
      "name": "Darkus Swap"
     }
    ],
    "blue": [
     {
      "id": "ds_607",
      "name": "Summon Wave"
     },
     {
      "id": "ds_606",
      "name": "Power From Darkness"
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
 "karen": {
  "name": "Karen",
  "species": "Human",
  "attrs": [
   "pyrus",
   "darkus",
   "haos"
  ],
  "signature": null,
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_56",
     "attr": "pyrus",
     "name": "Manion"
    },
    {
     "id": "tt_21",
     "attr": "darkus",
     "name": "Jelldon"
    },
    {
     "id": "bb_50",
     "attr": "haos",
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
     "id": "ds_412",
     "name": "Haos Time Breaker"
    },
    "blue": {
     "id": "ds_613",
     "name": "Dark Growth"
    },
    "green": {
     "id": "ds_505",
     "name": "Negative Wave"
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
      "id": "ds_602",
      "name": "G-Power Boost"
     },
     {
      "id": "ds_612",
      "name": "G-Power Up"
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
     "id": "bb_50",
     "attr": "pyrus",
     "name": "Terrorclaw"
    },
    {
     "id": "tt_16",
     "attr": "darkus",
     "name": "Tuskor"
    },
    {
     "id": "bb_48",
     "attr": "haos",
     "name": "Fear Ripper"
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
     "id": "ds_404",
     "name": "Haos Swap"
    },
    "blue": {
     "id": "ds_606",
     "name": "Power From Darkness"
    },
    "green": {
     "id": "ds_502",
     "name": "No Trading"
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
      "id": "ds_601",
      "name": "Bright Light"
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
     "attr": "darkus",
     "name": "Hynoid"
    },
    {
     "id": "tt_16",
     "attr": "haos",
     "name": "Tuskor"
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
      "id": "ds_404",
      "name": "Haos Swap"
     },
     {
      "id": "ds_405",
      "name": "Darkus Swap"
     }
    ],
    "blue": [
     {
      "id": "ds_606",
      "name": "Power From Darkness"
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
 "brenda": {
  "name": "Brenda",
  "species": "Human",
  "attrs": [
   "pyrus",
   "darkus",
   "ventus"
  ],
  "signature": null,
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
     "id": "tt_20",
     "attr": "darkus",
     "name": "Goblin Ball"
    },
    {
     "id": "bb_43",
     "attr": "ventus",
     "name": "Falconeer"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_124",
     "name": "Stinglash"
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
     "id": "bb_52",
     "attr": "darkus",
     "name": "Gargonoid"
    },
    {
     "id": "bt_hynoid",
     "attr": "ventus",
     "name": "Hynoid"
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
   }
  },
  "hard": {
   "attr": "pyrus",
   "upgrades": 10,
   "toys": [
    {
     "id": "bt_hynoid",
     "attr": "pyrus",
     "name": "Hynoid"
    },
    {
     "id": "bt_bee",
     "attr": "darkus",
     "name": "Bee Striker"
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
   }
  }
 },
 "ellie": {
  "name": "Marina",
  "species": "Vestal",
  "attrs": [
   "aquos",
   "subterra"
  ],
  "signature": null,
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
     "id": "tt_20",
     "attr": "subterra",
     "name": "Goblin Ball"
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
     "id": "bb_58",
     "attr": "aquos",
     "name": "Ravenoid"
    },
    {
     "id": "bb_52",
     "attr": "subterra",
     "name": "Gargonoid"
    },
    {
     "id": "tt_10",
     "attr": "aquos",
     "name": "Limulus"
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
     "id": "bb_48",
     "attr": "subterra",
     "name": "Fear Ripper"
    },
    {
     "id": "bb_52",
     "attr": "aquos",
     "name": "Gargonoid"
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
 "amanda": {
  "name": "Amanda",
  "species": "Human",
  "attrs": [
   "haos"
  ],
  "signature": null,
  "easy": {
   "attr": "haos",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_39",
     "attr": "haos",
     "name": "Juggernoid"
    },
    {
     "id": "bb_42",
     "attr": "haos",
     "name": "Serpenoid"
    },
    {
     "id": "bb_58",
     "attr": "haos",
     "name": "Ravenoid"
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
     "id": "bb_58",
     "attr": "haos",
     "name": "Ravenoid"
    },
    {
     "id": "bb_45",
     "attr": "haos",
     "name": "Griffon"
    },
    {
     "id": "bb_60",
     "attr": "haos",
     "name": "Warius"
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
     "id": "bb_60",
     "attr": "haos",
     "name": "Warius"
    },
    {
     "id": "tt_19",
     "attr": "haos",
     "name": "El Condor"
    },
    {
     "id": "bb_45",
     "attr": "haos",
     "name": "Griffon"
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
 "gary": {
  "name": "Gary",
  "species": "Human",
  "attrs": [
   "pyrus",
   "darkus"
  ],
  "signature": null,
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_40",
     "attr": "pyrus",
     "name": "Robotallion"
    },
    {
     "id": "bb_41",
     "attr": "darkus",
     "name": "Saurus"
    },
    {
     "id": "tt_18",
     "attr": "pyrus",
     "name": "Rattleoid"
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
     "id": "tt_18",
     "attr": "pyrus",
     "name": "Rattleoid"
    },
    {
     "id": "tt_11",
     "attr": "darkus",
     "name": "Mantris"
    },
    {
     "id": "tt_19",
     "attr": "pyrus",
     "name": "El Condor"
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
     "id": "tt_19",
     "attr": "pyrus",
     "name": "El Condor"
    },
    {
     "id": "tt_06",
     "attr": "darkus",
     "name": "Fifth Paladin"
    },
    {
     "id": "tt_11",
     "attr": "pyrus",
     "name": "Mantris"
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
 "anthony": {
  "name": "Anthony",
  "species": "Human",
  "attrs": [
   "aquos",
   "subterra"
  ],
  "signature": null,
  "easy": {
   "attr": "aquos",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_56",
     "attr": "aquos",
     "name": "Manion"
    },
    {
     "id": "bb_44",
     "attr": "subterra",
     "name": "Stinglash"
    },
    {
     "id": "bb_50",
     "attr": "aquos",
     "name": "Terrorclaw"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_132",
     "name": "Manion"
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
     "id": "bb_50",
     "attr": "aquos",
     "name": "Terrorclaw"
    },
    {
     "id": "bb_43",
     "attr": "subterra",
     "name": "Falconeer"
    },
    {
     "id": "bb_25",
     "attr": "aquos",
     "name": "Reaper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_130",
     "name": "Terrorclaw"
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
     "id": "bb_25",
     "attr": "aquos",
     "name": "Reaper"
    },
    {
     "id": "tt_10",
     "attr": "subterra",
     "name": "Limulus"
    },
    {
     "id": "bb_43",
     "attr": "aquos",
     "name": "Falconeer"
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
 }
};
