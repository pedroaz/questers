export type Quest = 'none' | 'kill-rats';
import type { Unit } from '$lib/schemas/unit';
import { v4 as uuid4 } from 'uuid';

export type QuestType =
	| 'none'
	| 'hunt'
	| 'fish'
	| 'craft'
	| 'rescue'
	| 'gather'
	| 'trade'
	| 'explore';

export class QuestData {
	name: string = '';
	type: QuestType = 'none';
}

export class QuestInstance {
	id: string = uuid4();
	type: QuestType = 'none';
	enemies: Unit[] = [];
}

export function loadQuestDict() {}

export let QUEST_DICT: Record<Quest, QuestData>;
