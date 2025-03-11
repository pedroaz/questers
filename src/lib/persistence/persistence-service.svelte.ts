import { log, logEndGroup, logPersistence, logStartGroup } from '$lib/services/infra/logger';
import { setGameIsLoaded } from '$lib/states/game-state.svelte';
import { gameStatePersistenceData, getStorageKey } from './persistence-keys';
import { loadConfig, loadFromStorage } from './persistence-loader';
import { persistConfig, persistFromStorage, persistLoading } from './persistence-saver';

export function loadAllStatesFromLocalStorage() {
	logStartGroup('Loading State from Local Storage');
	// Loading
	logPersistence('Game is Loaded False');
	setGameIsLoaded(false);
	persistLoading();
	// Config
	loadConfig();
	persistConfig();
	// // Game State
	loadGameState();
	persistGameState();

	setGameIsLoaded(true);
	persistLoading();
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
	setGameIsLoaded(false);
	gameStatePersistenceData.forEach((data) => {
		const storageKey = getStorageKey(data.key);
		localStorage.removeItem(storageKey);
	});
}

function loadGameState() {
	logStartGroup('Loading Game State');
	gameStatePersistenceData.forEach((data) => {
		loadFromStorage(data.text, data.key, data.defaultValue, data.setFunc);
	});
	logEndGroup();
}
