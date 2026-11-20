// Control, the 4th stat (Billy, Nov 20): how accurately a Bakugan is thrown.
// Base values come from the DS game (NDS tab of stats_source.xlsx). Bakugan that weren't in the DS game start at 2.
// A catalog entry's own stats.control (if you add one to the pack) wins over this table.
export const CONTROL = {"bb_00": 2, "bb_01": 3, "bb_04": 1, "bb_05": 1, "bb_06": 4, "bb_07": 4, "bb_08": 4, "bb_09": 3, "bb_10": 3, "bb_11": 3, "bb_12": 4, "bb_13": 1, "bb_14": 2, "bb_25": 4, "bb_26": 2, "bb_27": 4, "bb_28": 2, "bb_29": 4, "bb_30": 1, "bb_39": 1, "bb_40": 2, "bb_41": 1, "bb_42": 1, "bb_43": 1, "bb_44": 1, "bb_45": 1, "bb_46": 1, "bb_47": 1, "bb_48": 1, "bb_49": 1, "bb_50": 2, "bb_52": 2, "bb_56": 1, "bb_58": 1, "bb_61": 1, "bb_62": 2, "bb_63": 3, "bb_64": 1, "bb_65": 2};
export const CONTROL_DEFAULT = 2;
export const STATS = ['speed', 'defense', 'magnet', 'control'];
export const controlOf = t => (t && t.stats && t.stats.control) ?? CONTROL[t && t.id] ?? CONTROL_DEFAULT;
// a Bakugan's base stats with Control filled in
export const baseStats = t => ({ speed: 3, defense: 3, magnet: 3, ...((t && t.stats) || {}), control: controlOf(t) });
