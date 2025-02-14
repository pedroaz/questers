import { goto } from '$app/navigation';
import { persistGameState } from '$lib/persistence/persistence-service';
import { ScreenType } from '$lib/schemas/screen-type';
import { gameState } from '$lib/states/game-state.svelte';

export function goToSavedScreen() {
	switch (gameState.data.screen) {
		case ScreenType.CharacterCreation:
			goto('/game/character-creation');
			break;
		case ScreenType.CutScene:
			goto('/game/cutscene');
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
