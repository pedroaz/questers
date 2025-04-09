import { getEnemies, setEnemiesOrder } from '$lib/states/game-state.svelte';
import { getRandomNumber } from '../random-service';
import { addUnitAction } from './combat-utils';

// This is going to be hard :/
export function defineEnemiesSkills() {
	const enemies = getEnemies();

	enemies.forEach((enemy) => {
		const validSkills = enemy.skillInstances.filter((x) => x.used === false);
		if (validSkills.length > 0) {
			const rnd = getRandomNumber(0, validSkills.length - 1);
			const skillInstance = validSkills[rnd];
			addUnitAction(enemy.uuid, skillInstance);
		}
	});

	const order = enemies.map((unit) => unit.uuid);
	setEnemiesOrder(order);
}
