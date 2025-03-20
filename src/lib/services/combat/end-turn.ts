import { getEnemyHp, getPlayerShip, setStage } from '$lib/states/game-state.svelte';
import { newTurn } from './new-turn';

export function endTurnCheck() {
	if (getEnemyHp() <= 0) {
		crewWon();
	} else if (getPlayerShip()!.hp <= 0) {
		crewLost();
	} else {
		newTurn();
	}
}
function crewWon() {
	setStage('player-won-dialog');
}

function crewLost() {
	setStage('player-lost-dialog');
}
