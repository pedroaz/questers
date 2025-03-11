export type Monster = 'none' | 'rat';

export class MonsterData {
	name: string = '';
}

export function loadMonsterDict() {}

export let MONSTER_DICT: Record<Monster, MonsterData>;
