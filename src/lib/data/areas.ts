import type { QuestData, QuestType, WinCondition } from './quests';

export type ArchipelagoId = 'none' | 'starter-port';

export type AreaId = 'none' | 'tartaruga-island' | 'obsidian-island' | 'harrows-rest';

export type AreaType = 'none' | 'island';

export class AreaData {
	id: AreaId = 'none';
	name: string = 'NO NAME';
	type: AreaType = 'none';
	description: string = 'NO DESCRIPTION';
	image: string = '';
	pos: number = 0;
	questsData: QuestData[] = [];
}

export class ArchipelagoData {
	id: ArchipelagoId = 'none';
	name: string = '';
	description: string = '';
	areas: AreaId[] = [];
}

export let AREAS_DICT: Record<AreaId, AreaData>;
export let ARCHIPELAGOS_DICT: Record<ArchipelagoId, ArchipelagoData>;

import areasFile from './areas.json';
import archipelagosFile from './archipelagos.json';
import type { Monster } from './monsters';

export function loadAreasDict() {
	AREAS_DICT = areasFile.reduce(
		(dict, area) => {
			dict[area.id as AreaId] = {
				...area,
				id: area.id as AreaId,
				type: area.type as AreaType,
				questsData: area.questsData.map((questData) => {
					return {
						...questData,
						type: questData.type as QuestType,
						monsters: questData.monsters.map((monster) => monster as Monster),
						winCondition: questData.winCondition as WinCondition
					};
				})
			};
			return dict;
		},
		{} as Record<AreaId, AreaData>
	);
}

export function loadArchipegalosDict() {
	ARCHIPELAGOS_DICT = archipelagosFile.reduce(
		(dict, archipelago) => {
			dict[archipelago.id as ArchipelagoId] = {
				...archipelago,
				id: archipelago.id as ArchipelagoId,
				areas: archipelago.areas.map((id) => {
					return id as AreaId;
				})
			};
			return dict;
		},
		{} as Record<ArchipelagoId, ArchipelagoData>
	);
}
