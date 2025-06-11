import type { ArtifactId } from '../artifacts/artifacts-models';
import type { SkillId } from '../skills/skills-models';

export enum ChestId {
	GoldCommon = 'gold-common',
	ExpCommon = 'exp-common',
	SkillCommon = 'skill-common',
	ArtifactCommon = 'artifact-common',
	LevelUpCommon = 'level-up-common'
}

export enum ChestType {
	Gold = 'gold',
	Exp = 'exp',
	Artifact = 'artifact',
	Skill = 'skill',
	LevelUp = 'level-up'
}

export interface ChestData {
	id: ChestId;
	type: ChestType;
	name: string;
	image: string;
	minGold: number | null;
	maxGold: number | null;
	minExp: number | null;
	maxExp: number | null;
	artifactChances: ArtifactChance[];
	skillChances: SkillChance[];
}

export interface ChestReward {
	data: ChestData | null;
	opened: boolean;
	gold: number;
	exp: number;
	levelUp: number;
	artifacts: ArtifactId[];
	goldCost: number;
	expCost: number;
}

export interface ArtifactChance {
	artifactId: ArtifactId;
	weight: number;
}

export interface SkillChance {
	skillId: SkillId;
	weight: number;
}
