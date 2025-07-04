import { v4 as uuid4 } from 'uuid';

import type { MonsterData, MonsterId } from './monsters-models';
import monstersFile from './monsters.json';
import type { ArtifactId } from '../artifacts/artifacts-models';
import type { ChestId } from '../chests/chests-models';
import type { SkillId } from '../skills/skills-models';

import type { UnitType } from '$lib/domain/unit/unit';

export let MONSTER_DICT: Record<MonsterId, MonsterData>;

export function loadMonsterDict() {
	MONSTER_DICT = monstersFile.reduce(
		(dict, monster) => {
			dict[monster.id as MonsterId] = {
				id: monster.id as MonsterId,
				description: monster.description,
				chestDrops: monster.chestDrops.map((chestDrop) => {
					return {
						...chestDrop,
						chance: chestDrop.chance as number,
						chestId: chestDrop.chestId as ChestId
					};
				}),
				artifacts: monster.artifacts.map((artifact) => artifact as ArtifactId),
				unit: {
					...monster.unit,
					power: 0,
					uuid: uuid4(),
					level: 0,
					type: monster.unit.type as UnitType,
					skills: monster.unit.skills.map((skill) => skill as SkillId),
					skillInstances: [],
					classes: [],
					action: null,
					monsterId: monster.id as MonsterId,
					companionId: null
				}
			};

			return dict;
		},
		{} as Record<MonsterId, MonsterData>
	);
}
