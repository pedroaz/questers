import { Area, AREAS_DICT } from '$lib/data/areas';
import { Monster } from '$lib/data/monsters';
import { Quest, QUEST_DICT } from '$lib/data/quests';
import type { GameState } from '$lib/states/game-state.svelte';
import { getRandomNumber } from './random-service';
import { v4 as uuidv4 } from 'uuid';

export class QuestInstance {
	uuid: string = uuidv4();
	quest: Quest = Quest.None;
	name: string = '';
	area: Area = Area.None;
	encounters: Encounter[] = [];
}

export class Encounter {
	index: number = 0;
	monsterInstances: MonsterInstance[] = [];
}

export class MonsterInstance {
	monster: Monster = Monster.None;
	level: number = 1;
}

export function generateQuests(gameState: GameState) {
	const res: QuestInstance[] = [];
	const playerLevel = gameState.data.playerUnit.level;

	// For each area
	for (const areaId of Object.values(Area)) {
		const areaData = AREAS_DICT[areaId];

		// Go over all potential quests
		areaData.potentialQuests.forEach((potentialQuest) => {
			if (playerLevel < potentialQuest.minLevel) {
				return;
			}

			// Create a new quest for the area
			const questInstance = new QuestInstance();
			questInstance.area = areaId;
			const questData = QUEST_DICT[potentialQuest.quest];
			questInstance.quest = potentialQuest.quest;
			questInstance.name = questData.name;

			// Define how many encounters will be generated
			const amountOfEncounters = getRandomNumber(2, 5);
			for (let i = 0; i < amountOfEncounters; i++) {
				// Create a new encounter
				const encounter = new Encounter();
				encounter.index = i;

				// Add commons monsters to encounter
				const amountOfCommons = getRandomNumber(4, 7);
				for (let j = 0; j < amountOfCommons; j++) {
					const monsterInstance = new MonsterInstance();
					monsterInstance.monster = questData.commonMonster;
					monsterInstance.level = getRandomNumber(1, 3);
					encounter.monsterInstances.push(monsterInstance);
				}
				questInstance.encounters.push(encounter);
			}
			res.push(questInstance);
		});
	}
	gameState.data.quests = res;
}
