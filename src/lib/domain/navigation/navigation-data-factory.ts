import { v4 as uuid4 } from 'uuid';

import type { NavigationData } from './navigation-data';
import { createQuestInstance } from './quests-factory';
import type { QuestInstance } from './quests-models';
import { generateCompanion } from '../unit/factories/unit-factory';
import type { NpcParty } from '../unit/party';

import { CompanionId } from '$lib/data/companions/companions-models';
import { RegionId } from '$lib/data/navigation/navigation-models';
import { AREAS_DICT, REGIONS_DICT } from '$lib/data/navigation/navigation-storage';
import { getRandomNumber } from '$lib/rng-service';
import { setNavigationData } from '$lib/states/player-state.svelte';
import { setNpcParties } from '$lib/states/units-state.svelte';
import { getRandomElements } from '$lib/utils';

export function generateNavigationData(regionId: RegionId) {
	const navigationData: NavigationData = {
		currentRegion: regionId,
		discoveredAreas: REGIONS_DICT[regionId].initialAreas,
		quests: generateQuests(regionId),
		firstTimeInRegion: true,
		selectedQuestId: '',
		npcCompanionsAlreadyUsed: []
	};
	generateCompanionsForRegion(navigationData);
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

export function generateCompanionsForRegion(navigationData: NavigationData) {
	const parties: NpcParty[] = [];

	// Generate two parties
	for (let i = 0; i < 2; i++) {
		const npcParty: NpcParty = {
			uuid: uuid4(),
			companionsIds: [],
			power: 0
		};

		const availableCompanions = Object.values(CompanionId).filter(
			(companionId) => !navigationData.npcCompanionsAlreadyUsed.includes(companionId)
		);

		// With two companions each
		const randomCompanions = getRandomElements(availableCompanions, 2);
		for (let j = 0; j < randomCompanions.length; j++) {
			const companionId = randomCompanions[j];
			const unit = generateCompanion(companionId);
			npcParty.companionsIds.push(unit.uuid);
			navigationData.npcCompanionsAlreadyUsed.push(companionId);
		}

		parties.push(npcParty);
	}

	setNpcParties(parties);
	setNavigationData(navigationData);
}
