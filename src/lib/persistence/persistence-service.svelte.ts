import { gameStatePersistenceData } from './persistence-keys';
import { loadConfig, loadFromStorage } from './persistence-loader';
import {
	persistConfig,
	persistFromStorage,
	persistLoading as persistLoadingVariable
} from './persistence-saver';

import { log, logEndGroup, logPersistence, logStartGroup } from '$lib/domain/infra/logger';
import { setGameIsLoaded } from '$lib/states/game-state.svelte';

export function loadAllStatesFromLocalStorage() {
	logStartGroup('Loading State from Local Storage');
	// Loading
	logPersistence('Game is Loaded False');

	persistLoadingVariable();
	// Config
	loadConfig();
	persistConfig();
	// // Game State
	loadGameState();
	persistGameState();

	persistLoadingVariable();
	logPersistence('Game is Loaded True');
	logEndGroup();
}

export function persistGameState() {
	logStartGroup('Persisting Game State');
	gameStatePersistenceData.forEach((data) => {
		persistFromStorage(data.text, data.key, data.value);
	});
	logEndGroup();
}

export function clearGameState() {
	log('Clearing Game State');
	localStorage.clear();
	setGameIsLoaded(false);
	gameStatePersistenceData.forEach((data) => {
		localStorage.removeItem(data.key);
	});
}

function loadGameState() {
	logStartGroup('Loading Game State');
	gameStatePersistenceData.forEach((data) => {
		loadFromStorage(data.text, data.key, data.defaultValue, data.setFunc);
	});
	logEndGroup();
}
