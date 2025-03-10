import { goto } from '$app/navigation';
import { persistGameState } from '$lib/persistence/persistence-service';
import { GetGameState } from '$lib/states/game-state.svelte';

export enum ScreenType {
	MainMenu = 'main-menu',
	CharacterCreation = 'character-creation',
	CutScene = 'cut-scene',
	JourneySelection = 'journey-selection',
	Ship = 'ship',
	Quest = 'quest'
}

export function goToSavedScreen() {
	// check if current url is admin
	if (window.location.pathname.includes('/admin')) {
		return;
	}

	switch (GetGameState().data.screenToLoad) {
		case ScreenType.MainMenu:
			goto('/');
			break;
		case ScreenType.CharacterCreation:
			goto('/game/character-creation');
			break;
		case ScreenType.CutScene:
			goto('/game/cutscene');
			break;
		case ScreenType.Quest:
			goto('/game/quest');
			break;
		case ScreenType.JourneySelection:
			goto('/game/journey-selection');
			break;
		case ScreenType.Ship:
			goto('/game/ship');
			break;
		default:
			break;
	}
}

export function goToScreen(screen: ScreenType) {
	GetGameState().data.screenToLoad = screen;
	persistGameState();
	goToSavedScreen();
}
