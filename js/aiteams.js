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
     "id": "ds_101",
     "name": "Dragonoid"
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
     "id": "ds_101",
     "name": "Dragonoid"
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
     "id": "ds_501",
     "name": "No Backsies"
    }
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
     "id": "ds_103",
     "name": "Tigrerra"
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
     "id": "ds_103",
     "name": "Tigrerra"
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
     "id": "ds_501",
     "name": "No Backsies"
    }
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
     "id": "ds_105",
     "name": "Preyas"
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
     "id": "ds_105",
     "name": "Preyas"
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
     "id": "ds_501",
     "name": "No Backsies"
    }
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
     "id": "ds_107",
     "name": "Gorem"
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
     "id": "ds_107",
     "name": "Gorem"
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
     "id": "ds_501",
     "name": "No Backsies"
    }
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
     "id": "ds_109",
     "name": "Skyress"
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
     "id": "ds_109",
     "name": "Skyress"
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
     "id": "ds_501",
     "name": "No Backsies"
    }
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
     "id": "ds_501",
     "name": "No Backsies"
    }
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
     "id": "ds_501",
     "name": "No Backsies"
    }
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
     "id": "ds_501",
     "name": "No Backsies"
    }
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
     "id": "ds_501",
     "name": "No Backsies"
    }
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
     "id": "ds_501",
     "name": "No Backsies"
    }
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
     "id": "ds_501",
     "name": "No Backsies"
    }
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
     "id": "ds_501",
     "name": "No Backsies"
    }
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
     "id": "ds_501",
     "name": "No Backsies"
    }
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
     "id": "ds_501",
     "name": "No Backsies"
    }
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
     "id": "ds_111",
     "name": "Hydranoid"
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
     "id": "ds_111",
     "name": "Hydranoid"
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
     "id": "ds_501",
     "name": "No Backsies"
    }
   }
  }
 },
 "marduk": {
  "attr": "darkus",
  "easy": {
   "attr": "darkus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_64",
     "attr": "darkus",
     "name": "Vladitor"
    },
    {
     "id": "bb_52",
     "attr": "darkus",
     "name": "Gargonoid"
    },
    {
     "id": "bb_48",
     "attr": "darkus",
     "name": "Fear Ripper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_138",
     "name": "Vladitor"
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
   }
  },
  "normal": {
   "attr": "darkus",
   "upgrades": 5,
   "toys": [
    {
     "id": "bb_64",
     "attr": "darkus",
     "name": "Vladitor"
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
     "id": "ds_138",
     "name": "Vladitor"
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
   }
  },
  "hard": {
   "attr": "darkus",
   "upgrades": 10,
   "toys": [
    {
     "id": "bb_65",
     "attr": "darkus",
     "name": "Battle Ax Vladitor"
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
   "trap": {
    "id": "dc_spt00",
    "name": "Scorpion",
    "color": "pyrus",
    "attrs": [
     "pyrus",
     "aquos"
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
     "id": "ds_126",
     "name": "Laserman"
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
   "trap": {
    "id": "dc_spt00",
    "name": "Scorpion",
    "color": "pyrus",
    "attrs": [
     "pyrus",
     "ventus",
     "darkus"
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
     "id": "ds_616",
     "name": "Brushfire"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "trap": {
    "id": "dc_spt00",
    "name": "Scorpion",
    "color": "pyrus",
    "attrs": [
     "pyrus",
     "subterra",
     "aquos",
     "haos"
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
   "trap": {
    "id": "dc_spt01",
    "name": "Hylash",
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
   "trap": {
    "id": "dc_spt01",
    "name": "Hylash",
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
   "trap": {
    "id": "dc_spt01",
    "name": "Hylash",
    "color": "ventus",
    "attrs": [
     "ventus",
     "aquos",
     "pyrus",
     "haos"
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
   "trap": {
    "id": "dc_spt02",
    "name": "Tripod Epsilon",
    "color": "aquos",
    "attrs": [
     "aquos",
     "pyrus"
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
     "id": "ds_105",
     "name": "Preyas"
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
   "trap": {
    "id": "dc_spt02",
    "name": "Tripod Epsilon",
    "color": "aquos",
    "attrs": [
     "aquos",
     "subterra",
     "darkus"
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
     "id": "ds_105",
     "name": "Preyas"
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
   "trap": {
    "id": "dc_spt02",
    "name": "Tripod Epsilon",
    "color": "aquos",
    "attrs": [
     "aquos",
     "subterra",
     "darkus",
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
   "trap": {
    "id": "dc_spt03",
    "name": "Falcon Fly",
    "color": "darkus",
    "attrs": [
     "darkus",
     "subterra"
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
   "trap": {
    "id": "dc_spt03",
    "name": "Falcon Fly",
    "color": "darkus",
    "attrs": [
     "darkus",
     "haos",
     "ventus"
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
   "trap": {
    "id": "dc_spt03",
    "name": "Falcon Fly",
    "color": "darkus",
    "attrs": [
     "darkus",
     "subterra",
     "ventus",
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
     "id": "ds_130",
     "name": "Terrorclaw"
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
   "trap": {
    "id": "dc_spt04",
    "name": "Baliton",
    "color": "subterra",
    "attrs": [
     "subterra",
     "aquos"
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
   "trap": {
    "id": "dc_spt04",
    "name": "Baliton",
    "color": "subterra",
    "attrs": [
     "subterra",
     "aquos",
     "pyrus"
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
   "trap": {
    "id": "dc_spt04",
    "name": "Baliton",
    "color": "subterra",
    "attrs": [
     "subterra",
     "haos",
     "darkus",
     "aquos"
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
   "trap": {
    "id": "dc_spt05",
    "name": "Piercian",
    "color": "haos",
    "attrs": [
     "haos",
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
   "trap": {
    "id": "dc_spt05",
    "name": "Piercian",
    "color": "haos",
    "attrs": [
     "haos",
     "subterra",
     "aquos"
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
     "id": "ds_126",
     "name": "Laserman"
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
   "trap": {
    "id": "dc_spt05",
    "name": "Piercian",
    "color": "haos",
    "attrs": [
     "haos",
     "darkus",
     "subterra",
     "ventus"
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
     "id": "bb_43",
     "attr": "pyrus",
     "name": "Falconeer"
    },
    {
     "id": "bb_52",
     "attr": "pyrus",
     "name": "Gargonoid"
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
     "id": "bb_46",
     "attr": "pyrus",
     "name": "Laserman"
    },
    {
     "id": "bb_25",
     "attr": "pyrus",
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
   "trap": {
    "id": "dc_spt06",
    "name": "Metalfencer",
    "color": "pyrus",
    "attrs": [
     "pyrus",
     "ventus",
     "darkus"
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
     "id": "ds_616",
     "name": "Brushfire"
    },
    "green": {
     "id": "ds_501",
     "name": "No Backsies"
    }
   },
   "trap": {
    "id": "dc_spt06",
    "name": "Metalfencer",
    "color": "pyrus",
    "attrs": [
     "pyrus",
     "subterra",
     "aquos",
     "haos"
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
   "trap": {
    "id": "dc_spt07",
    "name": "Tripod Theta",
    "color": "aquos",
    "attrs": [
     "aquos",
     "subterra"
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
     "id": "bb_25",
     "attr": "aquos",
     "name": "Reaper"
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
   "trap": {
    "id": "dc_spt07",
    "name": "Tripod Theta",
    "color": "aquos",
    "attrs": [
     "aquos",
     "darkus",
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
     "id": "ds_126",
     "name": "Laserman"
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
   "trap": {
    "id": "dc_spt07",
    "name": "Tripod Theta",
    "color": "aquos",
    "attrs": [
     "aquos",
     "subterra",
     "haos",
     "darkus"
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
     "id": "bb_61",
     "attr": "haos",
     "name": "Monarus"
    },
    {
     "id": "bb_46",
     "attr": "haos",
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
     "id": "bb_52",
     "attr": "subterra",
     "name": "Gargonoid"
    },
    {
     "id": "bb_50",
     "attr": "subterra",
     "name": "Terrorclaw"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_130",
     "name": "Terrorclaw"
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
   "trap": {
    "id": "dc_spt09",
    "name": "Hexados",
    "color": "subterra",
    "attrs": [
     "subterra",
     "aquos"
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
   "trap": {
    "id": "dc_spt09",
    "name": "Hexados",
    "color": "subterra",
    "attrs": [
     "subterra",
     "aquos",
     "pyrus"
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
   "trap": {
    "id": "dc_spt09",
    "name": "Hexados",
    "color": "subterra",
    "attrs": [
     "subterra",
     "haos",
     "darkus",
     "aquos"
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
     "id": "bb_48",
     "attr": "darkus",
     "name": "Fear Ripper"
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
     "id": "bb_60",
     "attr": "darkus",
     "name": "Warius"
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
     "id": "bb_61",
     "attr": "ventus",
     "name": "Monarus"
    },
    {
     "id": "bb_45",
     "attr": "ventus",
     "name": "Griffon"
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
  }
 }
};
