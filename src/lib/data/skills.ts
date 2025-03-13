import type { Attribute } from '$lib/schemas/unit';

// Monsters are able to be hunted
export type Skill = 'none' | 'slash' | 'byte';

export type SkillEffect = 'none' | 'full-heal';

export class SkillData {
	type: Skill = 'none';
	description: string = '';
	actions: SkillAction[] = [];
}

export class SkillAction {
	attribute: Attribute = 'none';
	basePower: number = 0;
	powerMultiplier: number = 0;
	baseDefense: number = 0;
	defenseMultiplier: number = 0;
	effects: SkillEffect[] = [];
}

export let SKILLS_DICT: Record<Skill, SkillData>;

import skillsFile from './skills.json';

export function loadSkillDict() {
	SKILLS_DICT = skillsFile.reduce(
		(dict, skill) => {
			dict[skill.type as Skill] = {
				type: skill.type as Skill,
				description: skill.description,
				actions: skill.actions.map((action) => ({
					...action,
					attribute: action.attribute as Attribute
				}))
			};
			return dict;
		},
		{} as Record<Skill, SkillData>
	);
}
