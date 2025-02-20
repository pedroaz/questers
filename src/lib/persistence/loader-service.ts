import { loadAreaDict } from '$lib/data/areas';
import { loadCutSceneDict } from '$lib/data/cut-scenes';
import { loadEquipDict } from '$lib/data/equipments';
import { loadMonsterDict } from '$lib/data/monsters';
import { loadQuestDict } from '$lib/data/quests';
import { goToSavedScreen } from '$lib/services/screen-changer-service';
import { loadingState } from '$lib/states/game-state.svelte';
import { loadAllFromLocalStorage } from './persistence-service';

export function loadGame() {
	loadAllData();
	if (loadingState.loaded) return;
	let index = localStorage.getItem('save');
	if (!index) {
		index = '0';
	}
	localStorage.setItem('save', index);
	loadAllFromLocalStorage();
}

export function reload() {
	loadGame();
	goToSavedScreen();
}
function loadAllData() {
	loadMonsterDict();
	loadQuestDict();
	loadCutSceneDict();
	loadEquipDict();
	loadAreaDict();
}
