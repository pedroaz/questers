import {
	addCombatLog,
	getCurrentPhase,
	getEnemyHp,
	getPhaseIndex,
	getPlayerQuest,
	getPlayerShip,
	setPhaseIndex
} from '$lib/states/game-state.svelte';
import { changeQuestPhase } from './combat-manager';

export function endTurnCheck() {
	const phase = getCurrentPhase();
	if (phase.winCondition == 'kill') {
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
	addCombatLog('Crew Won Phase');
	const phaseIndex = getPhaseIndex();
	const quest = getPlayerQuest();
	if (phaseIndex + 1 >= quest!.phases.length) {
		addCombatLog('Crew Won Quest');
		changeQuestPhase('player-won-dialog');
	} else {
		addCombatLog('Next Phase');
		setPhaseIndex(phaseIndex + 1);
		changeQuestPhase('new-stage-dialog');
	}
	markQuestAsCompleted();
}

function crewLost() {
	addCombatLog('Crew Lost');
	changeQuestPhase('player-lost-dialog');
	markQuestAsCompleted();
}

function markQuestAsCompleted() {
	const quest = getPlayerQuest();
	if (!quest) throw new Error('No quest found');
	quest.enabled = false;
}
