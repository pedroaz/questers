import { EQUIP_DICT } from '$lib/data/equipments';
import { SkillInstance } from '$lib/data/skills';
import { createSkillInstance } from '$lib/services/factories/object-factory';
import { refreshWorldUnits } from '$lib/states/game-state.svelte';
import { STARTER_CLASSES, UnitAttributes, type Unit } from './unit';

export class UnitAction {
	unitId: string = '';
	skillInstance?: SkillInstance = undefined;
}

// Should be called on end day / loadout. It resets everything
// For monsters call it in the beginning of the stage
export function resetUnit(unit: Unit) {
	resetSkillInstances(unit);

	if (unit.class != 'monster-normal') {
		setBaseAttributes(unit);
		resetClassSkills(unit);
		resetEquipBonus(unit);
	}
	refreshWorldUnits();
}
function setBaseAttributes(unit: Unit) {
	const classData = STARTER_CLASSES.find((classData) => classData.class == unit.class);
	if (!classData) {
		throw new Error(`Class ${unit.class} not found`);
	}
	unit.attributes = classData.attributeBonus;
}

function resetClassSkills(unit: Unit) {
	unit.skills = [];
	unit.skills.push('attack');
	unit.skills.push('attack');
	unit.skills.push('defend');
	unit.skills.push('defend');
	unit.skills.push('attack');
	switch (unit.class) {
		case 'warrior':
			break;
		case 'explorer':
			unit.skills.push('attack');
			unit.skills.push('defend');
			break;
	}
}
function resetSkillInstances(unit: Unit) {
	unit.skillInstances = [];
	unit.skills.forEach((skill) => {
		const skillInstance = createSkillInstance(skill);
		unit.skillInstances.push(skillInstance);
	});
}

function addAttributes(unit: Unit, attributes: UnitAttributes) {
	unit.attributes.strength += attributes.strength;
	unit.attributes.leadership += attributes.leadership;
	unit.attributes.agility += attributes.agility;
	unit.attributes.intellect += attributes.intellect;
	unit.attributes.spirit += attributes.spirit;
}

function resetEquipBonus(unit: Unit) {
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
