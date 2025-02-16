import { currentEncounter, gameState, getAllUnits } from '$lib/states/game-state.svelte';
import { sortUnits as sortUnitsOrder } from './combat-serice';
import { getRandomNumber } from './random-service';
import { createMonsterUnit } from './unit-factory';

export function initBattle() {
	if (!gameState.data) {
		return;
	}
	generateEnemies();
	addDelays();
	sortUnitsOrder();
}

function generateEnemies() {
	for (let i = 0; i < currentEncounter().monsterInstances.length; i++) {
		const monsterInstance = currentEncounter().monsterInstances[i];
		const monsterUnit = createMonsterUnit(monsterInstance.monster, `#${i}`);
		gameState.data.monsterUnits.push(monsterUnit);
	}
}

function addDelays() {
	getAllUnits().forEach((unit) => {
		unit.delay = getRandomNumber(0, 10);
	});
}
