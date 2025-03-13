import type { QuestData, QuestInstance, QuestType } from './quests';

export type AreaId = 'none' | 'tartaruga-port' | 'obsidian-island' | 'harrows-rest';

export type AreaType = 'none' | 'island';

export type AreaTab = 'crew' | 'quests' | 'shop' | 'dark-ledger' | 'navigation-map';

export class AreaData {
	name: string = 'NO NAME';
	type: AreaType = 'none';
	description: string = 'NO DESCRIPTION';
	image: string = '';
	questsData: QuestData[] = [];
}

export class AreaInstance {
	id: AreaId = 'none';
	data: AreaData = new AreaData();
	shipsInArea: string[] = [];
	todayQuests: QuestInstance[] = [];
}

export let AREAS_DICT: Record<AreaId, AreaData>;

import areasFile from './areas.json';
import type { Monster } from './monsters';

export function loadAreaDict() {
	AREAS_DICT = areasFile.reduce(
		(dict, area) => {
			dict[area.id as AreaId] = {
				...area,
				type: area.type as AreaType,
				questsData: (area['questsData'] || []).map((data) => ({
					...data,
					type: data.type as QuestType,
					monsters: data.monsters as Monster[]
				}))
			};
			return dict;
		},
		{} as Record<AreaId, AreaData>
	);
}
