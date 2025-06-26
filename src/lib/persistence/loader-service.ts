import { loadAllStatesFromLocalStorage as loadStateFromLocalStorage } from './persistence-service.svelte';

import { loadArtifactsDict } from '$lib/data/artifacts/artifacts-storage';
import { loadBuffsDict } from '$lib/data/buffs/buffs-storage';
import { loadChestsDict } from '$lib/data/chests/chests-storage';
import { loadClassesDict } from '$lib/data/classes/classes-storage';
import { loadCompanionDict } from '$lib/data/companions/companions-storage';
import { loadGodDict } from '$lib/data/gods/gods-storage';
import { loadMonsterDict } from '$lib/data/monsters/monsters-storage';
import { loadRegionsDict, loadAreasDict } from '$lib/data/navigation/navigation-storage';
import { loadSkillDict } from '$lib/data/skills/skills-storage';
import { loadStories } from '$lib/data/story/story-storage';
import { log, logEndGroup, logLoadEvent, logStartGroup } from '$lib/domain/infra/logger';
import { setMusicVolume, setSfxVolume } from '$lib/sound/sound-service.svelte';
import { getConfigState } from '$lib/states/config-state.svelte';
import { setGameIsLoaded } from '$lib/states/game-state.svelte';

export async function loadGame() {
	log('*** STARTING TO LOAD ***');
	setGameIsLoaded(false);

	// Actual Loading
	await loadAllData();
	loadStateFromLocalStorage();
	const config = getConfigState();
	setMusicVolume(config.music);
	setSfxVolume(config.sfx);
	// End actual loading

	setGameIsLoaded(true);
	log('*** LOADED TRUE ***');
	logEndGroup();
}

async function loadAllData() {
	logStartGroup('Loading All Data');
	logLoadEvent('Loading Gods');
	loadGodDict();
	logLoadEvent('Loading Artifacts');
	loadArtifactsDict();
	logLoadEvent('Loading Areas');
	loadRegionsDict();
	loadAreasDict();
	logLoadEvent('Loading Companions');
	loadCompanionDict();
	logLoadEvent('Loading Monsters');
	loadMonsterDict();
	logLoadEvent('Load Skills');
	loadSkillDict();
	logLoadEvent('Loading Chests');
	loadChestsDict();
	logLoadEvent('Loading Classes');
	loadClassesDict();
	logLoadEvent('Load Stories');
	loadStories();
	logLoadEvent('Load Buffs');
	loadBuffsDict();
	logLoadEvent('Loading Data Complete');
	logEndGroup();
}
