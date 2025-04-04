import { type Equipment } from '$lib/data/equipments';
import type { Skill, SkillInstance } from '$lib/data/skills';
import { v4 as uuid4 } from 'uuid';

export class Unit {
	uuid: string = uuid4();
	name: string = '';
	level: number = 1;
	class: UnitClassBonusId = 'none';
	gold: number = 0;
	attributes: UnitAttributes = new UnitAttributes();
	skills: Skill[] = [];
	skillInstances: SkillInstance[] = [];
	experience: number = 0;
	startingHp: number = 0;

	// Optional Fields
	description?: string = '';
	image?: string = '';
	weapon?: Equipment;
	armor?: Equipment;
	trinket?: Equipment;
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
	attributeBonus: UnitAttributes = new UnitAttributes();
}

export const STARTER_CLASSES: StartingClass[] = [
	{
		class: 'warrior',
		enabled: true,
		description: 'Warrior',
		attributeBonus: {
			strength: 2,
			leadership: 0,
			agility: 1,
			intellect: 0,
			spirit: 0
		}
	},
	{
		class: 'explorer',
		enabled: true,
		description: 'Explorer',
		attributeBonus: {
			strength: 0,
			leadership: 2,
			agility: 0,
			intellect: 1,
			spirit: 0
		}
	},
	{
		class: 'fisherman',
		enabled: true,
		description: 'Fisherman',
		attributeBonus: {
			strength: 1,
			leadership: 0,
			agility: 2,
			intellect: 0,
			spirit: 0
		}
	},
	{
		class: 'sage',
		enabled: true,
		description: 'Sage',
		attributeBonus: {
			strength: 0,
			leadership: 1,
			agility: 0,
			intellect: 0,
			spirit: 2
		}
	},
	{
		class: 'crafter',
		enabled: true,
		description: 'Crafter',
		attributeBonus: {
			strength: 0,
			leadership: 0,
			agility: 0,
			intellect: 2,
			spirit: 1
		}
	}
];
