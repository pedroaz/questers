import { v4 as uuid4 } from 'uuid';

// Monsters are able to be hunted
export type Skill = 'none' | 'attack' | 'defend';

export class SkillData {
	type: Skill = 'none';
	name: string = '';
	description: string = '';
	quests: QuestType[] = [];
}

export class SkillInstance {
	id: string = uuid4();
	type: Skill = 'none';
	used: boolean = false;
	data: SkillData = new SkillData();
}

export let SKILLS_DICT: Record<Skill, SkillData>;

import skillsFile from './skills.json';
import type { QuestType } from './quests';

export function loadSkillDict() {
	SKILLS_DICT = skillsFile.reduce(
		(dict, skill) => {
			dict[skill.type as Skill] = {
				...skill,
				type: skill.type as Skill,
				quests: skill.quests.map((quest) => quest as QuestType)
			};
			return dict;
		},
		{} as Record<Skill, SkillData>
	);
}
