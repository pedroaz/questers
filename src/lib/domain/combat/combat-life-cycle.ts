/*
Start Quest
    Start Round
        Start Combat
                Unit Action
                Enemy Action
                (repeat)
        End Combat
    End Round
End Quest
*/

import { setAllInitialPowers, startCombatCalculations } from './combat-manager';

import {
	addCombatLog,
	generateNewCombatState,
	getCombatState,
	setCombatState
} from '$lib/states/combat-state.svelte';

export function startQuest() {
	const state = generateNewCombatState();
	setCombatState(state);
	addCombatLog(state, 'Quest Started');
	setCombatState(state);
	startRound();
}

export function endQuest() {
	const state = getCombatState();
	addCombatLog(state, 'Quest Ended');
	setCombatState(state);
}

export async function startRound() {
	setAllInitialPowers();
}

export function endRound() {}

export async function startCombat() {
	const state = getCombatState();
	addCombatLog(state, 'Round Started');
	setCombatState(state);
	await startCombatCalculations();
}

export function endCombat() {}
