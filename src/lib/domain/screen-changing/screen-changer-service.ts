import { ScreenId } from './screens';
import { log } from '../infra/logger';

import { goto } from '$app/navigation';
import { REGIONS_DICT } from '$lib/data/navigation/navigation-storage';
import { persistGameState } from '$lib/persistence/persistence-service.svelte';
import { getScreenToLoad, setScreenToLoad } from '$lib/states/game-state.svelte';
import { getNavigationData, getCurrentQuest } from '$lib/states/player-state.svelte';
import { setShowTopBar, setTopMenuText } from '$lib/states/ui-state.svelte';

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
			setTopMenuText('');
			goto('/');
			break;
		case ScreenId.Quest:
			setShowTopBar(true);
			setTopMenuWithQuestName();
			goto('/game/quest');
			break;
		case ScreenId.JourneySelection:
			setShowTopBar(false);
			setTopMenuText('');
			goto('/game/journey-selection');
			break;
		case ScreenId.Camp:
			setShowTopBar(true);
			setTopMenuWithRegionName();
			goto('/game/camp');
			break;
		case ScreenId.Rewards:
			setShowTopBar(true);
			setTopMenuWithQuestName();
			goto('/game/rewards');
			break;
		case ScreenId.EndDay:
			setShowTopBar(true);
			setTopMenuWithRegionName();
			goto('/game/end-day');
			break;
		case ScreenId.Loadout:
			setShowTopBar(true);
			setTopMenuWithRegionName();
			goto('/game/loadout');
			break;
		case ScreenId.Story:
			setShowTopBar(false);
			setTopMenuWithRegionName();
			goto('/game/story');
			break;
		case ScreenId.Lose:
			setShowTopBar(true);
			setTopMenuText('You? Loser!');
			goto('/game/lose');
			break;
		default:
			break;
	}
	persistGameState();
}

export function goToScreen(screen: ScreenId) {
	log(`Going to screen ${screen}`);
	setScreenToLoad(screen);
	persistGameState();
	goToSavedScreen();
}

function setTopMenuWithRegionName() {
	setTopMenuText(REGIONS_DICT[getNavigationData().currentRegion]?.name ?? '');
}

function setTopMenuWithQuestName() {
	setTopMenuText(getCurrentQuest().data.name);
}
