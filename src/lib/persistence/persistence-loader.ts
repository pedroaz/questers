/* eslint-disable @typescript-eslint/no-explicit-any */
import { CONFIG_STORAGE_KEY } from './persistence-keys';

import { logPersistence } from '$lib/domain/infra/logger';
import { setConfigState, type GameConfig } from '$lib/states/config-state.svelte';

/********************************************************************************************
In this file we load from local storage and if there is no data, we create a default one.
********************************************************************************************/

export function loadConfig() {
	logPersistence('Loading Config');
	const configString = localStorage.getItem(CONFIG_STORAGE_KEY);
	let obj: GameConfig;
	if (!configString) {
		logPersistence('There is no config in local storage, creating default obj');
		obj = {
			sound: 100,
			music: 100,
			calcDelay: 500
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
	const objString = localStorage.getItem(storageKey);

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
