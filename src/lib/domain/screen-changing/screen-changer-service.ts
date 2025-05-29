import { ScreenId } from './screens';
import { log } from '../infra/logger';

import { goto } from '$app/navigation';
import { persistGameState } from '$lib/persistence/persistence-service.svelte';
import { getScreenToLoad, setScreenToLoad } from '$lib/states/game-state.svelte';
import { setShowTopBar } from '$lib/states/ui-state.svelte';

export function goToSavedScreen() {
	// check if current url is admin
	if (window.location.pathname.includes('/admin')) {
		return;
	}
	const screenToLoad = getScreenToLoad() as ScreenId;
	log(`Going to saved screen: ${screenToLoad}`);
	switch (screenToLoad) {
		case ScreenId.MainMenu:
			setShowTopBar(false);
			goto('/');
			break;
		case ScreenId.Quest:
			setShowTopBar(true);
			goto('/game/quest');
			break;
		case ScreenId.JourneySelection:
			setShowTopBar(false);
			goto('/game/journey-selection');
			break;
		case ScreenId.Camp:
			setShowTopBar(true);
			goto('/game/camp');
			break;
		case ScreenId.Rewards:
			setShowTopBar(true);
			goto('/game/rewards');
			break;
		case ScreenId.EndDay:
			setShowTopBar(true);
			goto('/game/end-day');
			break;
		case ScreenId.Loadout:
			setShowTopBar(true);
			goto('/game/loadout');
			break;
		case ScreenId.Story:
			setShowTopBar(false);
			goto('/game/story');
			break;
		default:
			break;
	}
}

export function goToScreen(screen: ScreenId) {
	log(`Going to screen ${screen}`);
	setScreenToLoad(screen);
	persistGameState();
	goToSavedScreen();
}
