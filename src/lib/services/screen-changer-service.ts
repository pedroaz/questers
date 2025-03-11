import { goto } from '$app/navigation';
import { persistGameState } from '$lib/persistence/persistence-service.svelte';
import { getScreenToLoad, setScreenToLoad } from '$lib/states/game-state.svelte';
import { log } from './infra/logger';

export type ScreenType =
	| 'main-menu'
	| 'character-creation'
	| 'cut-scene'
	| 'journey-selection'
	| 'ship'
	| 'quest';

export function goToSavedScreen() {
	// check if current url is admin
	if (window.location.pathname.includes('/admin')) {
		return;
	}
	switch (getScreenToLoad()) {
		case 'main-menu':
			goto('/');
			break;
		case 'character-creation':
			goto('/game/character-creation');
			break;
		case 'cut-scene':
			goto('/game/cutscene');
			break;
		case 'quest':
			goto('/game/quest');
			break;
		case 'journey-selection':
			goto('/game/journey-selection');
			break;
		case 'ship':
			goto('/game/ship');
			break;
		default:
			break;
	}
}

export function goToScreen(screen: ScreenType) {
	log(`Going to screen ${screen}`);
	setScreenToLoad(screen);
	persistGameState();
	goToSavedScreen();
}
