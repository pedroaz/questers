import { configState, type GameConfig } from '$lib/states/config-state.svelte';
import { GameState, gameState, loadingState } from '$lib/states/game-state.svelte';

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
	localStorage.setItem(key, JSON.stringify(gameState));
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
		gameStateObj = new GameState();
	} else {
		gameStateObj = JSON.parse(gameStateString) as GameState;
	}
	gameState.data = gameStateObj.data;
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
