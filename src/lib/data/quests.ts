export type Quest = 'none' | 'kill-rats';
import type { Attribute, Unit } from '$lib/schemas/unit';
import { v4 as uuid4 } from 'uuid';
import type { Monster } from './monsters';

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

export let QUEST_ATTR_MAP: Record<QuestType, Attribute[]>;

export function loadAttributeMapping() {
	QUEST_ATTR_MAP = {
		none: [],
		hunt: ['str', 'agi'],
		fish: ['agi'],
		sail: ['lead'],
		craft: ['int'],
		recruit: ['lead'],
		gather: ['agi'],
		explore: ['lead']
	};
}

export class QuestData {
	name: string = '';
	type: QuestType = 'none';
	monsters?: Monster[] = [];
	winCondition: WinCondition = 'none';
}

export type QuestPhaseType = 'normal' | 'boss';

export class QuestPhase {
	type: QuestPhaseType = 'normal';
	enemies: Unit[] = [];
	maxHp: number = 0;
	winCondition: WinCondition = 'none';
}

export type QuestStage =
	| 'new-stage-dialog'
	| 'waiting-for-input'
	| 'calculating'
	| 'player-won-dialog'
	| 'player-lost-dialog';

export type QuestTurn = 'player' | 'enemy';

export class QuestInstance {
	id: string = uuid4();
	name: string = '';
	type: QuestType = 'none';
	enabled: boolean = false;
	phases: QuestPhase[] = [];
}
