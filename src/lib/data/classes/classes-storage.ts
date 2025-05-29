import type { ClassData, ClassId } from './classes-models';
import classesFile from './classes.json';

export let CLASSES_DICT: Record<ClassId, ClassData>;

export function loadClassesDict() {
	CLASSES_DICT = classesFile.reduce(
		(dict, c) => {
			dict[c.id as ClassId] = {
				...c,
				id: c.id as ClassId
			};
			return dict;
		},
		{} as Record<ClassId, ClassData>
	);
}
