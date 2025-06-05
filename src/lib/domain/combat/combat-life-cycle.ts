/*

Quests have multiple rounds defined in the data
Rounds can have as many combats as we need

Start Quest
    Start Round
		-- Wait for input
        Start Combat
                Unit Action
                Enemy Action
                (repeat)
        End Combat
    End Round
End Quest
*/

import {
	clearActions,
	setAllInitialPowers,
	setEnemiesInitialHp,
	startCombatCalculations
} from './combat-manager';

import {
	addCombatLog,
	CombatPhase,
	generateNewCombatState,
	getCombatState
} from '$lib/states/combat-state.svelte';

export function startQuest() {
	const state = generateNewCombatState();
	addCombatLog(state, 'Start Quest');
	startRound();
}

export function endQuest() {
	const state = getCombatState();
	addCombatLog(state, 'End Quest');
}

export async function startRound() {
	const state = getCombatState();
	addCombatLog(state, 'Start Round');
	setAllInitialPowers();
	setEnemiesInitialHp();
	startWaitForInput();
}

export function endRound() {
	const state = getCombatState();
	addCombatLog(state, 'End Round');
}

export function startWaitForInput() {
	const state = getCombatState();
	state.phase = CombatPhase.WaitingForInput;
	addCombatLog(state, 'Wait For Input');
	clearActions();
}

export async function startCombat() {
	const state = getCombatState();
	state.phase = CombatPhase.Calculating;
	addCombatLog(state, 'Start Combat');
	await startCombatCalculations();
}

export async function endCombat() {
	const state = getCombatState();
	addCombatLog(state, 'End Combat');
	startWaitForInput();
	clearActions();
}
