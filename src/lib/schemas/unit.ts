import { type Equipment } from '$lib/data/equipments';
import type { Skill, SkillInstance } from '$lib/data/skills';
import { v4 as uuid4 } from 'uuid';

export class Unit {
	uuid: string = uuid4();
	name: string = '';
	level: number = 1;
	class: UnitClassBonusId = 'none';
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

export type Attribute = 'none' | 'str' | 'lead' | 'agi' | 'int' | 'spi';

export class UnitAttributes {
	strength: number = 0;
	leadership: number = 0;
	agility: number = 0;
	intellect: number = 0;
	spirit: number = 0;
}

export type UnitClassBonusId =
	| 'none'
	| 'warrior'
	| 'explorer'
	| 'crafter'
	| 'fisherman'
	| 'sage'
	| 'monster-normal';

export class StartingClass {
	class: UnitClassBonusId = 'none';
	enabled: boolean = false;
	description: string = '';
	image: string = '';
	attributeBonus: UnitAttributes = new UnitAttributes();
}

export const STARTER_CLASSES: StartingClass[] = [
	{
		class: 'warrior',
		enabled: true,
		description: 'Warrior',
		image: '',
		attributeBonus: {
			strength: 3,
			leadership: 1,
			agility: 1,
			intellect: 0,
			spirit: 0
		}
	},
	{
		class: 'explorer',
		enabled: false,
		description: 'Explorer',
		image: '',
		attributeBonus: {
			strength: 0,
			leadership: 2,
			agility: 0,
			intellect: 1,
			spirit: 0
		}
	}
];
