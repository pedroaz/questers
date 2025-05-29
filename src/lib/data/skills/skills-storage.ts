export let SKILLS_DICT: Record<SkillId, SkillData>;

import type { SkillData, SkillId } from './skills-models';
import skillsFile from './skills.json';
import type { QuestType } from '../quests';

export function loadSkillDict() {
	SKILLS_DICT = skillsFile.reduce(
		(dict, skill) => {
			dict[skill.type as SkillId] = {
				...skill,
				type: skill.type as SkillId,
				quests: skill.quests.map((quest) => quest as QuestType)
			};
			return dict;
		},
		{} as Record<SkillId, SkillData>
	);
}
