import type { ArtifactId } from '$lib/data/artifacts/artifacts-models';
import type { ChestId } from '$lib/data/chests/chests-models';

export interface PlayerParty {
	id: string;
	playerId: string;
	companionsIds: string[];
	hp: number;
	experience: number;
	gold: number;
	maxHp: number;
	energy: number;
	maxEnergy: number;
	chestsToOpen: ChestId[];
	storedArtifacts: ArtifactId[];
	skillRolls: number;
	maxSkillRolls: number;
}

export interface NpcGroup {
	power: number;
}
