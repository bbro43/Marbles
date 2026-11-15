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
     "id": "bb_43",
     "attr": "pyrus",
     "name": "Falconeer"
    },
    {
     "id": "bb_42",
     "attr": "pyrus",
     "name": "Serpenoid"
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
     "id": "bb_46",
     "attr": "pyrus",
     "name": "Laserman"
    },
    {
     "id": "bb_45",
     "attr": "pyrus",
     "name": "Griffon"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_137",
     "name": "Omega Leonidas"
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
     "id": "bb_28",
     "attr": "pyrus",
     "name": "Fortress"
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
     "id": "bb_47",
     "attr": "haos",
     "name": "Centipoid"
    },
    {
     "id": "bb_41",
     "attr": "haos",
     "name": "Saurus"
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
     "id": "bb_29",
     "attr": "haos",
     "name": "Tentaclear"
    },
    {
     "id": "bb_46",
     "attr": "haos",
     "name": "Laserman"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_137",
     "name": "Omega Leonidas"
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
     "id": "dc_sp05_00",
     "attr": "haos",
     "name": "Mega Nemus"
    },
    {
     "id": "bb_29",
     "attr": "haos",
     "name": "Tentaclear"
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
     "id": "bb_39",
     "attr": "aquos",
     "name": "Juggernoid"
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
     "id": "bb_06",
     "attr": "aquos",
     "name": "Preyas"
    },
    {
     "id": "bb_27",
     "attr": "aquos",
     "name": "Sirenoid"
    },
    {
     "id": "bb_49",
     "attr": "aquos",
     "name": "Siege"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_137",
     "name": "Omega Leonidas"
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
     "id": "bb_06",
     "attr": "aquos",
     "name": "Preyas"
    },
    {
     "id": "dc_sp02_00",
     "attr": "aquos",
     "name": "Dual Elfin"
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
     "id": "bb_50",
     "attr": "subterra",
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
     "id": "bb_26",
     "attr": "subterra",
     "name": "Cycloid"
    },
    {
     "id": "bb_49",
     "attr": "subterra",
     "name": "Siege"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_137",
     "name": "Omega Leonidas"
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
     "id": "dc_sp04_00",
     "attr": "subterra",
     "name": "Thunder Wilda"
    },
    {
     "id": "bb_26",
     "attr": "subterra",
     "name": "Cycloid"
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
     "id": "bb_30",
     "attr": "ventus",
     "name": "Harpus"
    },
    {
     "id": "bb_46",
     "attr": "ventus",
     "name": "Laserman"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_137",
     "name": "Omega Leonidas"
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
     "id": "dc_sp01_00",
     "attr": "ventus",
     "name": "Cosmic Ingram"
    },
    {
     "id": "bb_30",
     "attr": "ventus",
     "name": "Harpus"
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
     "id": "bb_39",
     "attr": "subterra",
     "name": "Juggernoid"
    },
    {
     "id": "bb_40",
     "attr": "subterra",
     "name": "Robotallion"
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
     "id": "bb_49",
     "attr": "subterra",
     "name": "Siege"
    },
    {
     "id": "bb_45",
     "attr": "subterra",
     "name": "Griffon"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_137",
     "name": "Omega Leonidas"
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
     "id": "bb_60",
     "attr": "subterra",
     "name": "Warius"
    },
    {
     "id": "bb_28",
     "attr": "subterra",
     "name": "Fortress"
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
   "attr": "darkus",
   "upgrades": 5,
   "toys": [
    {
     "id": "bb_48",
     "attr": "darkus",
     "name": "Fear Ripper"
    },
    {
     "id": "bb_49",
     "attr": "darkus",
     "name": "Siege"
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
     "id": "bb_46",
     "attr": "darkus",
     "name": "Laserman"
    },
    {
     "id": "bb_49",
     "attr": "darkus",
     "name": "Siege"
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
     "id": "bb_47",
     "attr": "aquos",
     "name": "Centipoid"
    },
    {
     "id": "bb_42",
     "attr": "aquos",
     "name": "Serpenoid"
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
     "id": "dc_sp07",
     "attr": "aquos",
     "name": "Elico"
    },
    {
     "id": "bb_44",
     "attr": "aquos",
     "name": "Stinglash"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_137",
     "name": "Omega Leonidas"
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
     "id": "dc_sp02",
     "attr": "aquos",
     "name": "Elfin"
    },
    {
     "id": "dc_sp07",
     "attr": "aquos",
     "name": "Elico"
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
     "id": "bb_58",
     "attr": "subterra",
     "name": "Ravenoid"
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
     "id": "ds_137",
     "name": "Omega Leonidas"
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
     "id": "dc_sp04",
     "attr": "subterra",
     "name": "Wilda"
    },
    {
     "id": "bb_46",
     "attr": "subterra",
     "name": "Laserman"
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
     "id": "bb_26",
     "attr": "subterra",
     "name": "Cycloid"
    },
    {
     "id": "dc_sp09",
     "attr": "subterra",
     "name": "Premo Vulcan"
    },
    {
     "id": "bb_49",
     "attr": "subterra",
     "name": "Siege"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_137",
     "name": "Omega Leonidas"
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
     "id": "dc_sp09",
     "attr": "subterra",
     "name": "Premo Vulcan"
    },
    {
     "id": "dc_sp04",
     "attr": "subterra",
     "name": "Wilda"
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
     "id": "bb_46",
     "attr": "ventus",
     "name": "Laserman"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_137",
     "name": "Omega Leonidas"
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
     "id": "dc_sp01",
     "attr": "ventus",
     "name": "Ingram"
    },
    {
     "id": "dc_sp11",
     "attr": "ventus",
     "name": "Altair"
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
     "id": "bb_47",
     "attr": "haos",
     "name": "Centipoid"
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
     "id": "bb_29",
     "attr": "haos",
     "name": "Tentaclear"
    },
    {
     "id": "dc_sp08",
     "attr": "haos",
     "name": "Brontes"
    },
    {
     "id": "bb_46",
     "attr": "haos",
     "name": "Laserman"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_137",
     "name": "Omega Leonidas"
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
     "id": "dc_sp06",
     "attr": "haos",
     "name": "Helios"
    },
    {
     "id": "dc_sp08",
     "attr": "haos",
     "name": "Brontes"
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
     "id": "ds_137",
     "name": "Omega Leonidas"
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
     "id": "bb_47",
     "attr": "aquos",
     "name": "Centipoid"
    },
    {
     "id": "bb_39",
     "attr": "aquos",
     "name": "Juggernoid"
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
     "id": "bb_27",
     "attr": "aquos",
     "name": "Sirenoid"
    },
    {
     "id": "dc_sp07",
     "attr": "aquos",
     "name": "Elico"
    },
    {
     "id": "bb_49",
     "attr": "aquos",
     "name": "Siege"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_137",
     "name": "Omega Leonidas"
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
     "id": "dc_sp02_00",
     "attr": "aquos",
     "name": "Dual Elfin"
    },
    {
     "id": "bb_08",
     "attr": "aquos",
     "name": "Preyas II (Diablo)"
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
 "masquerade": {
  "attr": "darkus",
  "easy": {
   "attr": "darkus",
   "upgrades": 0,
   "toys": [
    {
     "id": "bb_25",
     "attr": "darkus",
     "name": "Reaper"
    },
    {
     "id": "bb_13",
     "attr": "darkus",
     "name": "Hydranoid"
    },
    {
     "id": "bb_48",
     "attr": "darkus",
     "name": "Fear Ripper"
    }
   ],
   "gates": {
    "gold": {
     "id": "ds_106",
     "name": "Preyas's"
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
     "id": "bb_14",
     "attr": "darkus",
     "name": "Dual Hydranoid"
    },
    {
     "id": "dc_sp03_00",
     "attr": "darkus",
     "name": "Midnight Percival"
    },
    {
     "id": "dc_sp10",
     "attr": "darkus",
     "name": "Hades"
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
     "id": "bb_52",
     "attr": "darkus",
     "name": "Gargonoid"
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
     "id": "ds_106",
     "name": "Preyas's"
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
     "id": "bb_49",
     "attr": "darkus",
     "name": "Siege"
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
     "id": "bb_65",
     "attr": "darkus",
     "name": "Battle Ax Vladitor"
    },
    {
     "id": "dc_sp03",
     "attr": "darkus",
     "name": "Percival"
    },
    {
     "id": "dc_sp10",
     "attr": "darkus",
     "name": "Hades"
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
 }
};
