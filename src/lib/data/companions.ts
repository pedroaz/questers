export type Companion = 'nioshi' | 'takeo' | 'sugameuku' | 'ruthgarth' | 'nina';

export class CompanionData {
	id: Companion = 'nioshi';
	name: string = '';
	image: string = '';

	class: UnitClassBonusId = 'none';
}

import type { UnitClassBonusId } from '$lib/schemas/unit';
import companionsFile from './companions.json';

export function loadCompanionDict() {
	COMPANION_DICT = companionsFile.reduce(
		(dict, companion) => {
			dict[companion.id as Companion] = {
				...companion,
				id: companion.id as Companion,
				class: companion.class as UnitClassBonusId
			};
			return dict;
		},
		{} as Record<Companion, CompanionData>
	);
}

export let COMPANION_DICT: Record<Companion, CompanionData>;
