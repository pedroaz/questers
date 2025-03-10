export enum Companion {
	Nioshi = 'nioshi',
	Takeo = 'takeo',
	Sugameuku = 'sugameuku',
	Ruthgarth = 'ruthgarth',
	Nina = 'nina'
}

export class CompanionData {
	name: string = '';
}

import companionsFile from './companions.json';

export function loadCompanionDict() {
	COMPANION_DICT = companionsFile.reduce(
		(dict, companion) => {
			dict[companion.id as Companion] = {
				...companion
			};
			return dict;
		},
		{} as Record<Companion, CompanionData>
	);
}

export let COMPANION_DICT: Record<Companion, CompanionData>;
