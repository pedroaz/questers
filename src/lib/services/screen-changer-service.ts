import { goto } from '$app/navigation';
import { persistGameState } from '$lib/persistence/persistence-service';
import { ScreenType } from '$lib/schemas/screen-type';
import { gameState } from '$lib/states/game-state.svelte';

export function goToSavedScreen() {
	switch (gameState.data.screen) {
		case ScreenType.MainMenu:
			goto('/');
			break;
		case ScreenType.CharacterCreation:
			goto('/game/character-creation');
			break;
		case ScreenType.CutScene:
			goto('/game/cutscene');
			break;
		case ScreenType.Area:
			goto('/game/area');
			break;
		case ScreenType.Quest:
			goto('/game/quest');
			break;
		case ScreenType.Combat:
			goto('/game/combat');
			break;
		default:
			break;
	}
}

export function goToScreen(screen: ScreenType) {
	gameState.data.screen = screen;
	persistGameState();
	goToSavedScreen();
}
