import { Unit, UnitClass } from '$lib/schemas/unit';

export enum Monster {
	Rat = 'rat'
}

export class MonsterData {
	name: string = '';
	unit: Unit = new Unit();
}

export const MONSTER_DICT: Record<Monster, MonsterData> = {
	[Monster.Rat]: {
		name: 'Rat',
		unit: {
			name: 'Rat',
			level: 1,
			class: UnitClass.MonsterNormal,
			baseAttributes: {
				strength: 1,
				agility: 1,
				intellect: 1,
				spirit: 1,
				vitality: 1
			},
			baseStats: {
				maxHp: 10,
				maxMana: 1
			},
			equipments: []
		}
	}
};
