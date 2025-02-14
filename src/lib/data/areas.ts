import GauliTown from '$lib/assets/towns/gauli-town.png';
import { Quest } from './quests';

export enum Area {
	None = 'none',
	Gauly = 'gauly'
}

export enum AreaType {
	None = 'none',
	Town = 'town'
}

export enum AreaTab {
	Image = 'image',
	Character = 'character',
	Quests = 'quests',
	Shop = 'shop',
	Leaderboard = 'leaderboard',
	Dungeons = 'dungeons',
	Raids = 'raids',
	Book = 'book',
	NavigationMap = 'navigation-map'
}

export class AreaData {
	name: string = 'NO NAME';
	type: AreaType = AreaType.None;
	description: string = 'NO DESCRIPTION';
	image: string = '';
	potentialQuests: PotentialQuest[] = [];
}

export class PotentialQuest {
	quest: Quest = Quest.KillRats;
	minLevel: number = 1;
}

export const AREAS_DICT: Record<Area, AreaData> = {
	[Area.None]: {
		name: 'None',
		type: AreaType.None,
		description: 'No Area selected',
		image: '',
		potentialQuests: []
	},
	[Area.Gauly]: {
		name: 'Gauly',
		type: AreaType.Town,
		description: 'A small town in the middle of the forest',
		image: GauliTown,
		potentialQuests: [
			{
				quest: Quest.KillRats,
				minLevel: 1
			}
		]
	}
};
