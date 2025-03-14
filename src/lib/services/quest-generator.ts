import { MONSTER_DICT } from '$lib/data/monsters';
import { QuestData, QuestInstance } from '$lib/data/quests';
import { getArchipelago, setQuests } from '$lib/states/game-state.svelte';

export function generateQuests() {
	const archipelago = getArchipelago();

	const quests: QuestInstance[] = [];

	for (const area of archipelago.areasData) {
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
	quest.enemies = [];
	quest.enabled = true;

	if (!questData.monsters) {
		throw new Error('Hunt quest without monster');
	}

	questData.monsters.forEach((monster) => {
		const monsterUnit = MONSTER_DICT[monster].unit;
		quest.enemies.push(monsterUnit);
		quest.maxHp += monsterUnit.baseAttributes.vitality;
	});

	quest.hp = quest.maxHp;

	return quest;
}
