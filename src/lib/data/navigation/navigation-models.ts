import type { MonsterId } from '../monsters/monsters-models';

export enum RegionId {
	WhalePeninsula = 'whale-peninsula',
	ForgottenCastle = 'forgotten-castle'
}

export enum AreaId {
	SpiritTree = 'spirit-tree',
	BoarsHideout = 'boars-hideout',
	SerpentsSwamp = 'serpents-swamp',
	NormalCave = 'normal-cave',
	RockyMountains = 'rocky-mountains'
}

export enum AreaType {
	Normal = 'normal'
}

export interface AreaData {
	id: AreaId;
	name: string;
	type: AreaType;
	description: string;
	image: string;
	pos: number;
	questsData: QuestData[];
}

export interface RegionData {
	id: RegionId;
	name: string;
	description: string;
	areas: AreaId[];
	initialAreas: AreaId[];
	image: string;
}

export interface QuestData {
	name: string;
	description: string;
	type: QuestType;
	winCondition: WinCondition;
	energyCost: number;
	threat: number;
	minAmountOfInstances: number;
	maxAmountOfInstances: number;
	roundsData: RoundData[];
}

export interface RoundData {
	chance: number;
	spawns: MonsterSpawn[];
}

export interface MonsterSpawn {
	chance: number;
	level: number;
	monsterId: MonsterId;
}

export enum QuestType {
	Balanced = 'balanced', // Balanced
	Provoke = 'provoke', // Just provoke them and fight them!
	Hunt = 'hunt', // Hunter monsters
	Craft = 'craft', // Craft Items (just item chests, but ok)
	Recruit = 'recruit', // Recruit Companions
	Gather = 'gather', // Risk and get various chests
	Explore = 'explore', // Discover new areas
	Pray = 'pray', // Fight Spirits
	Arcane = 'arcane' // Fight Spirits
}

export enum WinCondition {
	Kill = 'kill',
	Survive = 'survive'
}
