import { defineEnemiesSkills } from './combat-ai';
import { firstTurn, organizeAllOrder, setBasePowers, shakeById } from './combat-utils';
import { endTurnCheck } from './end-turn';
import type { QuestStage } from '../navigation/quests-models';

import { SKILL_MAP } from '$lib/data/skills/skill-map';
import {
	setTotalCrewPower,
	getTotalCrewPower,
	getTotalCrewDefense,
	setTotalEnemyPower,
	getTotalEnemyPower,
	getTotalEnemyDefense,
	addCombatLog,
	getPlayerParty,
	decreaseEnemyHp,
	setStage,
	getUnitActions,
	getAllOrder
} from '$lib/states/game-state.svelte';
import { sleep } from '$lib/utils';

export class CombatLog {
	message: string = '';
}

export async function changeQuestStage(stage: QuestStage) {
	addCombatLog('Changing stage to ' + stage);
	setStage(stage);
	switch (stage) {
		case 'new-round':
			await newStage();
			break;
		case 'waiting-for-input':
			await waitingForInput();
			break;
		case 'calculating':
			await calculating();
			break;
		case 'player-won':
			break;
		case 'player-lost':
			break;
	}
	// persistGameState();
}

async function newStage() {
	organizeAllOrder();
	await firstTurn();
}

async function waitingForInput() {
	defineEnemiesSkills();
	setBasePowers();
	organizeAllOrder();
}

async function calculating() {
	addCombatLog('Starting Combat');

	// Initialize
	setBasePowers();

	// Apply Skills
	const actions = getUnitActions();
	for (const unitId of getAllOrder()) {
		console.log(unitId);
		const action = actions.find((action) => action.unitId == unitId);
		console.log(action);
		if (action && action.skillInstance?.type) {
			addCombatLog(`Applying skill ${action.skillInstance.type} from ${unitId}`);
			SKILL_MAP[action.skillInstance.type]();
			shakeById(unitId);
			await sleep(500);
		}
	}

	// Apply total Crew Power
	const crewFinalPower = getTotalCrewPower() - getTotalEnemyDefense();
	setTotalCrewPower(crewFinalPower);

	// Apply total Enemy Power
	const enemyFinalPower = getTotalEnemyPower() - getTotalCrewDefense();
	setTotalEnemyPower(enemyFinalPower);

	await sleep(500);

	// Remove Hps
	const party = getPlayerParty();
	if (!party) throw new Error('Ship not found');
	party.hp -= getTotalEnemyPower();
	decreaseEnemyHp(getTotalCrewPower());

	// End Turn
	await endTurnCheck();
}
