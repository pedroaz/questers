import { setUnitPower } from './power-map';

import {
	addCombatLog,
	getCombatState,
	setCombatState,
	type CombatState
} from '$lib/states/combat-state.svelte';
import { getEnemiesIds, getPlayerPartyIds } from '$lib/states/player-state.svelte';

export function setAllInitialPowers() {
	const partyIds = getPlayerPartyIds();
	const enemyIds = getEnemiesIds();

	for (const enemyId of enemyIds) {
		setUnitPower(enemyId);
	}
	for (const id of partyIds) {
		setUnitPower(id);
	}
}

export async function startCombatCalculations() {
	const state = getCombatState();
	addCombatLog(state, 'Combat Started');
	setCombatState(state);
}

async function calculateEnemies(state: CombatState) {}

async function calculatePlayer() {}
