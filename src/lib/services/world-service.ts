import { AREAS_DICT, type AreaId } from '$lib/data/areas';
import { COMPANION_DICT, type Companion } from '$lib/data/companions';
import { recalculateUnit } from '$lib/schemas/unit-calculationts';
import {
	addAreaToWorld,
	addUnitToWorld,
	getDay,
	getPlayerShip,
	getUnitsNotOnPlayerBoat,
	getWorldUnits,
	moveUnitToPlayerShip,
	setDay
} from '$lib/states/game-state.svelte';
import { createAreaInstance, createCompanionUnit } from './factories/object-factory';
import { logCreateWorld, logEndGroup, logStartGroup } from './infra/logger';
import { generateQuests } from './quest-generator';

export type DayPhase = 'night' | 'dawn' | 'day';

// This function gets called when we are starting a new save. So a new world needs to be created from scratch
export function createNewWorld() {
	logCreateWorld('Creating New World');

	setDay(0);
	const ship = getPlayerShip();
	ship.hp = 30;
	ship.energy = 3;
	ship.endurance = 200;

	logCreateWorld('Creating Companions');

	for (const companion of Object.keys(COMPANION_DICT) as Companion[]) {
		const unit = createCompanionUnit(companion);
		addUnitToWorld(unit);
	}

	// add 4 companions to the ship for testing
	const freeUnits = getUnitsNotOnPlayerBoat();
	for (let i = 0; i < 4; i++) {
		const unit = freeUnits[i];
		moveUnitToPlayerShip(unit.uuid);
	}

	for (const areaId of Object.keys(AREAS_DICT) as AreaId[]) {
		const areaInstance = createAreaInstance(areaId);
		addAreaToWorld(areaInstance);
	}

	nextNight();
}

export function nextNight() {
	setDay(getDay() + 1);
	generateQuests();

	logStartGroup('Recalculating Units');
	getWorldUnits().forEach((unit) => {
		recalculateUnit(unit);
	});
	logEndGroup();

	// Reset Ship
	// Reset Skills from units
}

export function startDawn() {}

export function startDay() {}
