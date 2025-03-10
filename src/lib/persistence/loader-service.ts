import { loadAreaDict } from '$lib/data/areas';
import { loadCompanionDict } from '$lib/data/companions';
import { loadCutSceneDict } from '$lib/data/cut-scenes';
import { loadEquipDict } from '$lib/data/equipments';
import { loadGodDict } from '$lib/data/gods';
import { logLoadEvent } from '$lib/services/infra/logger';
import { goToSavedScreen } from '$lib/services/screen-changer-service';
import { loadingState } from '$lib/states/game-state.svelte';
import { loadAllFromLocalStorage } from './persistence-service';

export function loadGame() {
	logLoadEvent('Loading Game');
	loadAllData();
	logLoadEvent('Loading Game Complete');
	if (loadingState.loaded) {
		logLoadEvent('Game already loaded');
		return;
	}
	logLoadEvent('Getting game from local storage');
	let index = localStorage.getItem('save');
	if (!index) {
		index = '0';
	}
	logLoadEvent(`Index: ${index}`);
	localStorage.setItem('save', index);
	loadAllFromLocalStorage();
	logLoadEvent('Game Loaded from local storage');
}

export function reload() {
	logLoadEvent('Reloading Game');
	loadGame();
	goToSavedScreen();
}
function loadAllData() {
	logLoadEvent('Loading All Data');
	logLoadEvent('Loading Cut Scenes');
	loadCutSceneDict();
	logLoadEvent('Loading Gods');
	loadGodDict();
	logLoadEvent('Loading Equipments');
	loadEquipDict();
	logLoadEvent('Loading Areas');
	loadAreaDict();
	logLoadEvent('Loading Companions');
	loadCompanionDict();
}
