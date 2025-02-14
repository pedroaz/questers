import { EQUIP_DICT } from '$lib/data/equipments';
import type { Unit } from '$lib/schemas/unit';

export function getMaxHp(unit: Unit) {
	let equipHealthBonus = 0;
	unit.equipments.forEach((id) => {
		const equip = EQUIP_DICT[id];
		if (equip.bonusHealth) {
			equipHealthBonus += equip.bonusHealth;
		}
	});
	const total = unit.baseStats.maxHp + equipHealthBonus + unit.baseAttributes.vitality * 2;
	return total;
}

export function getMaxMana(unit: Unit) {
	let equipMpBonus = 0;
	unit.equipments.forEach((id) => {
		const equip = EQUIP_DICT[id];
		if (equip.bonusMana) {
			equipMpBonus += equip.bonusMana;
		}
	});
	const total = unit.baseStats.maxMana + equipMpBonus + unit.baseAttributes.intellect * 2;
	return total;
}

export function getAttack(unit: Unit) {
	let equipAttackBonus = 0;
	unit.equipments.forEach((id) => {
		const equip = EQUIP_DICT[id];
		if (equip.bonusAttack) {
			equipAttackBonus += equip.bonusAttack;
		}
	});
	const total = unit.baseAttributes.strength + equipAttackBonus;
	return total;
}

export function setFullHp(unit: Unit) {
	unit.hp = getMaxHp(unit);
}

export function setFullMana(unit: Unit) {
	unit.mana = getMaxMana(unit);
}
