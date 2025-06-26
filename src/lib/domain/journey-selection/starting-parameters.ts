import type { ClassId } from '$lib/data/classes/classes-models';
import type { GodId } from '$lib/data/gods/gods-models';

export interface StartingParameters {
	godId: GodId;
	classId: ClassId;
}
