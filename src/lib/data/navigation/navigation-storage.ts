import type {
	AreaId,
	AreaData,
	RegionId,
	RegionData,
	AreaType,
	QuestType,
	WinCondition
} from './navigation-models';
import areasFile from './areas.json';
import regionsFile from './regions.json';
import type { MonsterId } from '../monsters/monsters-models';

export let AREAS_DICT: Record<AreaId, AreaData>;
export let REGIONS_DICT: Record<RegionId, RegionData>;

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
						winCondition: questData.winCondition as WinCondition,
						roundsData: questData.roundsData.map((roundData) => {
							return {
								...roundData,
								spawns: roundData.spawns.map((spawn) => {
									return {
										...spawn,
										chance: spawn.chance as number,
										level: spawn.level as number,
										monsterId: spawn.monsterId as MonsterId
									};
								})
							};
						})
					};
				})
			};
			return dict;
		},
		{} as Record<AreaId, AreaData>
	);
}

export function loadRegionsDict() {
	REGIONS_DICT = regionsFile.reduce(
		(dict, region) => {
			dict[region.id as RegionId] = {
				...region,
				id: region.id as RegionId,
				areas: region.areas.map((id) => {
					return id as AreaId;
				}),
				initialAreas: region.initialAreas.map((id) => {
					return id as AreaId;
				})
			};
			return dict;
		},
		{} as Record<RegionId, RegionData>
	);
}
