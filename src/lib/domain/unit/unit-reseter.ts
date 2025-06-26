import { v4 as uuid4 } from 'uuid';

import type { Unit } from './unit';

import { SKILLS_DICT } from '$lib/data/skills/skills-storage';

export function resetUnitToNewDay(unit: Unit) {
	if (!unit || !unit.skills) {
		throw new Error('Invalid unit provided to resetUnitToNewDay');
	}

	unit.skillInstances = [];
	unit.skills.forEach((skill) => {
		const skillData = SKILLS_DICT[skill];
		if (!skillData) {
			throw new Error(`Skill data not found for skill: ${skill}`);
		}

		unit.skillInstances.push({
			uuid: uuid4(),
			used: false,
			data: skillData
		});
	});
}
