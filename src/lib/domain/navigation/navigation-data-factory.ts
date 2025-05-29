import type { NavigationData } from './navigation-data';
import { createQuestInstance } from './quests-factory';
import type { QuestInstance } from './quests-models';

import { RegionId } from '$lib/data/navigation/navigation-models';
import { AREAS_DICT, REGIONS_DICT } from '$lib/data/navigation/navigation-storage';
import { getRandomNumber } from '$lib/rng-service';

export function generateNavigationData(regionId: RegionId) {
	const navigationData: NavigationData = {
		currentRegion: regionId,
		discoveredAreas: REGIONS_DICT[regionId].initialAreas,
		quests: generateQuests(regionId),
		firstTimeInRegion: true,
		selectedQuestId: ''
	};
	return navigationData;
}

function generateQuests(regionId: RegionId) {
	const quests: QuestInstance[] = [];
	const region = REGIONS_DICT[regionId];
	region.areas.forEach((areaId) => {
		const area = AREAS_DICT[areaId];
		area.questsData.forEach((questData) => {
			const amountOfQuests = getRandomNumber(
				questData.minAmountOfInstances,
				questData.maxAmountOfInstances
			);
			for (let i = 0; i < amountOfQuests; i++) {
				quests.push(createQuestInstance(questData, areaId));
			}
		});
	});
	return quests;
}
