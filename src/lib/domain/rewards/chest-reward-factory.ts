import { getRandomNumber } from '../../rng-service';

import type { ChestId, ChestReward } from '$lib/data/chests/chests-models';
import { CHESTS_DICT } from '$lib/data/chests/chests-storage';
import { SKILLS_DICT } from '$lib/data/skills/skills-storage';
import { getPlayerUnit } from '$lib/states/player-state.svelte';

export function generateChestRewards(chestId: ChestId) {
	const data = CHESTS_DICT[chestId];
	const reward: ChestReward = createNewChestReward(chestId);
	reward.data = data;

	// Gold
	if (data.minGold && data.maxGold) {
		reward.gold = getRandomNumber(data.minGold, data.maxGold);
	}

	// Exp
	if (data.minExp && data.maxExp) {
		reward.exp = getRandomNumber(data.minExp, data.maxExp);
	}

	// Artifacts

	reward.artifacts = [];

	// Level Up
	if (data.type === 'level-up') {
		reward.levelUp = 1;
	}

	// Skill
	const playerClasses = getPlayerUnit().classes;
	const availableSkillsForPlayer = Object.values(SKILLS_DICT).filter((skill) => {
		return playerClasses.some((cls) => skill.classes.includes(cls));
	});

	return reward;
}

function createNewChestReward(chestId: ChestId): ChestReward {
	const data = CHESTS_DICT[chestId];
	return {
		data,
		opened: false,
		gold: 0,
		exp: 0,
		levelUp: 0,
		artifacts: [],
		goldCost: 0,
		expCost: 0
	};
}
