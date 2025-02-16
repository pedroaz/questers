import { RowLocation } from '$lib/services/combat-serice';

export enum Monster {
	None = 'none',
	Rat = 'rat'
}

export class MonsterData {
	name: string = '';
	startingLocation: RowLocation = RowLocation.None;
}

export const MONSTER_DICT: Record<Monster, MonsterData> = {
	[Monster.None]: {
		name: 'None',
		startingLocation: RowLocation.None
	},
	[Monster.Rat]: {
		name: 'Rat',
		startingLocation: RowLocation.FrontRow
	}
};
