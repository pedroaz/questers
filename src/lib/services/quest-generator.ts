import type { AreaInstance } from '$lib/data/areas';
import { MONSTER_DICT } from '$lib/data/monsters';
import { QuestData, QuestInstance } from '$lib/data/quests';
import { getAreas } from '$lib/states/game-state.svelte';

export function generateQuests() {
	const areas = getAreas();
	for (const area of areas) {
		area.todayQuests = [];
		area.data.questsData.forEach((questData) => {
			switch (questData.type) {
				case 'hunt':
					createHuntingQuest(area, questData);
					break;
			}
		});
	}
}

function createHuntingQuest(areaInstance: AreaInstance, questData: QuestData) {
	const questInstance = new QuestInstance();
	questInstance.type = 'hunt';
	questInstance.enemies = [];

	if (!questData.monsters) {
		throw new Error('Hunt quest without monster');
	}

	questData.monsters.forEach((monster) => {
		const monsterUnit = MONSTER_DICT[monster].unit;
		questInstance.enemies.push(monsterUnit);
	});

	areaInstance.todayQuests.push(questInstance);
}
