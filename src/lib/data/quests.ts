export type Quest = 'none' | 'kill-rats';
import type { Unit } from '$lib/schemas/unit';
import { v4 as uuid4 } from 'uuid';
import type { Monster } from './monsters';
import type { ChestId } from './chests';

export const QUEST_TYPE_TRANSLATION: Record<QuestType, string> = {
	none: 'None',
	hunt: 'Hunting Quest',
	fish: 'Fishing Quest',
	sail: 'Sailing Quest',
	craft: 'Crafting Quest',
	recruit: 'Recruiting Quest',
	gather: 'Gathering Quest',
	explore: 'Exploration Quest'
};

export type QuestType =
	| 'none'
	| 'hunt'
	| 'fish'
	| 'sail'
	| 'craft'
	| 'recruit'
	| 'gather'
	| 'explore';

export type WinCondition = 'none' | 'kill' | 'survive';

export class QuestData {
	name: string = '';
	type: QuestType = 'none';
	monsters?: Monster[] = [];
	winCondition: WinCondition = 'none';
	energyCost: number = 0;
	threat: number = 0;
	minAmount: number = 0;
	maxAmount: number = 0;
	minRounds: number = 0;
	maxRounds: number = 0;
}

export class QuestInstance {
	id: string = uuid4();
	data: QuestData = new QuestData();
	enabled: boolean = false;
	rounds: QuestRound[] = [];
	goldReward: number = 0;
	experienceReward: number = 0;
	chestRewards: ChestId[] = [];
}

export class QuestRound {
	enemies: Unit[] = [];
	maxHp: number = 0;
	winCondition: WinCondition = 'none';
}

export type QuestStage =
	| 'new-round'
	| 'waiting-for-input'
	| 'calculating'
	| 'after-combat'
	| 'player-won'
	| 'player-lost';

export type QuestInitiative = 'player' | 'enemy';
