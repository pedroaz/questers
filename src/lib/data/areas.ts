import type { QuestType } from './quests';

export enum AreaId {
	None = 'none',
	TartarugaPort = 'tartaruga-port',
	ObsidianIsland = 'obsidian-island',
	HarrowsRest = 'harrows-rest'
}

export enum AreaType {
	None = 'none',
	Island = 'island'
}

export enum AreaTab {
	Crew = 'crew',
	Quests = 'quests',
	Shop = 'shop',
	darkLedger = 'dark-ledger',
	NavigationMap = 'navigation-map'
}

export class AreaData {
	name: string = 'NO NAME';
	type: AreaType = AreaType.None;
	description: string = 'NO DESCRIPTION';
	image: string = '';
	questTypes: QuestType[] = [];
}

export class AreaInstance {
	id: AreaId = AreaId.None;
	data: AreaData = new AreaData();
	shipsInArea: string[] = [];
}

export let AREAS_DICT: Record<AreaId, AreaData>;

import areasFile from './areas.json';

export function loadAreaDict() {
	AREAS_DICT = areasFile.reduce(
		(dict, area) => {
			dict[area.id as AreaId] = {
				...area,
				type: area.type as AreaType,
				questTypes: (area['questTypes'] || []).map((questType) => questType as QuestType)
			};
			return dict;
		},
		{} as Record<AreaId, AreaData>
	);
}
