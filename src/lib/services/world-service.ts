import { ARCHIPELAGOS_DICT } from '$lib/data/areas';
import { COMPANION_DICT, type Companion } from '$lib/data/companions';
import { recalculateUnit } from '$lib/schemas/unit-calculationts';
import {
	addUnitToWorld,
	getDay,
	getPlayerShip,
	getWorldUnits,
	refreshWorldShips,
	setArchipelago,
	setDay
} from '$lib/states/game-state.svelte';
import { createCompanionUnit } from './factories/object-factory';
import { logCreateWorld, logEndGroup, logStartGroup } from './infra/logger';
import { generateQuests } from './quest-generator';

export type DayPhase = 'night' | 'dawn' | 'day';

// This function gets called when we are starting a new save. So a new world needs to be created from scratch
export function createNewWorld() {
	logCreateWorld('Creating New World');

	setDay(0);
	const ship = getPlayerShip();
	if (!ship) {
		throw new Error('Player Ship not found');
	}
	ship.hp = 30;
	ship.maxHp = 30;
	ship.energy = 3;
	refreshWorldShips();

	logCreateWorld('Creating Companions');

	for (const companion of Object.keys(COMPANION_DICT) as Companion[]) {
		const unit = createCompanionUnit(companion);
		addUnitToWorld(unit);
	}

	const starterPort = ARCHIPELAGOS_DICT['starter-port'];
	console.log(starterPort);
	setArchipelago(starterPort);

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
