import type { UnitAttributes } from './attribute';

import type { ClassId } from '$lib/data/classes/classes-models';
import type { CompanionId } from '$lib/data/companions/companions-models';
import type { MonsterId } from '$lib/data/monsters/monsters-models';
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
	startingHp: number;
	bodyImage: string;
	classes: ClassId[];

	// User in combat
	action: UnitAction | null;

	// Used for easy monster identification
	monsterId: MonsterId | null;
	companionId: CompanionId | null;
}
