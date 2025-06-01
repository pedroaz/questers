import type { QuestType } from '../navigation/navigation-models';

export enum SkillId {
	// General
	Attack = 'attack',
	Defend = 'defend',

	// Warrior
	Slash = 'slash',
	DoubleSlash = 'double-slash',
	TripleSlash = 'triple-slash',
	AllIn = 'all-in',
	Enrage = 'enrage',

	// Explorer
	RallyTroops = 'rally-troop',
	Resilience = 'resilience',
	FarSight = 'far-sight',
	ImprovisedShield = 'improvised-shield',

	// Hunter
	QuickAttack = 'quick-attack',
	FishingPoleStrike = 'fishing-pole-strike',

	// Crafter
	Blast = 'blast',
	BruteForce = 'brute-force',

	// Crafter + Sage
	Concentrate = 'concentrate',

	// Sage
	FireZap = 'fire-zap',
	IceZap = 'ice-zap',
	ThunderZap = 'thunder-zap'
}

export interface SkillData {
	type: SkillId;
	name: string;
	description: string;
	quests: QuestType[];
}

export interface SkillInstance {
	uuid: string;
	id: SkillId;
	used: boolean;
	data: SkillData;
}
