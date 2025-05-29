// import { log } from '../infra/logger';
// import { generateUnit } from '../unit/unit-factory';

// import { Party } from '$lib/domain/unit/party';
// import {
// 	addPartyToWorld,
// 	addUnitToWorld,
// 	setPlayerPartyId,
// 	setPlayerUnitId
// } from '$lib/states/game-state.svelte';

// export function createGameState() {
// 	log('Creating new Game!');
// 	// Player
// 	const playerUnit = generateUnit('Bob');
// 	setPlayerUnitId(playerUnit.uuid);
// 	addUnitToWorld(playerUnit);

// 	// Ship
// 	const playerShip = new Party();
// 	playerShip.units.push(playerUnit.uuid);
// 	setPlayerPartyId(playerShip.id);
// 	addPartyToWorld(playerShip);
// }

// export function createCompanionUnit(companion: Companion) {
// 	const companionData = COMPANION_DICT[companion];
// 	const unit = new Unit();
// 	unit.name = companionData.name;
// 	unit.class = companionData.class;
// 	unit.image = companionData.image;
// 	return unit;
// }

// export function createMonsterUnit(monster: Monster): Unit {
// 	const monsterData = JSON.parse(JSON.stringify(MONSTER_DICT[monster])) as MonsterData;
// 	const unit = monsterData.unit;
// 	return unit;
// }

// export function createQuestInstance(questData: QuestData) {
// 	const quest = new QuestInstance();
// 	quest.enabled = true;
// 	quest.data = questData;
// 	return quest;
// }

// export function createSkillInstance(skill: Skill) {
// 	const skillInstance = new SkillInstance();
// 	skillInstance.type = skill;
// 	skillInstance.data = SKILLS_DICT[skill];
// 	return skillInstance;
// }
