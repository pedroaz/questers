import { ARCHIPELAGOS_DICT } from '$lib/data/areas';
import { COMPANION_DICT, type Companion } from '$lib/data/companions';
import {
	addUnitToWorld,
	getPlayerShip,
	refreshWorldShips,
	setArchipelago,
	setDay,
	setDiscoveredAreas
} from '$lib/states/game-state.svelte';
import { nextNight } from './day-service';
import { createCompanionUnit } from './factories/object-factory';
import { logCreateWorld } from './infra/logger';

export type DayPhase = 'night' | 'dawn' | 'day';

// This function gets called when we are starting a new save. So a new world needs to be created from scratch
export function createNewWorld() {
	logCreateWorld('Creating New World');
	setDay(0);
	createShip();
	createCompanions();
	createArchipelago();
	nextNight();
}

function createShip() {
	const ship = getPlayerShip();
	if (!ship) {
		throw new Error('Player Ship not found');
	}
	ship.hp = 30;
	ship.maxHp = 30;
	ship.energy = 3;
	refreshWorldShips();
}

function createCompanions() {
	logCreateWorld('Creating Companions');

	for (const companion of Object.keys(COMPANION_DICT) as Companion[]) {
		const unit = createCompanionUnit(companion);
		addUnitToWorld(unit);
	}
}

function createArchipelago() {
	setArchipelago(ARCHIPELAGOS_DICT['starter-port']);
	setDiscoveredAreas(['tartaruga-island']);
}
