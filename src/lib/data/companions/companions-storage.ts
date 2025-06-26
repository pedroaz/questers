import type { CompanionId, CompanionData } from './companions-models';
import companionsFile from './companions.json';
import type { ClassId } from '../classes/classes-models';
import type { SkillId } from '../skills/skills-models';

import type { Attribute } from '$lib/domain/unit/attribute';

export let COMPANION_DICT: Record<CompanionId, CompanionData>;

export function loadCompanionDict() {
	COMPANION_DICT = companionsFile.reduce(
		(dict, companion) => {
			dict[companion.id as CompanionId] = {
				...companion,
				id: companion.id as CompanionId,
				description: companion.description || '',
				class: companion.class as ClassId,
				levelUps: companion.levelUps.map((attr) => attr as Attribute),
				skills: companion.skills.map((skill) => skill as SkillId)
			};
			return dict;
		},
		{} as Record<CompanionId, CompanionData>
	);
}

// skills: monster.unit.skills.map((skill) => skill as SkillId),
