import type { CompanionId, CompanionData } from './companions-models';
import companionsFile from './companions.json';
import type { ClassId } from '../classes/classes-models';

export let COMPANION_DICT: Record<CompanionId, CompanionData>;

export function loadCompanionDict() {
	COMPANION_DICT = companionsFile.reduce(
		(dict, companion) => {
			dict[companion.id as CompanionId] = {
				...companion,
				id: companion.id as CompanionId,
				class: companion.class as ClassId
			};
			return dict;
		},
		{} as Record<CompanionId, CompanionData>
	);
}
