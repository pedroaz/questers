import { gameConfigState, type GameConfig } from '$lib/states/config-state.svelte';
import { loadingState } from '$lib/states/game-state.svelte';

export function persistConfig() {
	localStorage.setItem('config', JSON.stringify(gameConfigState));
}

export function persistLoading() {
	localStorage.setItem('loading', JSON.stringify(loadingState));
}

export function loadAll() {
	loadConfig();
	persistConfig();
	loadingState.loaded = true;
	persistLoading();
}

function loadConfig() {
	const configString = localStorage.getItem('config');
	let configObj: GameConfig;
	if (!configString) {
		configObj = {
			sound: true,
			music: false
		};
	} else {
		configObj = JSON.parse(configString) as GameConfig;
	}

	gameConfigState.music = configObj.music;
	gameConfigState.sound = configObj.sound;
}
