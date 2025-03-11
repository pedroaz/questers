/* eslint-disable @typescript-eslint/no-explicit-any */
import { logPersistence } from '$lib/services/infra/logger';
import { setConfigState, type GameConfig } from '$lib/states/config-state.svelte';
import { CONFIG_STORAGE_KEY, getStorageKey } from './persistence-keys';

/********************************************************************************************
In this file we load from local storage and if there is no data, we create a default one.
********************************************************************************************/

export function loadConfig() {
	logPersistence('Loading Config');
	const key = getStorageKey(CONFIG_STORAGE_KEY);
	const configString = localStorage.getItem(key);
	let obj: GameConfig;
	if (!configString) {
		logPersistence('There is no config in local storage, creating default obj');
		obj = {
			sound: true,
			music: false
		};
	} else {
		logPersistence('Config found in local storage, loading it');
		obj = JSON.parse(configString) as GameConfig;
	}

	setConfigState(obj);
}

export function loadFromStorage(
	name: string,
	storageKey: string,
	defaultObj: any,
	setFunc: (value: any) => void
) {
	logPersistence(`Loading ${name}`);
	const key = getStorageKey(storageKey);
	const objString = localStorage.getItem(key);

	let obj: any;
	if (!objString) {
		logPersistence(`${name} not found in local storage, creating default obj`);
		obj = defaultObj;
	} else {
		logPersistence(`${name} found in local storage, loading it`);
		obj = JSON.parse(objString) as any;
	}
	setFunc(obj);
}
