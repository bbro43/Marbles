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
     "id": "bb_42",
     "attr": "pyrus",
     "name": "Serpenoid"
    },
    {
     "id": "bb_41",
     "attr": "pyrus",
     "name": "Saurus"
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
     "id": "bb_43",
     "attr": "pyrus",
     "name": "Falconeer"
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
      "id": "ds_705",
      "name": "Early Victory"
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
     "id": "bb_41",
     "attr": "haos",
     "name": "Saurus"
    },
    {
     "id": "bb_56",
     "attr": "haos",
     "name": "Manion"
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
     "id": "bb_58",
     "attr": "haos",
     "name": "Ravenoid"
    },
    {
     "id": "bb_61",
     "attr": "haos",
     "name": "Monarus"
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
     "id": "bb_61",
     "attr": "haos",
     "name": "Monarus"
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
      "id": "ds_707",
      "name": "Road Trip"
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
     "id": "bb_44",
     "attr": "aquos",
     "name": "Stinglash"
    },
    {
     "id": "bb_42",
     "attr": "aquos",
     "name": "Serpenoid"
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
     "id": "bb_44",
     "attr": "aquos",
     "name": "Stinglash"
    },
    {
     "id": "bb_25",
     "attr": "aquos",
     "name": "Reaper"
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
     "id": "bb_60",
     "attr": "aquos",
     "name": "Warius"
    },
    {
     "id": "bb_46",
     "attr": "aquos",
     "name": "Laserman"
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
     "id": "bb_40",
     "attr": "subterra",
     "name": "Robotallion"
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
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
    },
    {
     "id": "bb_52",
     "attr": "subterra",
     "name": "Gargonoid"
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
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
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
      "id": "ds_705",
      "name": "Early Victory"
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
     "id": "bb_58",
     "attr": "ventus",
     "name": "Ravenoid"
    },
    {
     "id": "bb_56",
     "attr": "ventus",
     "name": "Manion"
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
     "id": "bb_43",
     "attr": "ventus",
     "name": "Falconeer"
    },
    {
     "id": "bb_61",
     "attr": "ventus",
     "name": "Monarus"
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
     "id": "bb_61",
     "attr": "ventus",
     "name": "Monarus"
    },
    {
     "id": "bb_46",
     "attr": "ventus",
     "name": "Laserman"
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
     "id": "ds_705",
     "name": "Early Victory"
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
     "id": "bb_44",
     "attr": "subterra",
     "name": "Stinglash"
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
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
    },
    {
     "id": "bb_45",
     "attr": "subterra",
     "name": "Griffon"
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
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
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
     "id": "bb_52",
     "attr": "subterra",
     "name": "Gargonoid"
    },
    {
     "id": "bb_40",
     "attr": "subterra",
     "name": "Robotallion"
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
     "id": "bb_25",
     "attr": "darkus",
     "name": "Reaper"
    },
    {
     "id": "bb_52",
     "attr": "darkus",
     "name": "Gargonoid"
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
     "id": "bb_25",
     "attr": "darkus",
     "name": "Reaper"
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
      "id": "ds_706",
      "name": "Surprise Attack"
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
     "id": "bb_42",
     "attr": "aquos",
     "name": "Serpenoid"
    },
    {
     "id": "bb_44",
     "attr": "aquos",
     "name": "Stinglash"
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
     "id": "bb_44",
     "attr": "aquos",
     "name": "Stinglash"
    },
    {
     "id": "bb_45",
     "attr": "aquos",
     "name": "Griffon"
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
     "id": "bb_46",
     "attr": "aquos",
     "name": "Laserman"
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
     "id": "ds_706",
     "name": "Surprise Attack"
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
      "id": "ds_707",
      "name": "Road Trip"
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
     "id": "bb_41",
     "attr": "subterra",
     "name": "Saurus"
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
     "id": "bb_45",
     "attr": "subterra",
     "name": "Griffon"
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
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
    },
    {
     "id": "bb_46",
     "attr": "subterra",
     "name": "Laserman"
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
      "id": "ds_706",
      "name": "Surprise Attack"
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
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
    },
    {
     "id": "bb_56",
     "attr": "subterra",
     "name": "Manion"
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
     "id": "bb_52",
     "attr": "subterra",
     "name": "Gargonoid"
    },
    {
     "id": "bb_43",
     "attr": "subterra",
     "name": "Falconeer"
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
     "id": "bb_46",
     "attr": "subterra",
     "name": "Laserman"
    },
    {
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
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
     "id": "bb_56",
     "attr": "ventus",
     "name": "Manion"
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
     "id": "bb_43",
     "attr": "ventus",
     "name": "Falconeer"
    },
    {
     "id": "bb_61",
     "attr": "ventus",
     "name": "Monarus"
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
     "id": "bb_46",
     "attr": "ventus",
     "name": "Laserman"
    },
    {
     "id": "bb_61",
     "attr": "ventus",
     "name": "Monarus"
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
     "id": "ds_705",
     "name": "Early Victory"
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
     "id": "bb_56",
     "attr": "haos",
     "name": "Manion"
    },
    {
     "id": "bb_41",
     "attr": "haos",
     "name": "Saurus"
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
     "id": "bb_45",
     "attr": "haos",
     "name": "Griffon"
    },
    {
     "id": "bb_58",
     "attr": "haos",
     "name": "Ravenoid"
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
     "id": "bb_46",
     "attr": "haos",
     "name": "Laserman"
    },
    {
     "id": "bb_61",
     "attr": "haos",
     "name": "Monarus"
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
      "id": "ds_706",
      "name": "Surprise Attack"
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
     "id": "bb_52",
     "attr": "pyrus",
     "name": "Gargonoid"
    },
    {
     "id": "bb_58",
     "attr": "pyrus",
     "name": "Ravenoid"
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
     "id": "bb_43",
     "attr": "pyrus",
     "name": "Falconeer"
    },
    {
     "id": "bb_45",
     "attr": "pyrus",
     "name": "Griffon"
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
     "id": "bb_60",
     "attr": "pyrus",
     "name": "Warius"
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
      "id": "ds_707",
      "name": "Road Trip"
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
     "id": "bb_44",
     "attr": "aquos",
     "name": "Stinglash"
    },
    {
     "id": "bb_42",
     "attr": "aquos",
     "name": "Serpenoid"
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
     "id": "bb_25",
     "attr": "aquos",
     "name": "Reaper"
    },
    {
     "id": "bb_44",
     "attr": "aquos",
     "name": "Stinglash"
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
     "id": "bb_60",
     "attr": "aquos",
     "name": "Warius"
    },
    {
     "id": "bb_46",
     "attr": "aquos",
     "name": "Laserman"
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
     "id": "ds_402",
     "name": "Aquos Swap"
    },
    "blue": {
     "id": "ds_607",
     "name": "Summon Wave"
    },
    "green": {
     "id": "ds_706",
     "name": "Surprise Attack"
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
      "id": "ds_707",
      "name": "Road Trip"
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
     "id": "bb_25",
     "attr": "darkus",
     "name": "Reaper"
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
     "id": "bb_13",
     "attr": "darkus",
     "name": "Hydranoid"
    },
    {
     "id": "bb_25",
     "attr": "darkus",
     "name": "Reaper"
    },
    {
     "id": "bb_46",
     "attr": "darkus",
     "name": "Laserman"
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
     "id": "bb_14",
     "attr": "darkus",
     "name": "Dual Hydranoid"
    },
    {
     "id": "bb_25",
     "attr": "darkus",
     "name": "Reaper"
    },
    {
     "id": "bb_60",
     "attr": "darkus",
     "name": "Warius"
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
     "id": "ds_705",
     "name": "Early Victory"
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
      "id": "ds_708",
      "name": "Invulnerable"
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
     "id": "bb_45",
     "attr": "pyrus",
     "name": "Griffon"
    },
    {
     "id": "bb_43",
     "attr": "pyrus",
     "name": "Falconeer"
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
     "id": "bb_46",
     "attr": "pyrus",
     "name": "Laserman"
    },
    {
     "id": "bb_61",
     "attr": "pyrus",
     "name": "Monarus"
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
     "id": "bb_46",
     "attr": "pyrus",
     "name": "Laserman"
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
     "id": "ds_705",
     "name": "Early Victory"
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
     "id": "bb_58",
     "attr": "ventus",
     "name": "Ravenoid"
    },
    {
     "id": "bb_43",
     "attr": "ventus",
     "name": "Falconeer"
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
     "id": "bb_61",
     "attr": "ventus",
     "name": "Monarus"
    },
    {
     "id": "bb_46",
     "attr": "ventus",
     "name": "Laserman"
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
     "id": "bb_61",
     "attr": "ventus",
     "name": "Monarus"
    },
    {
     "id": "bb_46",
     "attr": "ventus",
     "name": "Laserman"
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
      "id": "ds_705",
      "name": "Early Victory"
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
     "id": "bb_44",
     "attr": "aquos",
     "name": "Stinglash"
    },
    {
     "id": "bb_45",
     "attr": "aquos",
     "name": "Griffon"
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
     "id": "bb_06",
     "attr": "aquos",
     "name": "Preyas"
    },
    {
     "id": "bb_25",
     "attr": "aquos",
     "name": "Reaper"
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
     "id": "bb_06",
     "attr": "aquos",
     "name": "Preyas"
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
     "id": "ds_706",
     "name": "Surprise Attack"
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
      "id": "ds_707",
      "name": "Road Trip"
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
     "id": "bb_48",
     "attr": "darkus",
     "name": "Fear Ripper"
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
     "id": "bb_25",
     "attr": "darkus",
     "name": "Reaper"
    },
    {
     "id": "bb_46",
     "attr": "darkus",
     "name": "Laserman"
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
     "id": "bb_60",
     "attr": "darkus",
     "name": "Warius"
    },
    {
     "id": "bb_46",
     "attr": "darkus",
     "name": "Laserman"
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
      "id": "ds_706",
      "name": "Surprise Attack"
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
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
    },
    {
     "id": "bb_52",
     "attr": "subterra",
     "name": "Gargonoid"
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
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
    },
    {
     "id": "bb_61",
     "attr": "subterra",
     "name": "Monarus"
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
     "id": "bb_46",
     "attr": "subterra",
     "name": "Laserman"
    },
    {
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
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
      "id": "ds_705",
      "name": "Early Victory"
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
     "id": "bb_58",
     "attr": "haos",
     "name": "Ravenoid"
    },
    {
     "id": "bb_56",
     "attr": "haos",
     "name": "Manion"
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
     "id": "bb_61",
     "attr": "haos",
     "name": "Monarus"
    },
    {
     "id": "bb_45",
     "attr": "haos",
     "name": "Griffon"
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
     "id": "bb_46",
     "attr": "haos",
     "name": "Laserman"
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
      "id": "ds_707",
      "name": "Road Trip"
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
     "id": "ds_705",
     "name": "Early Victory"
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
     "id": "dc_sp07",
     "attr": "aquos",
     "name": "Elico"
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
     "id": "cu_002",
     "name": "Elico"
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
     "id": "ds_706",
     "name": "Surprise Attack"
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
      "id": "ds_707",
      "name": "Road Trip"
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
     "id": "dc_sp06_24",
     "attr": "haos",
     "name": "Spindle"
    }
   ],
   "gates": {
    "gold": {
     "id": "cu_006",
     "name": "Brontes"
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
      "id": "ds_706",
      "name": "Surprise Attack"
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
      "id": "ds_705",
      "name": "Early Victory"
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
      "id": "ds_707",
      "name": "Road Trip"
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
     "id": "ds_705",
     "name": "Early Victory"
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
    "id": "bb_42",
    "attr": "pyrus",
    "name": "Serpenoid"
   },
   {
    "id": "bb_41",
    "attr": "pyrus",
    "name": "Saurus"
   },
   {
    "id": "bb_43",
    "attr": "pyrus",
    "name": "Falconeer"
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
    "id": "bb_40",
    "attr": "aquos",
    "name": "Robotallion"
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
    "id": "bb_40",
    "attr": "subterra",
    "name": "Robotallion"
   },
   {
    "id": "bb_41",
    "attr": "subterra",
    "name": "Saurus"
   },
   {
    "id": "bb_56",
    "attr": "subterra",
    "name": "Manion"
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
    "id": "bb_58",
    "attr": "haos",
    "name": "Ravenoid"
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
    "id": "bb_52",
    "attr": "darkus",
    "name": "Gargonoid"
   },
   {
    "id": "bb_42",
    "attr": "darkus",
    "name": "Serpenoid"
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
    "id": "bb_56",
    "attr": "ventus",
    "name": "Manion"
   },
   {
    "id": "bb_44",
    "attr": "ventus",
    "name": "Stinglash"
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
  "name": "Maisie",
  "species": "Vestal",
  "attrs": [
   "pyrus",
   "darkus",
   "subterra"
  ],
  "signature": "Leefram",
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "dc_sp06_22",
     "attr": "pyrus",
     "name": "Leefram"
    },
    {
     "id": "dc_sp06_24",
     "attr": "darkus",
     "name": "Spindle"
    },
    {
     "id": "bb_45",
     "attr": "subterra",
     "name": "Griffon"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_125",
     "name": "Griffon"
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
     "id": "dc_sp06_22",
     "attr": "pyrus",
     "name": "Leefram"
    },
    {
     "id": "dc_sp06_24",
     "attr": "darkus",
     "name": "Spindle"
    },
    {
     "id": "bb_45",
     "attr": "subterra",
     "name": "Griffon"
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
     "id": "dc_sp06_22",
     "attr": "pyrus",
     "name": "Leefram"
    },
    {
     "id": "dc_sp06_24",
     "attr": "darkus",
     "name": "Spindle"
    },
    {
     "id": "bb_45",
     "attr": "subterra",
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
  "signature": "Robotallion",
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
     "id": "bb_42",
     "attr": "ventus",
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
     "id": "bb_40",
     "attr": "pyrus",
     "name": "Robotallion"
    },
    {
     "id": "bb_42",
     "attr": "ventus",
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
     "id": "ds_120",
     "name": "Robotallion"
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
     "id": "bb_40",
     "attr": "pyrus",
     "name": "Robotallion"
    },
    {
     "id": "bb_42",
     "attr": "ventus",
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
     "id": "ds_120",
     "name": "Robotallion"
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
  "signature": "Foxbat",
  "easy": {
   "attr": "ventus",
   "upgrades": 0,
   "toys": [
    {
     "id": "dc_sp06_21",
     "attr": "ventus",
     "name": "Foxbat"
    },
    {
     "id": "bt_hynoid",
     "attr": "aquos",
     "name": "Hynoid"
    },
    {
     "id": "bb_50",
     "attr": "haos",
     "name": "Terrorclaw"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_130",
     "name": "Terrorclaw"
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
     "id": "dc_sp06_21",
     "attr": "ventus",
     "name": "Foxbat"
    },
    {
     "id": "bt_hynoid",
     "attr": "aquos",
     "name": "Hynoid"
    },
    {
     "id": "bb_50",
     "attr": "haos",
     "name": "Terrorclaw"
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
     "id": "dc_sp06_21",
     "attr": "ventus",
     "name": "Foxbat"
    },
    {
     "id": "bt_hynoid",
     "attr": "aquos",
     "name": "Hynoid"
    },
    {
     "id": "bb_50",
     "attr": "haos",
     "name": "Terrorclaw"
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
  "signature": "Ravenoid",
  "easy": {
   "attr": "ventus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_58",
     "attr": "ventus",
     "name": "Ravenoid"
    },
    {
     "id": "dc_sp06_21",
     "attr": "aquos",
     "name": "Foxbat"
    },
    {
     "id": "bb_41",
     "attr": "subterra",
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
     "id": "bb_58",
     "attr": "ventus",
     "name": "Ravenoid"
    },
    {
     "id": "dc_sp06_21",
     "attr": "aquos",
     "name": "Foxbat"
    },
    {
     "id": "bb_41",
     "attr": "subterra",
     "name": "Saurus"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_133",
     "name": "Ravenoid"
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
     "id": "bb_58",
     "attr": "ventus",
     "name": "Ravenoid"
    },
    {
     "id": "dc_sp06_21",
     "attr": "aquos",
     "name": "Foxbat"
    },
    {
     "id": "bb_41",
     "attr": "subterra",
     "name": "Saurus"
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
  "signature": "Klawgor",
  "easy": {
   "attr": "darkus",
   "upgrades": 0,
   "toys": [
    {
     "id": "dc_sp06_25",
     "attr": "darkus",
     "name": "Klawgor"
    },
    {
     "id": "bt_bee",
     "attr": "aquos",
     "name": "Bee Striker"
    },
    {
     "id": "bb_25",
     "attr": "subterra",
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
     "id": "dc_sp06_25",
     "attr": "darkus",
     "name": "Klawgor"
    },
    {
     "id": "bt_bee",
     "attr": "aquos",
     "name": "Bee Striker"
    },
    {
     "id": "bb_25",
     "attr": "subterra",
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
     "id": "dc_sp06_25",
     "attr": "darkus",
     "name": "Klawgor"
    },
    {
     "id": "bt_bee",
     "attr": "aquos",
     "name": "Bee Striker"
    },
    {
     "id": "bb_25",
     "attr": "subterra",
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
  "name": "Ella",
  "species": "Vestal",
  "attrs": [
   "pyrus",
   "darkus"
  ],
  "signature": "Reaper",
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_25",
     "attr": "pyrus",
     "name": "Reaper"
    },
    {
     "id": "bb_52",
     "attr": "darkus",
     "name": "Gargonoid"
    },
    {
     "id": "bb_43",
     "attr": "pyrus",
     "name": "Falconeer"
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
     "id": "bb_25",
     "attr": "pyrus",
     "name": "Reaper"
    },
    {
     "id": "bb_52",
     "attr": "darkus",
     "name": "Gargonoid"
    },
    {
     "id": "bb_43",
     "attr": "pyrus",
     "name": "Falconeer"
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
     "id": "bb_25",
     "attr": "pyrus",
     "name": "Reaper"
    },
    {
     "id": "bb_52",
     "attr": "darkus",
     "name": "Gargonoid"
    },
    {
     "id": "bb_43",
     "attr": "pyrus",
     "name": "Falconeer"
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
 "sophie": {
  "name": "Sophie",
  "species": "Vestal",
  "attrs": [
   "darkus",
   "ventus",
   "subterra"
  ],
  "signature": "Scraper",
  "easy": {
   "attr": "darkus",
   "upgrades": 0,
   "toys": [
    {
     "id": "dc_sp06_23",
     "attr": "darkus",
     "name": "Scraper"
    },
    {
     "id": "dc_sp06_25",
     "attr": "ventus",
     "name": "Klawgor"
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
     "id": "dc_sp06_23",
     "attr": "darkus",
     "name": "Scraper"
    },
    {
     "id": "dc_sp06_25",
     "attr": "ventus",
     "name": "Klawgor"
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
     "id": "dc_sp06_23",
     "attr": "darkus",
     "name": "Scraper"
    },
    {
     "id": "dc_sp06_25",
     "attr": "ventus",
     "name": "Klawgor"
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
  "name": "Nico",
  "species": "Vestal",
  "attrs": [
   "haos"
  ],
  "signature": "Fear Ripper",
  "easy": {
   "attr": "haos",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_48",
     "attr": "haos",
     "name": "Fear Ripper"
    },
    {
     "id": "bb_56",
     "attr": "haos",
     "name": "Manion"
    },
    {
     "id": "bb_40",
     "attr": "haos",
     "name": "Robotallion"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_128",
     "name": "Fear Ripper"
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
     "id": "bb_48",
     "attr": "haos",
     "name": "Fear Ripper"
    },
    {
     "id": "bb_56",
     "attr": "haos",
     "name": "Manion"
    },
    {
     "id": "bb_40",
     "attr": "haos",
     "name": "Robotallion"
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
     "id": "bb_48",
     "attr": "haos",
     "name": "Fear Ripper"
    },
    {
     "id": "bb_56",
     "attr": "haos",
     "name": "Manion"
    },
    {
     "id": "bb_40",
     "attr": "haos",
     "name": "Robotallion"
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
  "name": "Freya",
  "species": "Vestal",
  "attrs": [
   "pyrus",
   "aquos"
  ],
  "signature": "Monarus",
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_61",
     "attr": "pyrus",
     "name": "Monarus"
    },
    {
     "id": "dc_sp06_20",
     "attr": "aquos",
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
     "id": "ds_135",
     "name": "Monarus"
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
     "id": "bb_61",
     "attr": "pyrus",
     "name": "Monarus"
    },
    {
     "id": "dc_sp06_20",
     "attr": "aquos",
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
     "id": "ds_135",
     "name": "Monarus"
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
     "id": "bb_61",
     "attr": "pyrus",
     "name": "Monarus"
    },
    {
     "id": "dc_sp06_20",
     "attr": "aquos",
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
  "name": "Zoya",
  "species": "Vestal",
  "attrs": [
   "pyrus",
   "subterra"
  ],
  "signature": "Hynoid",
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bt_hynoid",
     "attr": "pyrus",
     "name": "Hynoid"
    },
    {
     "id": "dc_sp06_23",
     "attr": "subterra",
     "name": "Scraper"
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
     "id": "bt_hynoid",
     "attr": "pyrus",
     "name": "Hynoid"
    },
    {
     "id": "dc_sp06_23",
     "attr": "subterra",
     "name": "Scraper"
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
     "id": "bt_hynoid",
     "attr": "pyrus",
     "name": "Hynoid"
    },
    {
     "id": "dc_sp06_23",
     "attr": "subterra",
     "name": "Scraper"
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
  "name": "Xander",
  "species": "Vestal",
  "attrs": [
   "ventus",
   "aquos"
  ],
  "signature": "Spindle",
  "easy": {
   "attr": "ventus",
   "upgrades": 0,
   "toys": [
    {
     "id": "dc_sp06_24",
     "attr": "ventus",
     "name": "Spindle"
    },
    {
     "id": "bb_44",
     "attr": "aquos",
     "name": "Stinglash"
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
     "id": "dc_sp06_24",
     "attr": "ventus",
     "name": "Spindle"
    },
    {
     "id": "bb_44",
     "attr": "aquos",
     "name": "Stinglash"
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
     "id": "dc_sp06_24",
     "attr": "ventus",
     "name": "Spindle"
    },
    {
     "id": "bb_44",
     "attr": "aquos",
     "name": "Stinglash"
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
  "signature": "Gargonoid",
  "easy": {
   "attr": "aquos",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_52",
     "attr": "aquos",
     "name": "Gargonoid"
    },
    {
     "id": "bb_60",
     "attr": "subterra",
     "name": "Warius"
    },
    {
     "id": "dc_sp06_21",
     "attr": "aquos",
     "name": "Foxbat"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_131",
     "name": "Gargonoid"
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
     "id": "bb_52",
     "attr": "aquos",
     "name": "Gargonoid"
    },
    {
     "id": "bb_60",
     "attr": "subterra",
     "name": "Warius"
    },
    {
     "id": "dc_sp06_21",
     "attr": "aquos",
     "name": "Foxbat"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_131",
     "name": "Gargonoid"
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
     "id": "bb_52",
     "attr": "aquos",
     "name": "Gargonoid"
    },
    {
     "id": "bb_60",
     "attr": "subterra",
     "name": "Warius"
    },
    {
     "id": "dc_sp06_21",
     "attr": "aquos",
     "name": "Foxbat"
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
  "signature": "Saurus",
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
     "id": "bb_61",
     "attr": "pyrus",
     "name": "Monarus"
    },
    {
     "id": "bt_bee",
     "attr": "pyrus",
     "name": "Bee Striker"
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
     "id": "bb_41",
     "attr": "pyrus",
     "name": "Saurus"
    },
    {
     "id": "bb_61",
     "attr": "pyrus",
     "name": "Monarus"
    },
    {
     "id": "bt_bee",
     "attr": "pyrus",
     "name": "Bee Striker"
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
     "id": "bb_41",
     "attr": "pyrus",
     "name": "Saurus"
    },
    {
     "id": "bb_61",
     "attr": "pyrus",
     "name": "Monarus"
    },
    {
     "id": "bt_bee",
     "attr": "pyrus",
     "name": "Bee Striker"
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
 "rocco": {
  "name": "Rocco",
  "species": "Vestal",
  "attrs": [
   "darkus",
   "ventus",
   "subterra"
  ],
  "signature": "Fencer",
  "easy": {
   "attr": "darkus",
   "upgrades": 0,
   "toys": [
    {
     "id": "dc_sp06_20",
     "attr": "darkus",
     "name": "Fencer"
    },
    {
     "id": "bb_40",
     "attr": "ventus",
     "name": "Robotallion"
    },
    {
     "id": "bb_52",
     "attr": "subterra",
     "name": "Gargonoid"
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
     "id": "dc_sp06_20",
     "attr": "darkus",
     "name": "Fencer"
    },
    {
     "id": "bb_40",
     "attr": "ventus",
     "name": "Robotallion"
    },
    {
     "id": "bb_52",
     "attr": "subterra",
     "name": "Gargonoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_120",
     "name": "Robotallion"
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
     "id": "dc_sp06_20",
     "attr": "darkus",
     "name": "Fencer"
    },
    {
     "id": "bb_40",
     "attr": "ventus",
     "name": "Robotallion"
    },
    {
     "id": "bb_52",
     "attr": "subterra",
     "name": "Gargonoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_120",
     "name": "Robotallion"
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
  "name": "Otto",
  "species": "Vestal",
  "attrs": [
   "darkus",
   "aquos",
   "haos"
  ],
  "signature": "Laserman",
  "easy": {
   "attr": "darkus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_46",
     "attr": "darkus",
     "name": "Laserman"
    },
    {
     "id": "bb_56",
     "attr": "aquos",
     "name": "Manion"
    },
    {
     "id": "dc_sp06_25",
     "attr": "haos",
     "name": "Klawgor"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_126",
     "name": "Laserman"
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
     "id": "bb_46",
     "attr": "darkus",
     "name": "Laserman"
    },
    {
     "id": "bb_56",
     "attr": "aquos",
     "name": "Manion"
    },
    {
     "id": "dc_sp06_25",
     "attr": "haos",
     "name": "Klawgor"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_126",
     "name": "Laserman"
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
     "id": "bb_46",
     "attr": "darkus",
     "name": "Laserman"
    },
    {
     "id": "bb_56",
     "attr": "aquos",
     "name": "Manion"
    },
    {
     "id": "dc_sp06_25",
     "attr": "haos",
     "name": "Klawgor"
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
  "signature": "Warius",
  "easy": {
   "attr": "haos",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_60",
     "attr": "haos",
     "name": "Warius"
    },
    {
     "id": "dc_sp06_24",
     "attr": "haos",
     "name": "Spindle"
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
     "id": "bb_60",
     "attr": "haos",
     "name": "Warius"
    },
    {
     "id": "dc_sp06_24",
     "attr": "haos",
     "name": "Spindle"
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
     "id": "dc_sp06_24",
     "attr": "haos",
     "name": "Spindle"
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
 "melissa": {
  "name": "Melissa",
  "species": "Human",
  "attrs": [
   "pyrus",
   "darkus",
   "aquos"
  ],
  "signature": "Serpenoid",
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
     "id": "bb_58",
     "attr": "darkus",
     "name": "Ravenoid"
    },
    {
     "id": "dc_sp06_20",
     "attr": "aquos",
     "name": "Fencer"
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
     "id": "bb_42",
     "attr": "pyrus",
     "name": "Serpenoid"
    },
    {
     "id": "bb_58",
     "attr": "darkus",
     "name": "Ravenoid"
    },
    {
     "id": "dc_sp06_20",
     "attr": "aquos",
     "name": "Fencer"
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
     "id": "bb_42",
     "attr": "pyrus",
     "name": "Serpenoid"
    },
    {
     "id": "bb_58",
     "attr": "darkus",
     "name": "Ravenoid"
    },
    {
     "id": "dc_sp06_20",
     "attr": "aquos",
     "name": "Fencer"
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
  "signature": "Manion",
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
     "id": "bb_50",
     "attr": "darkus",
     "name": "Terrorclaw"
    },
    {
     "id": "dc_sp06_23",
     "attr": "haos",
     "name": "Scraper"
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
     "id": "bb_56",
     "attr": "pyrus",
     "name": "Manion"
    },
    {
     "id": "bb_50",
     "attr": "darkus",
     "name": "Terrorclaw"
    },
    {
     "id": "dc_sp06_23",
     "attr": "haos",
     "name": "Scraper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_132",
     "name": "Manion"
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
     "id": "bb_56",
     "attr": "pyrus",
     "name": "Manion"
    },
    {
     "id": "bb_50",
     "attr": "darkus",
     "name": "Terrorclaw"
    },
    {
     "id": "dc_sp06_23",
     "attr": "haos",
     "name": "Scraper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_132",
     "name": "Manion"
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
  "signature": "Bee Striker",
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bt_bee",
     "attr": "pyrus",
     "name": "Bee Striker"
    },
    {
     "id": "bb_41",
     "attr": "darkus",
     "name": "Saurus"
    },
    {
     "id": "bb_44",
     "attr": "ventus",
     "name": "Stinglash"
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
     "id": "bt_bee",
     "attr": "pyrus",
     "name": "Bee Striker"
    },
    {
     "id": "bb_41",
     "attr": "darkus",
     "name": "Saurus"
    },
    {
     "id": "bb_44",
     "attr": "ventus",
     "name": "Stinglash"
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
     "id": "bt_bee",
     "attr": "pyrus",
     "name": "Bee Striker"
    },
    {
     "id": "bb_41",
     "attr": "darkus",
     "name": "Saurus"
    },
    {
     "id": "bb_44",
     "attr": "ventus",
     "name": "Stinglash"
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
  "name": "Ellie",
  "species": "Vestal",
  "attrs": [
   "aquos",
   "subterra"
  ],
  "signature": "Terrorclaw",
  "easy": {
   "attr": "aquos",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_50",
     "attr": "aquos",
     "name": "Terrorclaw"
    },
    {
     "id": "bb_25",
     "attr": "subterra",
     "name": "Reaper"
    },
    {
     "id": "bb_60",
     "attr": "aquos",
     "name": "Warius"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_130",
     "name": "Terrorclaw"
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
     "id": "bb_25",
     "attr": "subterra",
     "name": "Reaper"
    },
    {
     "id": "bb_60",
     "attr": "aquos",
     "name": "Warius"
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
     "id": "bb_50",
     "attr": "aquos",
     "name": "Terrorclaw"
    },
    {
     "id": "bb_25",
     "attr": "subterra",
     "name": "Reaper"
    },
    {
     "id": "bb_60",
     "attr": "aquos",
     "name": "Warius"
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
  "signature": "Griffon",
  "easy": {
   "attr": "haos",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_45",
     "attr": "haos",
     "name": "Griffon"
    },
    {
     "id": "bb_43",
     "attr": "haos",
     "name": "Falconeer"
    },
    {
     "id": "bt_hynoid",
     "attr": "haos",
     "name": "Hynoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_125",
     "name": "Griffon"
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
     "id": "bb_45",
     "attr": "haos",
     "name": "Griffon"
    },
    {
     "id": "bb_43",
     "attr": "haos",
     "name": "Falconeer"
    },
    {
     "id": "bt_hynoid",
     "attr": "haos",
     "name": "Hynoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_125",
     "name": "Griffon"
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
     "id": "bb_45",
     "attr": "haos",
     "name": "Griffon"
    },
    {
     "id": "bb_43",
     "attr": "haos",
     "name": "Falconeer"
    },
    {
     "id": "bt_hynoid",
     "attr": "haos",
     "name": "Hynoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_125",
     "name": "Griffon"
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
  "signature": "Falconeer",
  "easy": {
   "attr": "pyrus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_43",
     "attr": "pyrus",
     "name": "Falconeer"
    },
    {
     "id": "bb_46",
     "attr": "darkus",
     "name": "Laserman"
    },
    {
     "id": "bb_42",
     "attr": "pyrus",
     "name": "Serpenoid"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_123",
     "name": "Falconeer"
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
     "id": "bb_43",
     "attr": "pyrus",
     "name": "Falconeer"
    },
    {
     "id": "bb_46",
     "attr": "darkus",
     "name": "Laserman"
    },
    {
     "id": "bb_42",
     "attr": "pyrus",
     "name": "Serpenoid"
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
     "id": "bb_43",
     "attr": "pyrus",
     "name": "Falconeer"
    },
    {
     "id": "bb_46",
     "attr": "darkus",
     "name": "Laserman"
    },
    {
     "id": "bb_42",
     "attr": "pyrus",
     "name": "Serpenoid"
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
 "anthony": {
  "name": "Anthony",
  "species": "Human",
  "attrs": [
   "aquos",
   "subterra"
  ],
  "signature": "Stinglash",
  "easy": {
   "attr": "aquos",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_44",
     "attr": "aquos",
     "name": "Stinglash"
    },
    {
     "id": "bb_48",
     "attr": "subterra",
     "name": "Fear Ripper"
    },
    {
     "id": "dc_sp06_22",
     "attr": "aquos",
     "name": "Leefram"
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
     "id": "bb_44",
     "attr": "aquos",
     "name": "Stinglash"
    },
    {
     "id": "bb_48",
     "attr": "subterra",
     "name": "Fear Ripper"
    },
    {
     "id": "dc_sp06_22",
     "attr": "aquos",
     "name": "Leefram"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_124",
     "name": "Stinglash"
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
     "id": "bb_44",
     "attr": "aquos",
     "name": "Stinglash"
    },
    {
     "id": "bb_48",
     "attr": "subterra",
     "name": "Fear Ripper"
    },
    {
     "id": "dc_sp06_22",
     "attr": "aquos",
     "name": "Leefram"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_124",
     "name": "Stinglash"
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
