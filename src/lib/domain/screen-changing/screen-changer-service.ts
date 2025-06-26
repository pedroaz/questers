import { ScreenId } from './screens';
import { log } from '../infra/logger';

import { goto } from '$app/navigation';
import { REGIONS_DICT } from '$lib/data/navigation/navigation-storage';
import { persistGameState } from '$lib/persistence/persistence-service.svelte';
import { MusicId, playMusic } from '$lib/sound/sound-service.svelte';
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
			playMusic(MusicId.BackgroundMusic);
			goto('/');
			break;
		case ScreenId.Quest:
			setShowTopBar(true);
			setTopMenuWithQuestName();
			playMusic(MusicId.ForestMusic);
			goto('/game/quest');
			break;
		case ScreenId.JourneySelection:
			setShowTopBar(false);
			setTopMenuText('');
			playMusic(MusicId.BackgroundMusic);
			goto('/game/journey-selection');
			break;
		case ScreenId.Camp:
			setShowTopBar(true);
			setTopMenuWithRegionName();
			playMusic(MusicId.BackgroundMusic);
			goto('/game/camp');
			break;
		case ScreenId.Rewards:
			setShowTopBar(true);
			setTopMenuWithQuestName();
			playMusic(MusicId.BackgroundMusic);
			goto('/game/rewards');
			break;
		case ScreenId.EndDay:
			setShowTopBar(true);
			setTopMenuText('End of the Day');
			playMusic(MusicId.BackgroundMusic);
			goto('/game/end-day');
			break;
		case ScreenId.Loadout:
			setShowTopBar(true);
			setTopMenuText('Loadout');
			playMusic(MusicId.BackgroundMusic);
			goto('/game/loadout');
			break;
		case ScreenId.Story:
			setShowTopBar(false);
			setTopMenuText('');
			playMusic(MusicId.BackgroundMusic);
			goto('/game/story');
			break;
		case ScreenId.Lose:
			setShowTopBar(true);
			setTopMenuText('You? Loser!');
			playMusic(MusicId.BackgroundMusic);
			goto('/game/lose');
			break;
		case ScreenId.Gazette:
			setShowTopBar(true);
			setTopMenuText('Questers Gazette');
			playMusic(MusicId.BackgroundMusic);
			goto('/game/gazette');
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
