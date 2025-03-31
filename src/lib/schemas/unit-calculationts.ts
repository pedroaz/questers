import { EQUIP_DICT } from '$lib/data/equipments';
import type { SkillInstance } from '$lib/data/skills';
import { STARTER_CLASSES, UnitAttributes, type Unit } from './unit';
import { v4 as uuid4 } from 'uuid';

export class UnitAction {
	unitId: string = '';
	skillInstance?: SkillInstance = undefined;
}

export function resetUnit(unit: Unit) {
	setBaseAttributes(unit);
	setSkills(unit);
	setSkillInstances(unit);
	setEquipBonus(unit);
}
function setBaseAttributes(unit: Unit) {
	const classData = STARTER_CLASSES.find((classData) => classData.class == unit.class);
	if (!classData) {
		throw new Error(`Class ${unit.class} not found`);
	}
	unit.attributes = classData.attributeBonus;
}

function setSkills(unit: Unit) {
	unit.skills = [];

	switch (unit.class) {
		case 'warrior':
			unit.skills.push('slash');
			break;
	}
}
function setSkillInstances(unit: Unit) {
	unit.skillInstances = [];
	unit.skills.forEach((skill) => {
		unit.skillInstances.push({
			id: uuid4(),
			type: skill,
			used: false
		});
	});
}

function addAttributes(unit: Unit, attributes: UnitAttributes) {
	unit.attributes.strength += attributes.strength;
	unit.attributes.leadership += attributes.leadership;
	unit.attributes.agility += attributes.agility;
	unit.attributes.intellect += attributes.intellect;
	unit.attributes.spirit += attributes.spirit;
}

function setEquipBonus(unit: Unit) {
	// TODO: Add equip bonus
	if (unit.weapon) {
		const weaponAttributes = EQUIP_DICT[unit.weapon].bonusAttributes;
		if (!weaponAttributes) return;
		addAttributes(unit, weaponAttributes);
	}
	if (unit.armor) {
		const armorAttributes = EQUIP_DICT[unit.armor].bonusAttributes;
		if (!armorAttributes) return;
		addAttributes(unit, armorAttributes);
	}
	if (unit.trinket) {
		const trinketAttributes = EQUIP_DICT[unit.trinket].bonusAttributes;
		if (!trinketAttributes) return;
		addAttributes(unit, trinketAttributes);
	}
}
