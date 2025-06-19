import { endCombat } from './combat-life-cycle';
import { setUnitPower } from './power-map';

import { shakeById } from '$lib/animations';
import { MONSTER_DICT } from '$lib/data/monsters/monsters-storage';
import { SKILL_MAP } from '$lib/data/skills/skill-map';
import {
	addCombatLog,
	getCombatState,
	setCombatState,
	type CombatState
} from '$lib/states/combat-state.svelte';
import { getEnemiesIds, getPlayerParty, getPlayerPartyIds } from '$lib/states/player-state.svelte';
import { getUnitById } from '$lib/states/units-state.svelte';
import { isUnitFriendly, sleep } from '$lib/utils';

const CALCULATIONS_DELAY = 200;

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

export function setEnemiesArtifacts() {
	const state = getCombatState();
	for (const enemyId of getEnemiesIds()) {
		const enemy = getUnitById(enemyId);
		const data = MONSTER_DICT[enemy.monsterId!];
		state.enemiesArtifacts = state.enemiesArtifacts.concat(data.artifacts);
	}
}

export async function startCombatCalculations() {
	const state = getCombatState();
	addCombatLog(state, 'Combat Started');
	await calculateEnemies(state);
	await calculatePlayer(state);
	await removeHpEnemies();
	await removeHpParty();
	await endCombat();
}

async function calculateEnemies(state: CombatState) {
	const enemyIds = getEnemiesIds();
	for (const enemyId of enemyIds) {
		await calculateUnit(enemyId, state);
	}
}

async function calculatePlayer(state: CombatState) {
	const playerIds = getPlayerPartyIds();
	for (const playerId of playerIds) {
		await calculateUnit(playerId, state);
	}
}

async function calculateUnit(unitId: string, state: CombatState) {
	const unit = getUnitById(unitId);
	if (isUnitFriendly(unit)) {
		state.partyAttack += unit.power;
	} else {
		state.enemiesAttack += unit.power;
	}
	setCombatState(state);
	shakeById(unitId);
	await sleep(CALCULATIONS_DELAY);

	if (unit.action) {
		const skillInstance = unit.skillInstances.find(
			(skillInstance) => skillInstance.uuid === unit.action?.instanceUuid
		);
		if (!skillInstance) return;
		SKILL_MAP[skillInstance.data.id](unit);
		skillInstance.used = true;
		addCombatLog(state, `${unit.name} used ${skillInstance.data.name}`);
		await sleep(CALCULATIONS_DELAY);
	}
}

async function removeHpEnemies() {
	const state = getCombatState();
	const previousHp = state.enemiesHp;
	state.enemiesHp -= state.partyAttack - state.enemiesDefense;
	if (state.enemiesHp < 0) state.enemiesHp = 0;
	shakeById('enemy-hp');
	addCombatLog(
		state,
		`Enemies: HP ${previousHp} - (${state.partyAttack} - ${state.enemiesDefense}) = ${state.enemiesHp}`
	);
	await sleep(CALCULATIONS_DELAY);
}

async function removeHpParty() {
	const combatState = getCombatState();
	const partyState = getPlayerParty();
	const previousHp = partyState.hp;
	partyState.hp -= combatState.enemiesAttack - combatState.partyDefense;
	if (partyState.hp < 0) partyState.hp = 0;
	shakeById('party-hp');
	addCombatLog(
		combatState,
		`Party: HP ${previousHp} - (${combatState.enemiesAttack} - ${combatState.partyDefense}) = ${partyState.hp}`
	);
	await sleep(CALCULATIONS_DELAY);
}

export function clearActions() {
	getPlayerPartyIds().forEach((id) => {
		getUnitById(id).action = null;
	});

	getEnemiesIds().forEach((id) => {
		getUnitById(id).action = null;
	});
}
