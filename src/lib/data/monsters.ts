import { Unit } from '$lib/schemas/unit';
import { v4 as uuid4 } from 'uuid';

// Monsters are able to be hunted
export type Monster = 'none' | 'rat' | 'bat' | 'boar' | 'spider' | 'goblin';

export class MonsterData {
	type: Monster = 'none';
	unit: Unit = new Unit();
}

import monstersFile from './monsters.json';

export function loadMonsterDict() {
	MONSTER_DICT = monstersFile.reduce(
		(dict, monster) => {
			dict[monster.type as Monster] = {
				type: monster.type as Monster,
				unit: {
					...monster.unit,
					uuid: uuid4(),
					class: 'monster-normal'
				}
			};
			return dict;
		},
		{} as Record<Monster, MonsterData>
	);
}

export let MONSTER_DICT: Record<Monster, MonsterData>;
