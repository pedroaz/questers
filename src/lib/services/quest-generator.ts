import { AREAS_DICT } from '$lib/data/areas';
import { QuestData, QuestInstance, QuestRound } from '$lib/data/quests';
import { getArchipelago, setQuests } from '$lib/states/game-state.svelte';
import { createMonsterUnit, createQuestInstance } from './factories/object-factory';
import { getRandomNumber } from './random-service';

export function generateQuests() {
	const archipelago = getArchipelago();

	const quests: QuestInstance[] = [];

	// Generate quests for areas
	for (const areaId of archipelago.areas) {
		const area = AREAS_DICT[areaId];
		area.questsData.forEach((questData) => {
			const amountOfQuestsFromThisData = getRandomNumber(questData.minAmount, questData.maxAmount);
			for (let i = 0; i < amountOfQuestsFromThisData; i++) {
				quests.push(createQuest(questData));
			}
		});
	}

	setQuests(quests);
}

function createQuest(questData: QuestData) {
	const quest = createQuestInstance(questData);

	if (!questData.monsters) {
		throw new Error('Hunt quest without monster');
	}

	const amountOfRounds = getRandomNumber(questData.minRounds, questData.maxRounds);

	for (let i = 0; i < amountOfRounds; i++) {
		const round = new QuestRound();
		round.enemies = [];
		round.maxHp = 0;
		round.winCondition = questData.winCondition;

		questData.monsters.forEach((monster) => {
			const monsterUnit = createMonsterUnit(monster);
			monsterUnit.level = monsterUnit.level + i * 2;
			round.enemies.push(monsterUnit);
			round.maxHp += monsterUnit.startingHp;
		});

		quest.rounds.push(round);
	}

	// Add rewards
	quest.goldReward = 3;
	quest.experienceReward = 1;
	quest.chestRewards.push('gold-common');
	quest.chestRewards.push('gold-common');
	quest.chestRewards.push('gold-common');

	return quest;
}
