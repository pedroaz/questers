import {
	addCombatLog,
	getRound,
	getEnemyHp,
	getQuestRoundIndex,
	getPlayerQuest,
	getPlayerShip,
	setQuestRoundIndex
} from '$lib/states/game-state.svelte';
import { changeQuestStage } from './combat-manager';

export async function endTurnCheck() {
	const round = getRound();
	if (round.winCondition == 'kill') {
		await checkKillQuestEnd();
	}
}

async function checkKillQuestEnd() {
	if (getEnemyHp() <= 0) {
		await crewWon();
	} else if (getPlayerShip()!.hp <= 0) {
		await crewLost();
	}
}

async function crewWon() {
	addCombatLog('Crew Won Round');
	const round = getQuestRoundIndex();
	const quest = getPlayerQuest();
	if (round + 1 >= quest!.rounds.length) {
		addCombatLog('Crew Won Quest');
		await changeQuestStage('player-won-dialog');
	} else {
		addCombatLog('Next Round');
		setQuestRoundIndex(round + 1);
		await changeQuestStage('new-stage-dialog');
	}
	markQuestAsCompleted();
}

async function crewLost() {
	addCombatLog('Crew Lost');
	await changeQuestStage('player-lost-dialog');
	markQuestAsCompleted();
}

function markQuestAsCompleted() {
	const quest = getPlayerQuest();
	if (!quest) throw new Error('No quest found');
	quest.enabled = false;
}
