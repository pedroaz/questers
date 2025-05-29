import { getRandomNumber, rollChance } from '../../rng-service';

import type { ChestId, ChestReward } from '$lib/data/chests/chests-models';
import { CHESTS_DICT } from '$lib/data/chests/chests-storage';
import type { EquipmentId } from '$lib/data/equipment/equipment-models';

export function generateChestRewards(chestId: ChestId) {
	const data = CHESTS_DICT[chestId];
	const reward: ChestReward = createNewChestReward(chestId);
	reward.data = data;
	reward.gold = getRandomNumber(data.minGold, data.maxGold);
	const equips: EquipmentId[] = [];

	data.equipChances.forEach((equipChance) => {
		if (rollChance(equipChance.chance)) {
			equips.push(equipChance.equip);
		}
	});

	reward.equips = equips;
	return reward;
}

function createNewChestReward(chestId: ChestId): ChestReward {
	const data = CHESTS_DICT[chestId];
	return {
		data,
		gold: 0,
		equips: []
	};
}
