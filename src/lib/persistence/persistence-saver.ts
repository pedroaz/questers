/* eslint-disable @typescript-eslint/no-explicit-any */
import { logPersistence } from '$lib/services/infra/logger';
import { getConfigState } from '$lib/states/config-state.svelte';
import { getGameIsLoaded } from '$lib/states/game-state.svelte';
import { CONFIG_STORAGE_KEY, getStorageKey, GAME_IS_LOADED_STORAGE_KEY } from './persistence-keys';

export function persistConfig() {
	logPersistence('Persisting Config');
	const key = getStorageKey(CONFIG_STORAGE_KEY);
	localStorage.setItem(key, JSON.stringify(getConfigState()));
}

export function persistLoading() {
	logPersistence('Persisting Game is Loaded');
	const key = getStorageKey(GAME_IS_LOADED_STORAGE_KEY);
	localStorage.setItem(key, JSON.stringify(getGameIsLoaded()));
}

export function persistFromStorage(name: string, storageKey: string, getFunc: () => any) {
	logPersistence(`Persisting ${name}`);
	const key = getStorageKey(storageKey);
	localStorage.setItem(key, JSON.stringify(getFunc()));
}
