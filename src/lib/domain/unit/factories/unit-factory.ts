import { v4 as uuid4 } from 'uuid';

import { UnitType, type Unit } from '../unit';

import { CLASSES_DICT } from '$lib/data/classes/classes-storage';
import type { MonsterId } from '$lib/data/monsters/monsters-models';
import { MONSTER_DICT } from '$lib/data/monsters/monsters-storage';
import { SKILLS_DICT } from '$lib/data/skills/skills-storage';
import { getStartingParameters } from '$lib/states/game-state.svelte';
import { addUnitToWorld } from '$lib/states/units-state.svelte';

export function generatePlayer(): Unit {
	const { classId, godId } = getStartingParameters();
	const classData = CLASSES_DICT[classId];

	const unit: Unit = {
		uuid: uuid4(),
		name: 'Nioshi',
		type: UnitType.Player,
		level: 1,
		attributes: {
			strength: 0,
			leadership: 0,
			agility: 0,
			intellect: 0,
			spirit: 0
		},
		skills: [],
		skillInstances: [],
		startingHp: 0,
		bodyImage: classData.bodyImage,
		iconImage: classData.iconImage,
		weapon: null,
		armor: null,
		trinket: null,
		classesBonuses: [classId],
		godBonuses: [godId]
	};
	addUnitToWorld(unit);
	return unit;
}

export function generateCompanion() {}

export function generateMonster(monsterId: MonsterId, level: number) {
	const unit = MONSTER_DICT[monsterId].unit;
	unit.level = level;
	unit.skills.forEach((skill) => {
		unit.skillInstances.push({
			uuid: uuid4(),
			id: skill,
			used: false,
			data: SKILLS_DICT[skill]
		});
	});
	addUnitToWorld(unit);

	return unit;
}
