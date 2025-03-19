export type God = 'none' | 'blue' | 'red';

export class GodData {
	id: string = '';
	name: string = '';
	description: string = '';
	image: string = '';
}

export class GodInstance {
	id: God = 'none';
	enabled: boolean = false;
	maxDifficulty: number = 1;
}

export let GOD_DICT: Record<God, GodData>;

import godsFile from './gods.json';

export function loadGodDict() {
	GOD_DICT = godsFile.reduce(
		(dict, god) => {
			dict[god.id as God] = god;
			return dict;
		},
		{} as Record<God, GodData>
	);
}

export const GOD_INSTANCES: GodInstance[] = [
	{
		id: 'blue',
		enabled: true,
		maxDifficulty: 1
	},
	{
		id: 'red',
		enabled: false,
		maxDifficulty: 1
	}
];
