import { AREAS_DICT } from '$lib/data/areas';
import { QuestData, QuestInstance, QuestPhase } from '$lib/data/quests';
import { getArchipelago, setQuests } from '$lib/states/game-state.svelte';
import { createMonsterUnit } from './factories/object-factory';

export function generateQuests() {
	const archipelago = getArchipelago();

	const quests: QuestInstance[] = [];

	// Generate quests for areas
	for (const areaId of archipelago.areas) {
		const area = AREAS_DICT[areaId];
		area.questsData.forEach((questData) => {
			switch (questData.type) {
				case 'hunt':
					quests.push(createHuntingQuest(questData));
					break;
			}
		});
	}

	setQuests(quests);
}

function createHuntingQuest(questData: QuestData) {
	const quest = new QuestInstance();
	quest.type = 'hunt';
	quest.enabled = true;
	quest.name = questData.name;

	if (!questData.monsters) {
		throw new Error('Hunt quest without monster');
	}

	for (let phaseIndex = 0; phaseIndex < 2; phaseIndex++) {
		const phase = new QuestPhase();
		phase.type = 'normal';
		phase.enemies = [];
		phase.maxHp = 0;
		phase.winCondition = questData.winCondition;

		questData.monsters.forEach((monster) => {
			// get copy of MonsterData object
			const monsterUnit = createMonsterUnit(monster);
			monsterUnit.level = monsterUnit.level + phaseIndex * 2;
			phase.enemies.push(monsterUnit);
			phase.maxHp += monsterUnit.baseAttributes.leadership;
		});

		quest.phases.push(phase);
	}

	return quest;
}
