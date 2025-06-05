import { v4 as uuid4 } from 'uuid';

import type { Unit } from './unit';

import { SKILLS_DICT } from '$lib/data/skills/skills-storage';

export function resetUnitToNewDay(unit: Unit) {
	unit.skillInstances = [];
	unit.skills.forEach((skill) => {
		unit.skillInstances.push({
			uuid: uuid4(),
			used: false,
			data: SKILLS_DICT[skill]
		});
	});
}
