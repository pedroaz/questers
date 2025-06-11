import type { UnitAttributes } from './attribute';

import type { ClassId } from '$lib/data/classes/classes-models';
import type { SkillId, SkillInstance, UnitAction } from '$lib/data/skills/skills-models';

export enum UnitType {
	Player = 'player',
	Monster = 'monster',
	Boss = 'boss',
	Companion = 'companion',
	NpcCompanion = 'npc-companion'
}

export interface Unit {
	uuid: string;
	name: string;
	type: UnitType;
	level: number;
	attributes: UnitAttributes;
	power: number;
	skills: SkillId[];
	skillInstances: SkillInstance[];
	action: UnitAction | null;
	startingHp: number;
	bodyImage: string;
	iconImage: string;
	classes: ClassId[];
	levelUpBonuses: UnitAttributes;
}
