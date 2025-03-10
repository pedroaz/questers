import { AreaId } from '$lib/data/areas';
import { Companion } from '$lib/data/companions';
import { GameState } from '$lib/states/game-state.svelte';
import { createAreaInstance, createCompanionUnit } from './factories/object-factory';
import { logCreateWorld } from './infra/logger';

// This function gets called when we are starting a new save. So a new world needs to be created from scratch
export function createNewWorld(gameState: GameState) {
	logCreateWorld('Creating New World');
	// Initialize companions

	logCreateWorld('Creating Companions');
	Object.values(Companion).forEach((companion) => {
		const unit = createCompanionUnit(companion);
		gameState.data.worldUnits.push(unit);
	});

	logCreateWorld('Creating Areas');
	Object.values(AreaId).forEach((areaId) => {
		const areaInstance = createAreaInstance(areaId);
		gameState.data.areas.push(areaInstance);
	});
}

export function nextDay() {}
