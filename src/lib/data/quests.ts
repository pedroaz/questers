export enum Quest {
	None = 'none',
	KillRats = 'kill-rats'
}

export enum QuestType {
	None = 'none',
	Hunt = 'hunt',
	Fish = 'fish',
	Craft = 'craft',
	Rescue = 'rescue',
	Gather = 'gather',
	Trade = 'trade',
	Explore = 'explore'
}

export class QuestData {
	name: string = '';
	type: QuestType = QuestType.None;
}

export function loadQuestDict() {}

export let QUEST_DICT: Record<Quest, QuestData>;
