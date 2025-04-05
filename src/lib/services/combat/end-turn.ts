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

export function endTurnCheck() {
	const round = getRound();
	if (round.winCondition == 'kill') {
		checkKillQuestEnd();
	}
}

function checkKillQuestEnd() {
	if (getEnemyHp() <= 0) {
		crewWon();
	} else if (getPlayerShip()!.hp <= 0) {
		crewLost();
	}
}

function crewWon() {
	addCombatLog('Crew Won Round');
	const round = getQuestRoundIndex();
	const quest = getPlayerQuest();
	if (round + 1 >= quest!.rounds.length) {
		addCombatLog('Crew Won Quest');
		changeQuestStage('player-won-dialog');
	} else {
		addCombatLog('Next Round');
		setQuestRoundIndex(round + 1);
		changeQuestStage('new-stage-dialog');
	}
	markQuestAsCompleted();
}

function crewLost() {
	addCombatLog('Crew Lost');
	changeQuestStage('player-lost-dialog');
	markQuestAsCompleted();
}

function markQuestAsCompleted() {
	const quest = getPlayerQuest();
	if (!quest) throw new Error('No quest found');
	quest.enabled = false;
}
