import { EQUIP_DICT } from '$lib/data/equipments';
import type { Unit } from '$lib/schemas/unit';

export function getMaxHp(unit: Unit) {
	let res = 0;
	let equipHealthBonus = 0;
	unit.equipments.forEach((id) => {
		const equip = EQUIP_DICT[id];
		if (equip.bonusHealth) {
			equipHealthBonus += equip.bonusHealth;
		}
	});
	res += equipHealthBonus;
	res += unit.baseStats.maxHp;
	res += unit.baseAttributes.vitality * 2;
	return res;
}

export function getMaxMana(unit: Unit) {
	let res = 0;
	let equipMpBonus = 0;
	unit.equipments.forEach((id) => {
		const equip = EQUIP_DICT[id];
		if (equip.bonusMana) {
			equipMpBonus += equip.bonusMana;
		}
	});
	res += equipMpBonus;
	res += unit.baseStats.maxMana;
	res += unit.baseAttributes.intellect * 2;
	return res;
}

export function getAttack(unit: Unit) {
	let res = 0;
	let equipAttackBonus = 0;
	unit.equipments.forEach((id) => {
		const equip = EQUIP_DICT[id];
		if (equip.bonusAttack) {
			equipAttackBonus += equip.bonusAttack;
		}
	});
	res += equipAttackBonus;
	res += unit.baseAttributes.strength;
	return res;
}

export function setFullHp(unit: Unit) {
	unit.hp = getMaxHp(unit);
}

export function setFullMana(unit: Unit) {
	unit.mana = getMaxMana(unit);
}
