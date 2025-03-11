import type { AreaInstance } from '$lib/data/areas';
import { MONSTER_DICT } from '$lib/data/monsters';
import { QuestInstance } from '$lib/data/quests';
import { getAreas } from '$lib/states/game-state.svelte';

export function generateQuests() {
	const areas = getAreas();
	for (const area of areas) {
		area.todayQuests = [];
		area.data.questTypes.forEach((questType) => {
			switch (questType) {
				case 'hunt':
					createHuntingQuest(area);
					break;
			}
		});
	}
}

function createHuntingQuest(areaInstance: AreaInstance) {
	const quest = new QuestInstance();
	quest.type = 'hunt';
	quest.enemies = [];

	areaInstance.data.monsters.forEach((monster) => {
		const monsterUnit = MONSTER_DICT[monster].unit;
		quest.enemies.push(monsterUnit);
	});
	areaInstance.todayQuests.push(quest);
}
