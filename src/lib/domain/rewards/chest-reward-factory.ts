import { getRandomNumber, rollChance } from '../../rng-service';

import type { ArtifactId } from '$lib/data/artifacts/artifacts-models';
import type { ChestId, ChestReward } from '$lib/data/chests/chests-models';
import { CHESTS_DICT } from '$lib/data/chests/chests-storage';

export function generateChestRewards(chestId: ChestId) {
	const data = CHESTS_DICT[chestId];
	const reward: ChestReward = createNewChestReward(chestId);
	reward.data = data;
	reward.gold = getRandomNumber(data.minGold, data.maxGold);
	const artifacts: ArtifactId[] = [];

	data.artifactChances.forEach((artifactChance) => {
		if (rollChance(artifactChance.chance)) {
			artifacts.push(artifactChance.artifactId);
		}
	});

	reward.artifacts = artifacts;
	return reward;
}

function createNewChestReward(chestId: ChestId): ChestReward {
	const data = CHESTS_DICT[chestId];
	return {
		data,
		gold: 0,
		artifacts: []
	};
}
