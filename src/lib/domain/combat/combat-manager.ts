import { setUnitPower } from './power-map';

import {
	addCombatLog,
	getCombatState,
	setCombatState,
	type CombatState
} from '$lib/states/combat-state.svelte';
import { getEnemiesIds, getPlayerPartyIds } from '$lib/states/player-state.svelte';
import { getUnitById } from '$lib/states/units-state.svelte';
import { sleep } from '$lib/utils';

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

export function setEnemiesInitialHp() {
	let hp = 0;
	const enemyIds = getEnemiesIds();
	const state = getCombatState();
	for (const enemyId of enemyIds) {
		const enemy = getUnitById(enemyId);
		hp += enemy.startingHp;
	}
	state.enemiesHp = hp;
	state.enemiesMaxHp = hp;
	setCombatState(state);
}

const CALCULATIONS_DELAY = 0;

export async function startCombatCalculations() {
	const state = getCombatState();
	addCombatLog(state, 'Combat Started');
	await calculateEnemies(state);
	await calculatePlayer(state);
}

async function calculateEnemies(state: CombatState) {
	addCombatLog(state, 'Enemies Calculation Started');
	const enemyIds = getEnemiesIds();
	for (const enemyId of enemyIds) {
		const enemy = getUnitById(enemyId);
		addCombatLog(state, `${enemy.name} Power is ${enemy.power}`);
		state.enemiesPower += enemy.power;
		setCombatState(state);
		await sleep(CALCULATIONS_DELAY);
	}
}

async function calculatePlayer(state: CombatState) {
	const playerIds = getPlayerPartyIds();
	for (const playerId of playerIds) {
		const player = getUnitById(playerId);
		addCombatLog(state, `${player.name} Power is ${player.power}`);
		addCombatLog(state, `${player.name} Action is ${player.action}`);
		state.partyPower += player.power;
		setCombatState(state);
		await sleep(CALCULATIONS_DELAY);
	}
}

export function clearActions() {
	getPlayerPartyIds().forEach((id) => {
		getUnitById(id).action = null;
	});

	getEnemiesIds().forEach((id) => {
		getUnitById(id).action = null;
	});
}
