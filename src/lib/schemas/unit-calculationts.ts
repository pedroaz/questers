import { STARTER_CLASSES, type Unit } from './unit';

export function recalculateUnit(unit: Unit) {
	// Set base attributes based on class
	const classData = STARTER_CLASSES.find((classData) => classData.class == unit.class);
	if (!classData) {
		throw new Error(`Class ${unit.class} not found`);
	}
	unit.baseAttributes = classData.attributeBonus;
	unit.maxHp = unit.baseAttributes.stamina + 2;
}

export function healFully(unit: Unit) {
	unit.hp = unit.maxHp;
}
