import { ChestType, type ChestReward } from '$lib/data/chests/chests-models';
import type { SkillId } from '$lib/data/skills/skills-models';
import { generateChestRewards } from '$lib/domain/rewards/chest-reward-factory';
import { getPlayerParty, getPlayerUnit, setPlayerParty } from '$lib/states/player-state.svelte';

export function initRewards() {
	const playerParty = getPlayerParty();
	if (playerParty.rewards.length > 0) return;
	playerParty.chestsToOpen.forEach((chest) => {
		playerParty.rewards.push(generateChestRewards(chest));
	});

	const rewardOrder: Record<ChestType, number> = {
		[ChestType.Gold]: 0,
		[ChestType.Exp]: 1,
		[ChestType.LevelUp]: 2,
		[ChestType.Skill]: 3,
		[ChestType.Artifact]: 4
	};
	playerParty.rewards.sort((a, b) => {
		return rewardOrder[a.data!.type] - rewardOrder[b.data!.type];
	});
	setPlayerParty(playerParty);
}

export function takeResourceReward(reward: ChestReward) {
	const playerParty = getPlayerParty();
	playerParty.gold += reward.gold;
	playerParty.experience += reward.exp;
	if (reward.levelUp > 0) {
		playerParty.level += reward.levelUp;
	}
	playerParty.chestsToOpen = playerParty.chestsToOpen.filter((chest) => chest !== reward.data?.id);
	reward.opened = true;
	setPlayerParty(playerParty);
}

export function takeSkillReward(skillId: SkillId) {
	const playerUnit = getPlayerUnit();
	playerUnit.skills.push(skillId);
	console.log(playerUnit.skills);
}
