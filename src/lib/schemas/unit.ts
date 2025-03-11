import { type Equipment } from '$lib/data/equipments';
import { v4 as uuid4 } from 'uuid';

export class Unit {
	uuid: string = uuid4();
	name: string = '';
	level: number = 1;
	class: UnitClass = 'none';
	experience?: number = 0;
	experienceWhenKilled?: number = 0;
	gold: number = 0;
	hp: number = 0;
	mana: number = 0;
	baseStats: UnitStats = new UnitStats();
	baseAttributes: UnitAttributes = new UnitAttributes();
	equipments: Equipment[] = [];
}

export class UnitStats {
	maxHp?: number = 100;
	maxMana?: number = 10;
	maxEnergy?: number = 10;
	maxRage?: number = 10;
}

export class UnitAttributes {
	strength?: number = 0;
	stamina?: number = 0;
	agility?: number = 0;
	intellect?: number = 0;
	spirit?: number = 0;
}

export type UnitClass =
	| 'none'
	| 'warrior'
	| 'explorer'
	| 'crafter'
	| 'fisherman'
	| 'monster-normal';
