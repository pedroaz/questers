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
	skillInstances: SkillInstance[] = [];

	// Optional Fields
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
	strength: number = 0; // combat
	vitality: number = 0; // leadership
	agility: number = 0; // hunting
	intellect: number = 0; // crafting
	spirit: number = 0; // pray
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
			strength: 3,
			vitality: 1,
			agility: 1,
			intellect: 0,
			spirit: 0
		}
	},
	{
		class: 'explorer',
		image: '',
		attributeBonus: {
			strength: 0,
			vitality: 2,
			agility: 0,
			intellect: 1,
			spirit: 0
		}
	}
];
