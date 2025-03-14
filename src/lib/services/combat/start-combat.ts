import { DEFENSE_MULT_MAP, POWER_MULT_MAP } from '$lib/schemas/quest-attributes-map';
import type { Unit } from '$lib/schemas/unit';
import { log } from '$lib/services/infra/logger';
import {
	getCrew,
	setTotalCrewPower,
	getTotalCrewPower,
	setTotalCrewDefense,
	getTotalCrewDefense,
	getEnemies,
	setTotalEnemyPower,
	getTotalEnemyPower,
	setTotalEnemyDefense,
	getTotalEnemyDefense,
	getPlayerQuest
} from '$lib/states/game-state.svelte';
import { delay } from '$lib/utils';
import { organizeActions } from './player-combat-actions';

export async function startCombat() {
	log('Starting Combat');
	organizeActions();

	const crew = getCrew();

	for (const unit of crew) {
		const statsPower = getUnitPower(unit);
		const statsDefense = getUnitDefense(unit);
		setTotalCrewPower(getTotalCrewPower() + statsPower);
		setTotalCrewDefense(getTotalCrewDefense() + statsDefense);
		shakeById(unit.uuid);
		await delay(500);
	}

	const enemies = getEnemies();
	for (const unit of enemies) {
		const statsPower = getUnitPower(unit);
		const statsDefense = getUnitDefense(unit);
		setTotalEnemyPower(getTotalEnemyPower() + statsPower);
		setTotalEnemyDefense(getTotalEnemyDefense() + statsDefense);
		shakeById(unit.uuid);
		await delay(500);
	}

	setTotalCrewPower(getTotalCrewPower() - getTotalEnemyDefense());
	setTotalEnemyPower(getTotalEnemyPower() - getTotalCrewDefense());
	setTotalCrewDefense(0);
	setTotalEnemyDefense(0);
	shakeByClass('total-box');
}

function getUnitPower(unit: Unit) {
	const quest = getPlayerQuest();

	const mult = POWER_MULT_MAP[quest!.type];

	let statsPower = 0;
	const str = unit.baseAttributes.strength + mult.strength;
	const vit = unit.baseAttributes.vitality + mult.vitality;
	const agi = unit.baseAttributes.agility + mult.agility;
	const int = unit.baseAttributes.intellect + mult.intellect;
	const spi = unit.baseAttributes.spirit + mult.spirit;

	statsPower += str + vit + agi + int + spi;
	return statsPower;
}

function getUnitDefense(unit: Unit) {
	const quest = getPlayerQuest();

	const mult = DEFENSE_MULT_MAP[quest!.type];

	let statsDefense = 0;
	const str = unit.baseAttributes.strength + mult.strength;
	const vit = unit.baseAttributes.vitality + mult.vitality;
	const agi = unit.baseAttributes.agility + mult.agility;
	const int = unit.baseAttributes.intellect + mult.intellect;
	const spi = unit.baseAttributes.spirit + mult.spirit;

	statsDefense += str + vit + agi + int + spi;
	return statsDefense;
}

function shakeById(id: string) {
	window.dispatchEvent(
		new CustomEvent('shake-by-id', {
			detail: { id }
		})
	);
}

function shakeByClass(id: string) {
	window.dispatchEvent(
		new CustomEvent('shake-by-class', {
			detail: { id }
		})
	);
}
