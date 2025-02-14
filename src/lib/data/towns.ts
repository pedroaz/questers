export enum Town {
	None = 'none',
	Gauly = 'gauly'
}

export class TownData {
	name: string = 'NO NAME';
	description: string = 'NO DESCRIPTION';
}

export const TOWNS_DICT: Record<Town, TownData> = {
	[Town.None]: {
		name: 'None',
		description: 'No town'
	},
	[Town.Gauly]: {
		name: 'Gauly',
		description: 'A small town in the middle of the forest'
	}
};
