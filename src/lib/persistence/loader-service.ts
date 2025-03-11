import { loadAreaDict } from '$lib/data/areas';
import { loadCompanionDict } from '$lib/data/companions';
import { loadCutSceneDict } from '$lib/data/cut-scenes';
import { loadEquipDict } from '$lib/data/equipments';
import { loadGodDict } from '$lib/data/gods';
import { loadMonsterDict } from '$lib/data/monsters';
import { logEndGroup, logLoadEvent, logStartGroup } from '$lib/services/infra/logger';
import { SAVE_STORAGE_KEY } from './persistence-keys';
import { loadAllStatesFromLocalStorage as loadStateFromLocalStorage } from './persistence-service.svelte';

// Entry Function for Load Game Operation
export function loadGame() {
	logStartGroup('Loading Game');
	loadAllData();
	let index = localStorage.getItem(SAVE_STORAGE_KEY);
	if (!index) {
		index = '0';
	}
	logLoadEvent(`Getting game from local storage with index ${index}`);
	localStorage.setItem(SAVE_STORAGE_KEY, index);
	loadStateFromLocalStorage();
	logEndGroup();
}

function loadAllData() {
	logStartGroup('Loading All Data');
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
	logLoadEvent('Loading Monsters');
	loadMonsterDict();
	logLoadEvent('Loading Data Complete');
	logEndGroup();
}
