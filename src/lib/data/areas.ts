import type { QuestData, QuestType } from './quests';

export type ArchipelagoId = 'none' | 'starter-port';

export type AreaId = 'none' | 'tartaruga-port' | 'obsidian-island' | 'harrows-rest';

export type AreaType = 'none' | 'island';

export class AreaData {
	name: string = 'NO NAME';
	type: AreaType = 'none';
	description: string = 'NO DESCRIPTION';
	image: string = '';
	questsData: QuestData[] = [];
}

export class ArchipelagoData {
	id: ArchipelagoId = 'none';
	name: string = '';
	description: string = '';
	areasData: AreaData[] = [];
}

export let ARCHIPELAGOS_DICT: Record<ArchipelagoId, ArchipelagoData>;

import areasFile from './areas.json';
import type { Monster } from './monsters';

export function loadAreaDict() {
	ARCHIPELAGOS_DICT = areasFile.reduce(
		(dict, archipelago) => {
			dict[archipelago.id as ArchipelagoId] = {
				...archipelago,
				id: archipelago.id as ArchipelagoId,
				areasData: archipelago.areasData.map((area) => ({
					...area,
					type: area.type as AreaType,
					questsData: area.questsData.map((quest) => ({
						...quest,
						type: quest.type as QuestType,
						monsters: quest.monsters.map((monsterId) => monsterId as Monster)
					}))
				}))
			};
			return dict;
		},
		{} as Record<ArchipelagoId, ArchipelagoData>
	);
}
