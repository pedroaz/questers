import { goToSavedScreen } from '$lib/services/screen-changer-service';
import { loadingState } from '$lib/states/game-state.svelte';
import { loadAllFromLocalStorage } from './persistence-service';

export function loadGame() {
	if (loadingState.loaded) return;
	let index = localStorage.getItem('save');
	if (!index) {
		index = '0';
	}
	localStorage.setItem('save', index);
	loadAllFromLocalStorage();
}

export function reload() {
	loadGame();
	goToSavedScreen();
}
