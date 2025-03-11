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
	maxHp: number = 0;
	baseAttributes: UnitAttributes = new UnitAttributes();
	equipments: Equipment[] = [];
}

export class UnitAttributes {
	strength: number = 0;
	stamina: number = 0;
	agility: number = 0;
	intellect: number = 0;
	spirit: number = 0;
}

export type UnitClass =
	| 'none'
	| 'warrior'
	| 'explorer'
	| 'crafter'
	| 'fisherman'
	| 'monster-normal';

export class StartingClass {
	class: UnitClass = 'none';
	image: string = '';
	attributeBonus: UnitAttributes = new UnitAttributes();
}

export const STARTER_CLASSES: StartingClass[] = [
	{
		class: 'warrior',
		image: '',
		attributeBonus: {
			strength: 5,
			stamina: 5,
			agility: 5,
			intellect: 5,
			spirit: 5
		}
	},
	{
		class: 'explorer',
		image: '',
		attributeBonus: {
			strength: 2,
			stamina: 2,
			agility: 2,
			intellect: 2,
			spirit: 2
		}
	}
];
