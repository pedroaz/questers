import { loadAreaDict } from '$lib/data/areas';
import { loadCompanionDict } from '$lib/data/companions';
import { loadCutSceneDict } from '$lib/data/cut-scenes';
import { loadEquipDict } from '$lib/data/equipments';
import { loadGodDict } from '$lib/data/gods';
import { loadMonsterDict } from '$lib/data/monsters';
import { loadAttributeMapping as loadAttributeQuestMap } from '$lib/data/quests';
import { loadSkillDict } from '$lib/data/skills';
import { log, logEndGroup, logLoadEvent, logStartGroup } from '$lib/services/infra/logger';
import { setGameIsLoaded } from '$lib/states/game-state.svelte';
import { delay } from '$lib/utils';
import { SAVE_STORAGE_KEY } from './persistence-keys';
import { loadAllStatesFromLocalStorage as loadStateFromLocalStorage } from './persistence-service.svelte';

// Entry Function for Load Game Operation
export async function loadGame() {
	log('*** STARTING TO LOAD ***');
	setGameIsLoaded(false);
	await loadAllData();
	let index = localStorage.getItem(SAVE_STORAGE_KEY);
	if (!index) {
		index = '0';
	}
	logLoadEvent(`Getting game from local storage with index ${index}`);
	localStorage.setItem(SAVE_STORAGE_KEY, index);
	loadStateFromLocalStorage();
	log('*** LOADED TRUE ***');
	setGameIsLoaded(true);
	logEndGroup();
}

async function loadAllData() {
	logStartGroup('Loading All Data');

	logLoadEvent('Loading Images');
	await loadAllImages();

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
	logLoadEvent('Load Attribute / Quest Map');
	loadAttributeQuestMap();
	logLoadEvent('Load Skills');
	loadSkillDict();

	logLoadEvent('Loading Data Complete');
	logEndGroup();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const IMAGES_MODULES: Record<string, any> = {};

async function loadAllImages() {
	// TODO: Load Images
	const images = import.meta.glob<{ default: string }>('$lib/assets/**/*.png', { eager: true });
	for (const key in images) {
		IMAGES_MODULES[key] = await import(images[key].default);
	}
	await delay(1000);
}
