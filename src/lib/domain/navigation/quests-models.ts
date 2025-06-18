import type { ChestId } from '$lib/data/chests/chests-models';
import type { AreaId, QuestData } from '$lib/data/navigation/navigation-models';

export interface QuestInstance {
	id: string;
	areaId: AreaId;
	data: QuestData;
	rounds: QuestRound[];
	chestRewards: ChestId[];
	winCondition: WinCondition;
	finished: boolean;
}

export interface QuestRound {
	enemiesIds: string[];
	maxHp: number;
}

export enum QuestStage {
	NewRound = 'new-round',
	WaitingForInput = 'waiting-for-input',
	Calculating = 'calculating',
	AfterCombat = 'after-combat',
	PlayerWon = 'player-won',
	PlayerLost = 'player-lost'
}

export enum QuestInitiative {
	Player = 'player',
	Enemy = 'enemy'
}

export enum QuestType {
	Balanced = 'balanced',
	Provoke = 'provoke',
	Hunt = 'hunt',
	Craft = 'craft',
	Recruit = 'recruit',
	Gather = 'gather',
	Explore = 'explore',
	Pray = 'pray',
	Arcane = 'arcane'
}

export enum WinCondition {
	Kill = 'kill',
	Survive = 'survive'
}
