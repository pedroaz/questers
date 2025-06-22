import type { ArtifactId } from '$lib/data/artifacts/artifacts-models';
import type { ChestId, ChestReward } from '$lib/data/chests/chests-models';

export interface PlayerParty {
	id: string;
	playerId: string;
	companionsIds: string[];
	level: number;
	hp: number;
	experience: number;
	threat: number;
	gold: number;
	maxHp: number;
	energy: number;
	maxEnergy: number;
	chestsToOpen: ChestId[];
	rewards: ChestReward[];
	artifacts: ArtifactId[];
	storedArtifacts: ArtifactId[];
	unspentLevelUps: number;
}

export interface NpcParty {
	uuid: string;
	companionsIds: string[];
	power: number;
}
