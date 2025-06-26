export let SKILLS_DICT: Record<SkillId, SkillData>;

import type { SkillData, SkillId, SkillType } from './skills-models';
import skillsFile from './skills.json';
import type { ClassId } from '../classes/classes-models';

export function loadSkillDict() {
	SKILLS_DICT = skillsFile.reduce(
		(dict, skill) => {
			dict[skill.id as SkillId] = {
				...skill,
				id: skill.id as SkillId,
				type: skill.type as SkillType,
				classes: skill.classes.map((cls: string) => cls as ClassId)
			};
			return dict;
		},
		{} as Record<SkillId, SkillData>
	);
}
