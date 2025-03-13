import { type Equipment } from '$lib/data/equipments';
import type { Skill, SkillInstance } from '$lib/data/skills';
import { v4 as uuid4 } from 'uuid';

export class Unit {
	uuid: string = uuid4();
	name: string = '';
	level: number = 1;
	class: UnitClass = 'none';
	gold: number = 0;
	baseAttributes: UnitAttributes = new UnitAttributes();
	skills: Skill[] = [];

	// Optional Fields
	skillInstances: SkillInstance[] = [];
	experience?: number = 0;
	description?: string = '';
	image?: string = '';
	weapon?: Equipment = 'none';
	armor?: Equipment = 'none';
	trinket?: Equipment = 'none';
	experienceWhenKilled?: number = 0;
}

export type Attribute = 'none' | 'str' | 'vit' | 'agi' | 'int' | 'spi';

export class UnitAttributes {
	strength: number = 0;
	vitality: number = 0;
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
	| 'sage'
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
			vitality: 5,
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
			vitality: 2,
			agility: 2,
			intellect: 2,
			spirit: 2
		}
	}
];
