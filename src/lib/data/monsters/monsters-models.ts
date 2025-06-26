import type { ArtifactId } from '../artifacts/artifacts-models';
import type { ChestId } from '../chests/chests-models';

import type { Unit } from '$lib/domain/unit/unit';

export enum MonsterId {
	Ratly = 'ratly',
	Fark = 'fark',
	LadyL = 'lady-l',
	Bullzor = 'bullzor',
	SpikyWind = 'spiky-wind'
}

export interface MonsterData {
	id: MonsterId;
	description?: string;
	unit: Unit;
	chestDrops: ChestDrop[];
	artifacts: ArtifactId[];
}

export interface ChestDrop {
	chance: number;
	chestId: ChestId;
	level: number;
}
