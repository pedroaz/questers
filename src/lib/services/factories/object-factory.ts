import { COMPANION_DICT, type Companion } from '$lib/data/companions';
import { Ship } from '$lib/schemas/ship';
import { Unit } from '$lib/schemas/unit';
import {
	addShipToWorld,
	addUnitToWorld,
	setPlayerShipId,
	setPlayerUnitId
} from '$lib/states/game-state.svelte';
import { log } from '../infra/logger';

export function createGameState() {
	log('Creating new Game!');
	// Player
	const playerUnit = createUnit('Bob');
	playerUnit.image = 'units/warrior.png';
	setPlayerUnitId(playerUnit.uuid);
	addUnitToWorld(playerUnit);

	// Ship
	const playerShip = new Ship();
	playerShip.units.push(playerUnit.uuid);
	setPlayerShipId(playerShip.id);
	addShipToWorld(playerShip);
}

function createUnit(name: string) {
	const unit = new Unit();
	unit.name = name;
	return unit;
}

export function createCompanionUnit(companion: Companion) {
	const companionData = COMPANION_DICT[companion];
	const unit = new Unit();
	unit.name = companionData.name;
	unit.class = companionData.class;
	return unit;
}
