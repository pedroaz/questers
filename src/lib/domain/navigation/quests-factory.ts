import { v4 as uuid4 } from 'uuid';

import type { QuestInstance, QuestRound } from './quests-models';
import { generateMonster } from '../unit/factories/unit-factory';
import type { Unit } from '../unit/unit';

import type { ChestId } from '$lib/data/chests/chests-models';
import { MONSTER_DICT } from '$lib/data/monsters/monsters-storage';
import type { QuestData, AreaId } from '$lib/data/navigation/navigation-models';
import { rollChance } from '$lib/rng-service';

export function createQuestInstance(questData: QuestData, areaId: AreaId) {
	const questInstance: QuestInstance = {
		id: uuid4(),
		areaId: areaId,
		data: questData,
		rounds: [],
		goldReward: 0,
		experienceReward: 0,
		chestRewards: [],
		winCondition: questData.winCondition,
		finished: false
	};

	const rounds: QuestRound[] = [];
	const rewards: ChestId[] = [];
	questData.roundsData.forEach((roundData) => {
		if (!rollChance(roundData.chance)) {
			return;
		}
		const monsters: Unit[] = [];
		roundData.spawns.forEach((spawn) => {
			if (!rollChance(spawn.chance)) {
				return;
			}
			const monster = generateMonster(spawn.monsterId, spawn.level);
			monsters.push(monster);
			const monsterData = MONSTER_DICT[spawn.monsterId];
			monsterData.chestDrops.forEach((chestDrop) => {
				if (!rollChance(chestDrop.chance)) {
					return;
				}
				rewards.push(chestDrop.chestId);
			});
		});
		const maxHp = monsters.reduce((acc, unit) => acc + unit.startingHp, 0);
		rounds.push({
			enemiesIds: monsters.map((m) => m.uuid),
			maxHp: maxHp
		});
	});

	questInstance.rounds = rounds;
	questInstance.chestRewards = rewards;

	return questInstance;
}
