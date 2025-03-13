import { log } from '$lib/services/infra/logger';
import { STARTER_CLASSES, type Unit } from './unit';

export function recalculateUnit(unit: Unit) {
	log(`Recalculating Unit: ${unit.name} ${unit.class}`);
	setBaseAttributes(unit);
	setSkills(unit);
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
}
