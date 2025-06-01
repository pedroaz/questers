import type { ClassData, ClassId } from './classes-models';
import classesFile from './classes.json';
import type { SkillId } from '../skills/skills-models';

import type { UnitAttributes } from '$lib/domain/unit/attribute';

export let CLASSES_DICT: Record<ClassId, ClassData>;

export function loadClassesDict() {
	CLASSES_DICT = classesFile.reduce(
		(dict, c) => {
			dict[c.id as ClassId] = {
				...c,
				id: c.id as ClassId,
				attributes: c.attributes as UnitAttributes,
				initialSkills: c.initialSkills.map((skill) => skill as SkillId)
			};
			return dict;
		},
		{} as Record<ClassId, ClassData>
	);
}
