import { endCombat } from './combat-life-cycle';
import { setUnitPower } from './power-map';
import { goToScreen } from '../screen-changing/screen-changer-service';
import { ScreenId } from '../screen-changing/screens';

import { shakeById } from '$lib/animations';
import { MONSTER_DICT } from '$lib/data/monsters/monsters-storage';
import { SKILL_MAP } from '$lib/data/skills/skill-map';
import { SKILLS_DICT } from '$lib/data/skills/skills-storage';
import {
	addCombatLog,
	getCombatState,
	setCombatState,
	type CombatState
} from '$lib/states/combat-state.svelte';
import { getConfigState } from '$lib/states/config-state.svelte';
import { getEnemiesIds, getPlayerParty, getPlayerPartyIds } from '$lib/states/player-state.svelte';
import { getUnitById } from '$lib/states/units-state.svelte';
import { getRandomElement, isUnitFriendly, sleep } from '$lib/utils';

async function delay() {
	const delay = getConfigState().calcDelay;
	await sleep(delay);
}

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
	addCombatLog('Combat Started');
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
		addCombatLog(`${unit.name} added ${unit.power} to party attack`);
		state.partyAttack += unit.power;
	} else {
		addCombatLog(`${unit.name} added ${unit.power} to enemies attack`);
		state.enemiesAttack += unit.power;
	}
	setCombatState(state);
	shakeById(unitId);
	await delay();

	if (unit.action) {
		const skillInstance = unit.skillInstances.find(
			(skillInstance) => skillInstance.uuid === unit.action?.instanceUuid
		);
		if (!skillInstance) return;
		SKILL_MAP[skillInstance.data.id](unit);
		skillInstance.used = true;
		addCombatLog(`${unit.name} used skill: ${skillInstance.data.name}`);
		await sleep(100);
		shakeById(unitId);
		await delay();
	}
}

async function removeHpEnemies() {
	const state = getCombatState();
	const previousHp = state.enemiesHp;
	state.enemiesHp -= state.partyAttack - state.enemiesDefense;
	if (state.enemiesHp < 0) state.enemiesHp = 0;
	shakeById('enemy-hp');
	addCombatLog(
		`Enemies: HP ${previousHp} - (${state.partyAttack} - ${state.enemiesDefense}) = ${state.enemiesHp}`
	);
	await delay();
}

async function removeHpParty() {
	const combatState = getCombatState();
	const partyState = getPlayerParty();
	const previousHp = partyState.hp;
	partyState.hp -= combatState.enemiesAttack - combatState.partyDefense;
	if (partyState.hp < 0) partyState.hp = 0;
	shakeById('party-hp');
	addCombatLog(
		`Party: HP ${previousHp} - (${combatState.enemiesAttack} - ${combatState.partyDefense}) = ${partyState.hp}`
	);
	await delay();
}

export function clearActions() {
	getPlayerPartyIds().forEach((id) => {
		getUnitById(id).action = null;
	});

	getEnemiesIds().forEach((id) => {
		getUnitById(id).action = null;
	});
}

export function rollPartySkills() {
	const party = getPlayerParty();
	const partyUnitIds = [party.playerId, ...party.companionsIds];

	partyUnitIds.forEach((id) => {
		const unit = getUnitById(id);
		const availableSkills = unit.skillInstances.filter((skillInstance) => {
			return !skillInstance.used;
		});
		const randomSkill = getRandomElement(availableSkills);
		if (!randomSkill) return;
		unit.action = {
			instanceUuid: randomSkill.uuid,
			skillId: randomSkill.data.id,
			data: SKILLS_DICT[randomSkill.data.id]
		};
	});
}

export function rollEnemiesSkills() {
	const enemies = getEnemiesIds();

	enemies.forEach((id) => {
		const unit = getUnitById(id);
		const availableSkills = unit.skillInstances.filter((skillInstance) => {
			return !skillInstance.used;
		});
		const randomSkill = getRandomElement(availableSkills);
		if (!randomSkill) return;
		unit.action = {
			instanceUuid: randomSkill.uuid,
			skillId: randomSkill?.data.id,
			data: SKILLS_DICT[randomSkill.data.id]
		};
	});
}

export function checkEndOfRound() {
	const state = getCombatState();
	const party = getPlayerParty();
	if (party.hp <= 0) {
		addCombatLog('YOU LOSE');
		goToScreen(ScreenId.Lose);
	}
}
