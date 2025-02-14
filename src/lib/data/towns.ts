import GauliTown from '$lib/assets/towns/gauli-town.png';

export enum Town {
	None = 'none',
	Gauly = 'gauly'
}

export enum TownTab {
	Image = 'image',
	Character = 'character',
	Quests = 'quests',
	Shop = 'shop',
	Leaderboard = 'leaderboard',
	Dungeons = 'dungeons',
	Raids = 'raids'
}

export class TownData {
	name: string = 'NO NAME';
	description: string = 'NO DESCRIPTION';
	image: string = '';
}

export const TOWNS_DICT: Record<Town, TownData> = {
	[Town.None]: {
		name: 'None',
		description: 'No town',
		image: ''
	},
	[Town.Gauly]: {
		name: 'Gauly',
		description: 'A small town in the middle of the forest',
		image: GauliTown
	}
};
