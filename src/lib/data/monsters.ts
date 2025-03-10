export enum Monster {
	None = 'none',
	Rat = 'rat'
}

export class MonsterData {
	name: string = '';
}

export function loadMonsterDict() {}

export let MONSTER_DICT: Record<Monster, MonsterData>;
