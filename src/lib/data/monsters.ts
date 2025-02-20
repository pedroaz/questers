import { RowLocation } from '$lib/services/combat-serice';

export enum Monster {
	None = 'none',
	Rat = 'rat'
}

export class MonsterData {
	name: string = '';
	startingLocation: RowLocation = RowLocation.None;
	constructor(name: string, startingLocation: RowLocation) {
		this.name = name;
		this.startingLocation = startingLocation;
	}
}

export function loadMonsterDict() {
	MONSTER_DICT = {
		[Monster.None]: new MonsterData('None', RowLocation.None),
		[Monster.Rat]: new MonsterData('Rat', RowLocation.FrontRow)
	};
}

export let MONSTER_DICT: Record<Monster, MonsterData>;
