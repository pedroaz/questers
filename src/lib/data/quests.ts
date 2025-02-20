import { Monster } from './monsters';

export enum Quest {
	None = 'none',
	KillRats = 'kill-rats'
}

export enum QuestType {
	None = 'none',
	Common = 'common',
	TimeTrial = 'time-trial'
}

export class QuestData {
	name: string = '';
	type: QuestType = QuestType.Common;
	commonMonster: Monster = Monster.Rat;

	constructor(name: string, type: QuestType, commonMonster: Monster) {
		this.name = name;
		this.type = type;
		this.commonMonster = commonMonster;
	}
}

export function loadQuestDict() {
	QUEST_DICT = {
		[Quest.None]: new QuestData('None', QuestType.None, Monster.None),
		[Quest.KillRats]: new QuestData('Kill bunch of rats', QuestType.Common, Monster.Rat)
	};
}

export let QUEST_DICT: Record<Quest, QuestData>;
