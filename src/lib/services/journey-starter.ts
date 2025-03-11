import { persistGameState } from '$lib/persistence/persistence-service.svelte';
import { getPlayerShipId, setDay } from '$lib/states/game-state.svelte';
import { moveShip } from './movement-service';
import { goToScreen } from './screen-changer-service';
import { createNewWorld } from './world-service';

export function startJourney() {
	createNewWorld();
	setDay(1);
	moveShip(getPlayerShipId(), 'tartaruga-port');
	goToScreen('ship');
	persistGameState();
}
