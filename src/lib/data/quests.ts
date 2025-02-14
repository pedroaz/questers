export enum Quest {
	KillRats = 'kill-rats'
}

export enum QuestType {
	Kill = 'kill'
}

export class QuestData {
	name: string = '';
	type: QuestType = QuestType.Kill;
	encounters: Encounter[] = [];
}

export class Encounter {
	monsterGroups: MonsterGroup[] = [];
}

export class MonsterGroup {}

export const QUEST_DICT: Record<Quest, QuestData> = {
	[Quest.KillRats]: {
		name: 'Kill bunch of rats',
		type: QuestType.Kill,
		encounters: []
	}
};
