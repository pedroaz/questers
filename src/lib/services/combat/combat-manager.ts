import type { QuestStage } from '$lib/data/quests';
import { SKILL_MAP } from '$lib/data/skill-map';
import {
	getCrew,
	setTotalCrewPower,
	getTotalCrewPower,
	getTotalCrewDefense,
	getEnemies,
	setTotalEnemyPower,
	getTotalEnemyPower,
	getTotalEnemyDefense,
	addCombatLog,
	getPlayerShip,
	decreaseEnemyHp,
	setStage,
	getUnitActions
} from '$lib/states/game-state.svelte';
import { delay } from '$lib/utils';
import { defineEnemiesSkills } from './combat-ai';
import { organizeAllOrder, setBasePowers, shakeByClass, shakeById } from './combat-utils';
import { endTurnCheck } from './end-turn';
import { organizeActions } from './player-combat-actions';

export class CombatLog {
	message: string = '';
}

export async function changeQuestStage(stage: QuestStage) {
	addCombatLog('Changing stage to ' + stage);
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
	organizeAllOrder();
}

async function waitingForInput() {
	defineEnemiesSkills();
	setBasePowers();
	organizeAllOrder();
}

async function calculating() {
	addCombatLog('Starting Combat');

	setBasePowers();
	organizeActions();
	const actions = getUnitActions();
	// Apply Skills
	for (const unit of [...getCrew(), ...getEnemies()]) {
		const action = actions.find((action) => action.unitId == unit.uuid);
		if (action && action.skillInstance?.type) {
			addCombatLog(`Applying skill ${action.skillInstance.type} from ${unit.name}`);
			SKILL_MAP[action.skillInstance.type]();
			shakeById(unit.uuid);
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
