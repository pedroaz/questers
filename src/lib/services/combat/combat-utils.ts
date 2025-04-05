import { POWER_MULT_MAP } from '$lib/schemas/quest-attributes-map';
import type { Unit } from '$lib/schemas/unit';
import {
	getCrew,
	getCrewOrder,
	getRound,
	getEnemies,
	getEnemiesOrder,
	getPlayerQuest,
	getTotalCrewPower,
	getTotalEnemyPower,
	setAllOrder,
	setEnemyHp,
	setEnemyMaxHp,
	setTotalCrewPower,
	setTotalEnemyPower
} from '$lib/states/game-state.svelte';
import { roundNumber } from '$lib/utils';
import { changeQuestStage } from './combat-manager';

export function getUnitPower(unit: Unit) {
	const quest = getPlayerQuest();

	const mult = POWER_MULT_MAP[quest!.data.type];

	let statsPower = 0;
	const str = unit.attributes.strength * mult.strength;
	const vit = unit.attributes.leadership * mult.leadership;
	const agi = unit.attributes.agility * mult.agility;
	const int = unit.attributes.intellect * mult.intellect;
	const spi = unit.attributes.spirit * mult.spirit;

	statsPower += str + vit + agi + int + spi;
	return roundNumber(statsPower);
}

export function setBasePowers() {
	setTotalCrewPower(0);
	for (const unit of getCrew()) {
		const statsPower = getUnitPower(unit);
		setTotalCrewPower(getTotalCrewPower() + statsPower);
	}

	setTotalEnemyPower(0);
	for (const enemy of getEnemies()) {
		const statsPower = getUnitPower(enemy);
		setTotalEnemyPower(getTotalEnemyPower() + statsPower);
	}
}

export function shakeById(id: string) {
	window.dispatchEvent(
		new CustomEvent('shake-by-id', {
			detail: { id }
		})
	);
}

export function shakeByClass(id: string) {
	window.dispatchEvent(
		new CustomEvent('shake-by-class', {
			detail: { id }
		})
	);
}

export function organizeAllOrder() {
	const res: string[] = [];
	const crew = getCrewOrder();
	const enemies = getEnemiesOrder();
	const maxLength = Math.max(crew.length, enemies.length);
	for (let i = 0; i < maxLength; i++) {
		if (i < crew.length) res.push(crew[i]);
		if (i < enemies.length) res.push(enemies[i]);
	}
	setAllOrder(res);
}

export async function firstTurn() {
	const round = getRound();
	setEnemyMaxHp(round.maxHp);
	setEnemyHp(round.maxHp);
	await changeQuestStage('waiting-for-input');
}
