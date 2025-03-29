import { goto } from '$app/navigation';
import { persistGameState } from '$lib/persistence/persistence-service.svelte';
import { getScreenToLoad, setBackground, setScreenToLoad } from '$lib/states/game-state.svelte';
import { log } from './infra/logger';

export type ScreenType =
	| 'main-menu'
	| 'character-creation'
	| 'cut-scene'
	| 'journey-selection'
	| 'ship'
	| 'quest'
	| 'rewards'
	| 'end-day'
	| 'loadout';

export type BackgroundType = 'none' | 'chevrons' | 'ship';

const BACKGROUND_MAP: Record<ScreenType, BackgroundType> = {
	'main-menu': 'none',
	'character-creation': 'none',
	'cut-scene': 'none',
	'journey-selection': 'none',
	ship: 'none',
	quest: 'none',
	rewards: 'none',
	'end-day': 'none',
	loadout: 'none'
};

export function goToSavedScreen() {
	// check if current url is admin
	if (window.location.pathname.includes('/admin')) {
		return;
	}
	const screenToLoad = getScreenToLoad() as ScreenType;
	setBackground(BACKGROUND_MAP[screenToLoad]);
	switch (screenToLoad) {
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
		case 'rewards':
			goto('/game/rewards');
			break;
		case 'end-day':
			goto('/game/end-day');
			break;
		case 'loadout':
			goto('/game/loadout');
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
