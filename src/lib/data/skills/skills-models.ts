import type { QuestType } from '../navigation/navigation-models';

export enum SkillId {
	Attack = 'attack',
	Defend = 'defend'
}

export interface SkillData {
	type: SkillId;
	name: string;
	description: string;
	quests: QuestType[];
}

export interface SkillInstance {
	uuid: string;
	id: SkillId;
	used: boolean;
	data: SkillData;
}
