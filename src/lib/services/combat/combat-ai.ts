import { resetUnit } from '$lib/schemas/unit-calculationts';
import { getEnemies, setEnemiesOrder } from '$lib/states/game-state.svelte';
import { getRandomNumber } from '../random-service';
import { addUnitAction } from './player-combat-actions';

export function resetEnemies() {
	const enemies = getEnemies();
	enemies.forEach((enemy) => {
		resetUnit(enemy);
	});
}

export function defineEnemiesOrder() {
	const enemies = getEnemies();
	const order = enemies.map((unit) => unit.uuid);
	setEnemiesOrder(order);
}

// This is going to be hard :/
export function defineEnemiesSkills() {
	const enemies = getEnemies();
	enemies.forEach((enemy) => {
		const validSkills = enemy.skillInstances.filter((x) => x.used === false);
		if (validSkills.length > 0) {
			const rnd = getRandomNumber(0, validSkills.length);
			const skillInstance = validSkills[rnd];
			addUnitAction(enemy.uuid, skillInstance);
		}
	});
}
