export type Quest = 'none' | 'kill-rats';

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

export function loadQuestDict() {}

export let QUEST_DICT: Record<Quest, QuestData>;
