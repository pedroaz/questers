import { type Equipment } from '$lib/data/equipments';
import { RowLocation } from '$lib/services/combat-serice';
import { v4 as uuid4 } from 'uuid';

export class Unit {
	uuid: string = uuid4();
	name: string = '';
	level: number = 1;
	class: UnitClass = UnitClass.None;
	experience?: number = 0;
	experienceWhenKilled?: number = 0;
	gold: number = 0;
	hp: number = 0;
	mana: number = 0;
	delay: number = 0;
	baseStats: UnitStats = new UnitStats();
	baseAttributes: UnitAttributes = new UnitAttributes();
	equipments: Equipment[] = [];
	row: RowLocation = RowLocation.None;
}

export class UnitStats {
	maxHp: number = 100;
	maxMana: number = 10;
	maxEnergy: number = 10;
	maxRage: number = 10;
}

export class UnitAttributes {
	strength: number = 1;
	agility: number = 1;
	intellect: number = 1;
	spirit: number = 1;
	vitality: number = 1;
}

export enum UnitClass {
	None = 'none',
	Warrior = 'warrior',
	Mage = 'mage',
	MonsterNormal = 'monster-normal'
}
