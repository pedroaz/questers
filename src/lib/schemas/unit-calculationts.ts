// import { EQUIP_DICT } from '$lib/data/equipment/equipment-storage';
// import { SkillId, type SkillInstance } from '$lib/data/skills/skills-models';
// import { createSkillInstance } from '$lib/domain/factories/object-factory';
// import type { UnitAttributes } from '$lib/domain/unit/attribute';
// import type { Unit } from '$lib/domain/unit/unit';

import type { SkillInstance } from '$lib/data/skills/skills-models';

export class UnitAction {
	unitId: string = '';
	skillInstance?: SkillInstance = undefined;
}

// export function resetUnit(unit: Unit) {
// 	resetSkillInstances(unit);
// 	resetClassSkills(unit);
// 	resetEquipBonus(unit);
// }

// function resetClassSkills(unit: Unit) {
// 	unit.skills = [];
// 	unit.skills.push(SkillId.Attack);
// 	unit.skills.push(SkillId.Defend);
// 	unit.skills.push(SkillId.Defend);
// 	unit.skills.push(SkillId.Attack);
// }
// function resetSkillInstances(unit: Unit) {
// 	unit.skillInstances = [];
// 	unit.skills.forEach((skill) => {
// 		const skillInstance = createSkillInstance(skill);
// 		unit.skillInstances.push(skillInstance);
// 	});
// }

// function addAttributes(unit: Unit, attributes: UnitAttributes) {
// 	unit.attributes.strength += attributes.strength;
// 	unit.attributes.leadership += attributes.leadership;
// 	unit.attributes.agility += attributes.agility;
// 	unit.attributes.intellect += attributes.intellect;
// 	unit.attributes.spirit += attributes.spirit;
// }

// function resetEquipBonus(unit: Unit) {
// 	// TODO: Add equip bonus
// 	if (unit.weapon) {
// 		const weaponAttributes = EQUIP_DICT[unit.weapon].bonusAttributes;
// 		if (!weaponAttributes) return;
// 		addAttributes(unit, weaponAttributes);
// 	}
// 	if (unit.armor) {
// 		const armorAttributes = EQUIP_DICT[unit.armor].bonusAttributes;
// 		if (!armorAttributes) return;
// 		addAttributes(unit, armorAttributes);
// 	}
// 	if (unit.trinket) {
// 		const trinketAttributes = EQUIP_DICT[unit.trinket].bonusAttributes;
// 		if (!trinketAttributes) return;
// 		addAttributes(unit, trinketAttributes);
// 	}
// }
