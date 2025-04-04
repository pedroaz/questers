import { ARCHIPELAGOS_DICT } from '$lib/data/areas';
import { COMPANION_DICT, type Companion } from '$lib/data/companions';
import type { Unit } from '$lib/schemas/unit';
import {
	addUnitToWorld,
	getPlayerShip,
	refreshWorldShips,
	setArchipelago,
	setTotalDays,
	setDiscoveredAreas,
	getTotalDays,
	setArchipelagoDays,
	getArchipelagoDays,
	addUnitToPlayerShip
} from '$lib/states/game-state.svelte';
import { nextNight } from './day-service';
import { createCompanionUnit } from './factories/object-factory';
import { logCreateWorld } from './infra/logger';
import { goToScreen } from './screen-changer-service';

export type DayPhase = 'night' | 'dawn' | 'day';

// This function gets called when we are starting a new save. So a new world needs to be created from scratch
export function createNewWorld() {
	logCreateWorld('Creating New World');
	setTotalDays(0);
	createPlayerShip();
	createCompanions();
	createArchipelago();
	nextNight();
}

// This function gets called when we finish loadout
export function newDay() {
	setArchipelagoDays(getArchipelagoDays() + 1);
	setTotalDays(getTotalDays() + 1);
	const ship = getPlayerShip();
	if (!ship) throw new Error('Ship not found');
	ship.energy = ship.maxEnergy;
	refreshWorldShips();
	goToScreen('ship');
}

function createPlayerShip() {
	const ship = getPlayerShip();
	if (!ship) {
		throw new Error('Player Ship not found');
	}
	ship.hp = 30;
	ship.maxHp = 30;
	ship.energy = 3;
	ship.maxEnergy = 3;
	refreshWorldShips();
}

function createCompanions() {
	logCreateWorld('Creating Companions');

	const createdCompanions: Unit[] = [];
	for (const companion of Object.keys(COMPANION_DICT) as Companion[]) {
		const unit = createCompanionUnit(companion);
		addUnitToWorld(unit);
		createdCompanions.push(unit);
	}

	// Add fake companions
	addUnitToPlayerShip(createdCompanions[0].uuid);
	// addUnitToPlayerShip(createdCompanions[1].uuid);
}

function createArchipelago() {
	setArchipelago(ARCHIPELAGOS_DICT['eye-of-the-whale']);
	setDiscoveredAreas(['turtle-island']);
}
