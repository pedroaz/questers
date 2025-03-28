export type ChestId = 'none' | 'gold-common';

export class ChestData {
	id: ChestId = 'none';
	name: string = '';
	image: string = '';
	minGold: number = 0;
	maxGold: number = 0;
	equipChances: EquipmentChance[] = [];
}

export class ChestReward {
	data: ChestData = new ChestData();
	gold: number = 0;
	equips: Equipment[] = [];
}

export class EquipmentChance {
	equip: Equipment = 'none';
	chance: number = 0;
}

export let CHESTS_DICT: Record<ChestId, ChestData>;

import { getRandomNumber, rollChance } from '$lib/services/random-service';
import chestsFile from './chests.json';
import type { Equipment } from './equipments';

export function loadChestsDict() {
	CHESTS_DICT = chestsFile.reduce(
		(dict, chest) => {
			dict[chest.id as ChestId] = {
				...chest,
				id: chest.id as ChestId,
				equipChances: chest.equipChances.map((equip) => ({
					equip: equip.equip as Equipment,
					chance: equip.chance
				}))
			};
			return dict;
		},
		{} as Record<ChestId, ChestData>
	);
}

export function generateChestRewards(chestId: ChestId) {
	const data = CHESTS_DICT[chestId];
	const reward: ChestReward = new ChestReward();
	reward.data = data;
	reward.gold = getRandomNumber(data.minGold, data.maxGold);
	const equips: Equipment[] = [];

	data.equipChances.forEach((equipChance) => {
		if (rollChance(equipChance.chance)) {
			equips.push(equipChance.equip);
		}
	});

	reward.equips = equips;
	return reward;
}
