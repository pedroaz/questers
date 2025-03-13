import type { Attribute } from '$lib/schemas/unit';
import { v4 as uuid4 } from 'uuid';

// Monsters are able to be hunted
export type Skill = 'none' | 'slash' | 'byte';

export type SkillEffect = 'none' | 'full-heal';

export class SkillData {
	type: Skill = 'none';
	name: string = '';
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

export class SkillInstance {
	id: string = uuid4();
	type: Skill = 'none';
	used: boolean = false;
}

export let SKILLS_DICT: Record<Skill, SkillData>;

import skillsFile from './skills.json';

export function loadSkillDict() {
	SKILLS_DICT = skillsFile.reduce(
		(dict, skill) => {
			dict[skill.type as Skill] = {
				...skill,
				type: skill.type as Skill,
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
