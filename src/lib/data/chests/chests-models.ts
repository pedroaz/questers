import type { ArtifactId } from '../artifacts/artifacts-models';

export enum ChestId {
	GoldCommon = 'gold-common'
}

export interface ChestData {
	id: ChestId;
	name: string;
	image: string;
	minGold: number;
	maxGold: number;
	artifactChances: ArtifactChance[];
}

export interface ChestReward {
	data: ChestData | null;
	gold: number;
	artifacts: ArtifactId[];
}

export interface ArtifactChance {
	artifactId: ArtifactId;
	chance: number;
}
