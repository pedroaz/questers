import { Monster } from './monsters';

export enum Quest {
	None = 'none',
	KillRats = 'kill-rats'
}

export enum QuestType {
	None = 'none',
	Common = 'common'
}

export class QuestData {
	name: string = '';
	type: QuestType = QuestType.Common;
	commonMonster: Monster = Monster.Rat;
}

export const QUEST_DICT: Record<Quest, QuestData> = {
	[Quest.None]: {
		name: 'None',
		type: QuestType.None,
		commonMonster: Monster.None
	},
	[Quest.KillRats]: {
		name: 'Kill bunch of rats',
		type: QuestType.Common,
		commonMonster: Monster.Rat
	}
};
