import { Unit } from '$lib/schemas/unit';
import { createMonsterUnit, createUnit } from '$lib/services/unit-factory';

export enum Monster {
	None = 'none',
	Rat = 'rat'
}

export class MonsterData {
	name: string = '';
	unit: Unit = createUnit('');
}

export const MONSTER_DICT: Record<Monster, MonsterData> = {
	[Monster.None]: {
		name: 'None',
		unit: createMonsterUnit('None')
	},
	[Monster.Rat]: {
		name: 'Rat',
		unit: createMonsterUnit('Rat')
	}
};
