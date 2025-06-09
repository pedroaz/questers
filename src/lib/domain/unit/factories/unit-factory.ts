import { v4 as uuid4 } from 'uuid';

import { UnitType, type Unit } from '../unit';
import { resetUnitToNewDay } from '../unit-reseter';

import type { ClassData } from '$lib/data/classes/classes-models';
import { CLASSES_DICT } from '$lib/data/classes/classes-storage';
import type { CompanionId } from '$lib/data/companions/companions-models';
import { COMPANION_DICT } from '$lib/data/companions/companions-storage';
import type { MonsterId } from '$lib/data/monsters/monsters-models';
import { MONSTER_DICT } from '$lib/data/monsters/monsters-storage';
import { SKILLS_DICT } from '$lib/data/skills/skills-storage';
import { getStartingParameters } from '$lib/states/game-state.svelte';
import { addUnitToWorld } from '$lib/states/units-state.svelte';

export function generatePlayer(): Unit {
	const { classId } = getStartingParameters();
	const classData = CLASSES_DICT[classId];

	const unit: Unit = {
		uuid: uuid4(),
		name: 'You',
		type: UnitType.Player,
		level: 1,
		attributes: {
			strength: 0,
			leadership: 0,
			agility: 0,
			intellect: 0,
			spirit: 0
		},
		power: 0,
		skills: classData.initialSkills,
		skillInstances: [],
		startingHp: 0,
		bodyImage: classData.bodyImage,
		iconImage: classData.iconImage,
		weapon: null,
		offhand: null,
		trinket: null,
		helmet: null,
		armor: null,
		boots: null,
		classesBonuses: [classId],
		action: null
	};
	addClassAttributes(unit, classData);
	resetUnitToNewDay(unit);
	addUnitToWorld(unit);
	return unit;
}

function addClassAttributes(unit: Unit, classData: ClassData) {
	unit.attributes.strength = classData.attributes.strength;
	unit.attributes.leadership = classData.attributes.leadership;
	unit.attributes.agility = classData.attributes.agility;
	unit.attributes.intellect = classData.attributes.intellect;
	unit.attributes.spirit = classData.attributes.spirit;
}

export function generateCompanion(companionId: CompanionId) {
	const companionData = COMPANION_DICT[companionId];
	const classData = CLASSES_DICT[companionData.class];
	const unit: Unit = {
		uuid: uuid4(),
		name: companionData.name,
		type: UnitType.Companion,
		level: 1,
		attributes: {
			strength: 0,
			leadership: 0,
			agility: 0,
			intellect: 0,
			spirit: 0
		},
		power: 0,
		skills: classData.initialSkills,
		skillInstances: [],
		startingHp: 0,
		bodyImage: companionData.image,
		iconImage: '',
		weapon: null,
		offhand: null,
		trinket: null,
		helmet: null,
		armor: null,
		boots: null,
		classesBonuses: [companionData.class],
		action: null
	};
	addClassAttributes(unit, classData);
	resetUnitToNewDay(unit);
	addUnitToWorld(unit);
	return unit;
}

export function generateMonster(monsterId: MonsterId, level: number) {
	const unit = MONSTER_DICT[monsterId].unit;
	unit.level = level;
	unit.skills.forEach((skill) => {
		unit.skillInstances.push({
			uuid: uuid4(),
			used: false,
			data: SKILLS_DICT[skill]
		});
	});
	addUnitToWorld(unit);

	return unit;
}
