import { AREAS_DICT, type AreaId } from '$lib/data/areas';
import { COMPANION_DICT, type Companion } from '$lib/data/companions';
import { addAreaToWorld, addUnitToWorld, getDay, setDay } from '$lib/states/game-state.svelte';
import { createAreaInstance, createCompanionUnit } from './factories/object-factory';
import { logCreateWorld } from './infra/logger';
import { generateQuests } from './quest-generator';

// This function gets called when we are starting a new save. So a new world needs to be created from scratch
export function createNewWorld() {
	logCreateWorld('Creating New World');

	setDay(0);

	logCreateWorld('Creating Companions');

	for (const companion of Object.keys(COMPANION_DICT) as Companion[]) {
		const unit = createCompanionUnit(companion);
		addUnitToWorld(unit);
	}

	for (const areaId of Object.keys(AREAS_DICT) as AreaId[]) {
		const areaInstance = createAreaInstance(areaId);
		addAreaToWorld(areaInstance);
	}

	nextDay();
}

export function nextDay() {
	setDay(getDay() + 1);
	generateQuests();
}
