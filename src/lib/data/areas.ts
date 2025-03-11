import type { QuestType } from './quests';

export type AreaId = 'none' | 'tartaruga-port' | 'obsidian-island' | 'harrows-rest';

export type AreaType = 'none' | 'island';

export type AreaTab = 'crew' | 'quests' | 'shop' | 'dark-ledger' | 'navigation-map';

export class AreaData {
	name: string = 'NO NAME';
	type: AreaType = 'none';
	description: string = 'NO DESCRIPTION';
	image: string = '';
	questTypes: QuestType[] = [];
}

export class AreaInstance {
	id: AreaId = 'none';
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
