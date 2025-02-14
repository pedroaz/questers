import { Unit, UnitClass, UnitStats } from '$lib/schemas/unit';

export function getStatsBonus(unit: Unit): UnitStats {
	switch (unit.class) {
		case UnitClass.Warrior:
			return warriorStatsBonus(unit);
		default:
			return defaultStatsBonus(unit);
	}
}

function warriorStatsBonus(unit: Unit): UnitStats {
	const res = new UnitStats();
	res.maxHp += unit.baseAttributes.strength * 2;
	res.maxMana += 0;
	return res;
}

function defaultStatsBonus(unit: Unit): UnitStats {
	const res = new UnitStats();
	res.maxHp += unit.level * 2;
	res.maxMana += unit.level * 1;
	return res;
}
