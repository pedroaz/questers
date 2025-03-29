import { persistGameState } from '$lib/persistence/persistence-service.svelte';
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
	getPlayerQuest,
	setCombatLogs,
	addCombatLog,
	getPlayerShip,
	decreaseEnemyHp,
	setStage
} from '$lib/states/game-state.svelte';
import { delay } from '$lib/utils';
import { endTurnCheck } from './end-turn';
import { organizeActions } from './player-combat-actions';

export class CombatLog {
	message: string = '';
}

export async function startCombat() {
	log('Starting Combat');

	setStage('calculating');

	setCombatLogs([]);

	organizeActions();

	const crew = getCrew();

	for (const unit of crew) {
		const statsPower = Math.round(getUnitPower(unit));
		const statsDefense = Math.round(getUnitDefense(unit));
		addCombatLog(`${unit.name}: [${statsPower}|${statsDefense}]`);
		setTotalCrewPower(getTotalCrewPower() + statsPower);
		setTotalCrewDefense(getTotalCrewDefense() + statsDefense);
		shakeById(unit.uuid);
		await delay(500);
	}

	const enemies = getEnemies();
	for (const unit of enemies) {
		const statsPower = Math.round(getUnitPower(unit));
		const statsDefense = Math.round(getUnitDefense(unit));
		addCombatLog(`${unit.name}: [${statsPower}|${statsDefense}]`);
		setTotalEnemyPower(getTotalEnemyPower() + statsPower);
		setTotalEnemyDefense(getTotalEnemyDefense() + statsDefense);
		shakeById(unit.uuid);
		await delay(500);
	}

	// Crew Power
	const previousCrewPower = getTotalCrewPower();
	setTotalCrewPower(getTotalCrewPower() - getTotalEnemyDefense());
	addCombatLog(`CrewP = ${previousCrewPower} - ${getTotalEnemyDefense()} = ${getTotalCrewPower()}`);

	// Enemy Power
	const previousEnemyPower = getTotalEnemyPower();
	setTotalEnemyPower(getTotalEnemyPower() - getTotalCrewDefense());
	addCombatLog(`EnmP = ${previousEnemyPower} - ${getTotalCrewDefense()} = ${getTotalEnemyPower()}`);

	// Remove Hps
	const ship = getPlayerShip();
	if (!ship) throw new Error('Ship not found');
	ship.hp -= getTotalEnemyPower();

	decreaseEnemyHp(getTotalCrewPower());

	shakeByClass('total-box');

	endTurnCheck();
	persistGameState();
}

function getUnitPower(unit: Unit) {
	const quest = getPlayerQuest();

	const mult = POWER_MULT_MAP[quest!.data.type];

	let statsPower = 0;
	const str = unit.attributes.strength * mult.strength;
	const vit = unit.attributes.leadership * mult.leadership;
	const agi = unit.attributes.agility * mult.agility;
	const int = unit.attributes.intellect * mult.intellect;
	const spi = unit.attributes.spirit * mult.spirit;

	statsPower += str + vit + agi + int + spi;
	return statsPower;
}

function getUnitDefense(unit: Unit) {
	const quest = getPlayerQuest();

	const mult = DEFENSE_MULT_MAP[quest!.data.type];

	let statsDefense = 0;
	const str = unit.attributes.strength * mult.strength;
	const lead = unit.attributes.leadership * mult.leadership;
	const agi = unit.attributes.agility * mult.agility;
	const int = unit.attributes.intellect * mult.intellect;
	const spi = unit.attributes.spirit * mult.spirit;

	statsDefense += str + lead + agi + int + spi;
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
