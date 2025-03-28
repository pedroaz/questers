import { AREAS_DICT } from '$lib/data/areas';
import { QuestData, QuestInstance, QuestPhase } from '$lib/data/quests';
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

	const amountOfPhases = getRandomNumber(questData.minPhasesAmount, questData.maxPhasesAmount);

	for (let phaseIndex = 0; phaseIndex < amountOfPhases; phaseIndex++) {
		const phase = new QuestPhase();
		phase.type = 'normal';
		phase.enemies = [];
		phase.maxHp = 0;
		phase.winCondition = questData.winCondition;

		questData.monsters.forEach((monster) => {
			const monsterUnit = createMonsterUnit(monster);
			monsterUnit.level = monsterUnit.level + phaseIndex * 2;
			phase.enemies.push(monsterUnit);
			phase.maxHp += monsterUnit.baseAttributes.leadership;
		});

		quest.phases.push(phase);
	}

	// Add rewards
	quest.goldReward = 3;
	quest.experienceReward = 1;
	quest.chestRewards.push('gold-common');
	quest.chestRewards.push('gold-common');
	quest.chestRewards.push('gold-common');

	return quest;
}
