import { getRandomNumber } from '../../rng-service';

import type { ChestId, ChestReward } from '$lib/data/chests/chests-models';
import { CHESTS_DICT } from '$lib/data/chests/chests-storage';
import type { SkillId } from '$lib/data/skills/skills-models';
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
	if (data.type === 'skill') {
		const playerClasses = getPlayerUnit().classes;
		const availableSkillsForPlayer = Object.values(SKILLS_DICT).filter((skill) => {
			return playerClasses.some((cls) => skill.classes.includes(cls));
		});

		const amountOfSkills =
			availableSkillsForPlayer.length > 3 ? 3 : availableSkillsForPlayer.length;

		let totalWeight = 0;

		data.skillChances.forEach((skillChance) => {
			totalWeight += skillChance.weight;
		});

		const selectedSkills: SkillId[] = [];
		for (let i = 0; i < amountOfSkills; i++) {
			const rng = getRandomNumber(0, totalWeight);
			let currentWeight = 0;

			for (let j = 0; j < data.skillChances.length; j++) {
				const skillChance = data.skillChances[j];
				currentWeight += skillChance.weight;

				if (selectedSkills.includes(skillChance.skillId)) continue;

				if (rng <= currentWeight) {
					selectedSkills.push(skillChance.skillId);
					reward.skills.push(skillChance.skillId);
					break;
				}
			}
		}

		console.log(reward.skills);
	}

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
		expCost: 0,
		skills: []
	};
}
