import { GodId } from '$lib/data/gods/gods-models';

export interface StartingGod {
	id: GodId;
	enabled: boolean;
}

export const STARTING_GODS: StartingGod[] = [
	{
		id: GodId.Blue,
		enabled: true
	},
	{
		id: GodId.Red,
		enabled: true
	},
	{
		id: GodId.Green,
		enabled: true
	}
];
