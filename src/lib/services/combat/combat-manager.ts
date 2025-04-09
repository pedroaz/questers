import type { QuestStage } from '$lib/data/quests';
import { SKILL_MAP } from '$lib/data/skill-map';
import {
	setTotalCrewPower,
	getTotalCrewPower,
	getTotalCrewDefense,
	setTotalEnemyPower,
	getTotalEnemyPower,
	getTotalEnemyDefense,
	addCombatLog,
	getPlayerShip,
	decreaseEnemyHp,
	setStage,
	getUnitActions,
	getAllOrder
} from '$lib/states/game-state.svelte';
import { delay } from '$lib/utils';
import { defineEnemiesSkills } from './combat-ai';
import {
	firstTurn,
	organizeAllOrder,
	setBasePowers,
	shakeByClass,
	shakeById
} from './combat-utils';
import { endTurnCheck } from './end-turn';

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
	setBasePowers();
	const actions = getUnitActions();
	console.log(actions);
	// Apply Skills
	for (const unitId of getAllOrder()) {
		console.log(unitId);
		const action = actions.find((action) => action.unitId == unitId);
		console.log(action);
		if (action && action.skillInstance?.type) {
			addCombatLog(`Applying skill ${action.skillInstance.type} from ${unitId}`);
			SKILL_MAP[action.skillInstance.type]();
			shakeById(unitId);
			await delay(500);
		}
	}

	// Crew Power
	const previousCrewPower = getTotalCrewPower();
	setTotalCrewPower(getTotalCrewPower() - getTotalEnemyDefense());
	addCombatLog(`CrewP = ${previousCrewPower} - ${getTotalEnemyDefense()} = ${getTotalCrewPower()}`);

	// Enemy Power
	const previousEnemyPower = getTotalEnemyPower();
	setTotalEnemyPower(getTotalEnemyPower() - getTotalCrewDefense());
	addCombatLog(`EnmP = ${previousEnemyPower} - ${getTotalCrewDefense()} = ${getTotalEnemyPower()}`);

	// Remove Hps
	const ship = getPlayerShip();
	if (!ship) throw new Error('Ship not found');
	ship.hp -= getTotalEnemyPower();

	decreaseEnemyHp(getTotalCrewPower());

	shakeByClass('total-box');

	await endTurnCheck();
}
