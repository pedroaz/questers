/*

Quests have multiple rounds defined in the data
Rounds can have as many combats as we need

Start Quest
    Start Round
		LOOP
			Before Combat
			Wait for input
			Start Combat
					Unit Action
					Enemy Action
					(repeat)
			End Combat
		END LOOP
    End Round
End Quest
*/

import {
	checkEnd,
	clearActions,
	EndType,
	rollEnemiesSkills,
	rollPartySkills,
	setAllInitialPowers,
	setEnemiesArtifacts,
	setEnemiesInitialHp,
	startCombatCalculations
} from './combat-manager';

import {
	addCombatLog,
	CombatPhase,
	generateNewCombatState,
	getCombatState,
	setCombatState
} from '$lib/states/combat-state.svelte';

export function startQuest() {
	const state = generateNewCombatState();
	setCombatState(state);
	addCombatLog('Start Quest');
	startRound();
}

export function endQuest() {
	addCombatLog('End Quest');
}

export async function startRound() {
	const state = getCombatState();
	state.skillRolls = 5;
	addCombatLog('Start Round');
	setAllInitialPowers();
	setEnemiesInitialHp();
	setEnemiesArtifacts();
	beforeCombat();
	startWaitForInput();
}

export function endRound() {
	addCombatLog('End Round');
}

export function startWaitForInput() {
	const state = getCombatState();
	state.phase = CombatPhase.WaitingForInput;
	addCombatLog('Wait For Input');
}

export async function startCombat() {
	const state = getCombatState();
	state.phase = CombatPhase.Calculating;
	addCombatLog('Start Combat');
	await startCombatCalculations();
}

export async function endCombat() {
	const state = getCombatState();
	addCombatLog('End Combat');
	addCombatLog(` --- FINISHED COMBAT ${state.combatIndex} ---`);
	state.combatIndex++;
	setCombatState(state);
	const endType = checkEnd();

	switch (endType) {
		case EndType.Win:
			await win();
			break;
		case EndType.Lose:
			await lose();
			break;
		case EndType.NextRound:
			startRound();
			break;
		case EndType.NotEnd:
			beforeCombat();
			startWaitForInput();
			break;
	}
}

export async function beforeCombat() {
	addCombatLog('Before Combat');
	clearActions();
	rollPartySkills();
	rollEnemiesSkills();
}

export async function win() {
	addCombatLog('You Win!');
	const state = getCombatState();
	state.phase = CombatPhase.Won;
	setCombatState(state);
}

export async function lose() {
	addCombatLog('You Lose!');
	const state = getCombatState();
	state.phase = CombatPhase.Lost;
	setCombatState(state);
}
