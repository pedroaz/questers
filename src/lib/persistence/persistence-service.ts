import { createNewWorld } from '$lib/services/world-service';
import { configState, type GameConfig } from '$lib/states/config-state.svelte';
import { GameState, GetGameState, loadingState, SetGameState } from '$lib/states/game-state.svelte';

const configKey = 'config';
const loadingKey = 'loading';
const gameStateKey = 'gameState';

export function persistConfig() {
	const key = `${configKey}-${localStorage.getItem('save')}`;
	localStorage.setItem(key, JSON.stringify(configState));
}

export function persistLoading() {
	const key = `${loadingKey}-${localStorage.getItem('save')}`;
	localStorage.setItem(key, JSON.stringify(loadingState));
}

export function persistGameState() {
	const key = `${gameStateKey}-${localStorage.getItem('save')}`;
	localStorage.setItem(key, JSON.stringify(GetGameState()));
}

export function clearGameState() {
	localStorage.removeItem(`${gameStateKey}-${localStorage.getItem('save')}`);
}

export function loadAllFromLocalStorage() {
	// Config
	loadConfig();
	persistConfig();

	// Game State
	loadGameState();
	persistGameState();

	// Loading
	loadingState.loaded = true;
	persistLoading();
}

function loadGameState() {
	const key = `${gameStateKey}-${localStorage.getItem('save')}`;
	const gameStateString = localStorage.getItem(key);
	let gameStateObj: GameState;
	if (!gameStateString) {
		// New Game
		gameStateObj = new GameState();
		createNewWorld(gameStateObj);
	} else {
		// Load Game From memory
		gameStateObj = JSON.parse(gameStateString) as GameState;
	}
	SetGameState(gameStateObj);
}

function loadConfig() {
	const key = `${configKey}-${localStorage.getItem('save')}`;
	const configString = localStorage.getItem(key);
	let configObj: GameConfig;
	if (!configString) {
		configObj = {
			sound: true,
			music: false
		};
	} else {
		configObj = JSON.parse(configString) as GameConfig;
	}

	configState.music = configObj.music;
	configState.sound = configObj.sound;
}
