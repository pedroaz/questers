import { persistGameState } from '$lib/persistence/persistence-service.svelte';
import { goToScreen } from './screen-changer-service';
import { createNewWorld } from './world-service';

export function startJourney() {
	createNewWorld();
	goToScreen('ship');
	persistGameState();
}
