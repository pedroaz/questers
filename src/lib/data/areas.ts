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

	constructor(
		name: string,
		type: AreaType,
		description: string,
		image: string,
		potentialQuests: PotentialQuest[]
	) {
		this.name = name;
		this.type = type;
		this.description = description;
		this.image = image;
		this.potentialQuests = potentialQuests;
	}
}

export class PotentialQuest {
	quest: Quest = Quest.KillRats;
	minLevel: number = 1;
	constructor(quest: Quest, minLevel: number) {
		this.quest = quest;
		this.minLevel = minLevel;
	}
}

// Make this new()
export const AREAS_DICT: Record<Area, AreaData> = {
	[Area.None]: new AreaData('None', AreaType.None, 'No Area selected', '', []),
	[Area.Gauly]: new AreaData(
		'Gauly',
		AreaType.Town,
		'A small town in the middle of the forest',
		GauliTown,
		[new PotentialQuest(Quest.KillRats, 1), new PotentialQuest(Quest.KillRats, 1)]
	)
};
