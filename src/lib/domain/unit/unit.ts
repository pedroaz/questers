import type { UnitAttributes } from './attribute';

import type { ClassId } from '$lib/data/classes/classes-models';
import type { EquipmentId } from '$lib/data/equipment/equipment-models';
import type { GodId } from '$lib/data/gods/gods-models';
import type { SkillId, SkillInstance } from '$lib/data/skills/skills-models';

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
	iconImage: string;
	weapon: EquipmentId | null;
	offhand: EquipmentId | null;
	trinket: EquipmentId | null;
	helmet: EquipmentId | null;
	armor: EquipmentId | null;
	boots: EquipmentId | null;
	classesBonuses: ClassId[];
}
