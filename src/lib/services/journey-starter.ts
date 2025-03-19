import { persistGameState } from '$lib/persistence/persistence-service.svelte';
import { setPlayerCreated } from '$lib/states/game-state.svelte';
import { goToScreen } from './screen-changer-service';
import { createNewWorld } from './world-service';

export function startJourney() {
	createNewWorld();
	setPlayerCreated(true);
	goToScreen('ship');
	persistGameState();
}
