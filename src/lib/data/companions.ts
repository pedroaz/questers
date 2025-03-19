export type Companion = 'nioshi' | 'takeo' | 'sugameuku' | 'ruthgarth' | 'nina';

export class CompanionData {
	name: string = '';
	class: UnitClassBonusId = 'none';
}

import type { UnitClassBonusId } from '$lib/schemas/unit';
import companionsFile from './companions.json';

export function loadCompanionDict() {
	COMPANION_DICT = companionsFile.reduce(
		(dict, companion) => {
			dict[companion.id as Companion] = {
				...companion,
				class: companion.class as UnitClassBonusId
			};
			return dict;
		},
		{} as Record<Companion, CompanionData>
	);
}

export let COMPANION_DICT: Record<Companion, CompanionData>;
