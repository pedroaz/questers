import { type Equipment } from '$lib/data/equipments';

export class Unit {
	name: string = '';
	level: number = 1;
	experience: number = 0;
	gold: number = 0;
	hp: number = 0;
	mana: number = 0;
	delay: number = 0;
	baseStats: UnitStats = new UnitStats();
	baseAttributes: UnitAttributes = new UnitAttributes();
	equipments: Equipment[] = [];
}

export class UnitStats {
	maxHp: number = 100;
	maxMana: number = 10;
}

export class UnitAttributes {
	strength: number = 1;
	agility: number = 1;
	intellect: number = 1;
	spirit: number = 1;
	vitality: number = 1;
}
