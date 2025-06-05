import type { ChestId } from '$lib/data/chests/chests-models';
import { WinCondition, type AreaId, type QuestData } from '$lib/data/navigation/navigation-models';

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
