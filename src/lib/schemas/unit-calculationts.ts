import type { SkillInstance } from '$lib/data/skills';
import { log } from '$lib/services/infra/logger';
import { STARTER_CLASSES, type Unit } from './unit';
import { v4 as uuid4 } from 'uuid';

export type Turn = 'player' | 'enemy';

export class CombatState {
	turn: Turn = 'player';
	enemyEndurance: number = 0;

	crewSkills: SkillInstance[] = [];
	enemySkills: SkillInstance[] = [];

	totalCrewPower: number = 0;
	totalCrewDefense: number = 0;

	totalEnemyPower: number = 0;
	totalEnemyDefense: number = 0;
}

export function recalculateUnit(unit: Unit) {
	log(`Recalculating Unit: ${unit.name} ${unit.class}`);
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
