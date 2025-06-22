import type { SkillId } from '../skills/skills-models';

import type { UnitAttributes } from '$lib/domain/unit/attribute';

export enum ClassId {
	Warrior = 'warrior',
	Explorer = 'explorer',
	Crafter = 'crafter',
	Hunter = 'hunter',
	Mage = 'mage'
}

export interface ClassData {
	id: ClassId;
	name: string;
	description: string;
	iconImage: string;
	bodyImage: string;
	attributes: UnitAttributes;
	initialSkills: SkillId[];
}
