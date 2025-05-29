/* eslint-disable @typescript-eslint/no-explicit-any */
import { CONFIG_STORAGE_KEY, GAME_IS_LOADED_STORAGE_KEY } from './persistence-keys';

import { logPersistence } from '$lib/domain/infra/logger';
import { getConfigState } from '$lib/states/config-state.svelte';
import { getGameIsLoaded } from '$lib/states/game-state.svelte';

export function persistConfig() {
	logPersistence('Persisting Config');
	localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(getConfigState()));
}

export function persistLoading() {
	logPersistence('Persisting Game is Loaded');
	localStorage.setItem(GAME_IS_LOADED_STORAGE_KEY, JSON.stringify(getGameIsLoaded()));
}

export function persistFromStorage(name: string, storageKey: string, getFunc: () => any) {
	logPersistence(`Persisting ${name}`);
	localStorage.setItem(storageKey, JSON.stringify(getFunc()));
}
