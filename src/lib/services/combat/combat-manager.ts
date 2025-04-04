import type { QuestStage } from '$lib/data/quests';
import { log } from '$lib/services/infra/logger';
import {
	getCrew,
	setTotalCrewPower,
	getTotalCrewPower,
	getTotalCrewDefense,
	getEnemies,
	setTotalEnemyPower,
	getTotalEnemyPower,
	getTotalEnemyDefense,
	setCombatLogs,
	addCombatLog,
	getPlayerShip,
	decreaseEnemyHp,
	setStage
} from '$lib/states/game-state.svelte';
import { delay } from '$lib/utils';
import { defineEnemiesOrder, defineEnemiesSkills, resetEnemies } from './combat-ai';
import { organizeAllOrder, setBasePowers, shakeByClass, shakeById } from './combat-utils';
import { endTurnCheck } from './end-turn';
import { organizeActions } from './player-combat-actions';

export class CombatLog {
	message: string = '';
}

export async function changeQuestPhase(stage: QuestStage) {
	setStage(stage);
	switch (stage) {
		case 'new-stage-dialog':
			newStage();
			break;
		case 'waiting-for-input':
			await waitingForInput();
			break;
		case 'calculating':
			await calculating();
			break;
		case 'player-won-dialog':
			break;
		case 'player-lost-dialog':
			break;
	}
	// persistGameState();
}

function newStage() {
	resetEnemies();
	defineEnemiesOrder();
	organizeAllOrder();
}

async function waitingForInput() {
	defineEnemiesSkills();
	setBasePowers();
	defineEnemiesOrder();
	organizeAllOrder();
}

async function calculating() {
	log('Starting Combat');

	setCombatLogs([]);
	setBasePowers();
	organizeActions();

	// Apply Skills
	for (const unit of getCrew()) {
		shakeById(unit.uuid);
		await delay(500);
	}
	for (const enemy of getEnemies()) {
		shakeById(enemy.uuid);
		await delay(500);
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

	endTurnCheck();
}
