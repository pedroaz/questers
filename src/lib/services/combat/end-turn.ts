import { getEnemyHp, getPlayerShip } from '$lib/states/game-state.svelte';

export function endTurn() {
	if (getEnemyHp() <= 0) {
		crewWon();
	}

	if (getPlayerShip()!.hp <= 0) {
		crewLost();
	}
}
function crewWon() {
	throw new Error('Function not implemented.');
}

function crewLost() {
	throw new Error('Function not implemented.');
}
