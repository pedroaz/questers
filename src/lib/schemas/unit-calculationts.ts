import type { SkillInstance } from '$lib/data/skills';
import { STARTER_CLASSES, type Unit } from './unit';
import { v4 as uuid4 } from 'uuid';

export class UnitAction {
	unitId: string = '';
	skillInstance?: SkillInstance = undefined;
}

export function recalculateUnit(unit: Unit) {
	setBaseAttributes(unit);
	setSkills(unit);
	setSkillInstances(unit);
}
function setBaseAttributes(unit: Unit) {
	const classData = STARTER_CLASSES.find((classData) => classData.class == unit.class);
	if (!classData) {
		throw new Error(`Class ${unit.class} not found`);
	}
	unit.baseAttributes = classData.attributeBonus;
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
