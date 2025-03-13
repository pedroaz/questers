import { AreaInstance, AREAS_DICT, type AreaId } from '$lib/data/areas';
import { COMPANION_DICT, type Companion } from '$lib/data/companions';
import { MONSTER_DICT, type Monster } from '$lib/data/monsters';
import { Ship } from '$lib/schemas/ship';
import { Unit } from '$lib/schemas/unit';
import {
	addShipToWorld,
	addUnitToWorld,
	setPlayerShipId,
	setPlayerUnitId
} from '$lib/states/game-state.svelte';
import { log } from '../infra/logger';

export function createUnit(name: string) {
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

export function createMonsterUnit(monster: Monster, sufix: string = '') {
	const unit = new Unit();
	const monsterData = MONSTER_DICT[monster];
	unit.name = monsterData.unit.name + sufix;
	unit.class = 'monster-normal';
	return unit;
}

export function createGameState() {
	log('Creating new Game!');
	// Player
	const playerUnit = createUnit('Bob');
	setPlayerUnitId(playerUnit.uuid);
	addUnitToWorld(playerUnit);

	// Ship
	const playerShip = createShip();
	playerShip.units.push(playerUnit.uuid);
	setPlayerShipId(playerShip.id);
	addShipToWorld(playerShip);
}

export function createShip() {
	const ship = new Ship();
	return ship;
}

export function createAreaInstance(areaId: AreaId) {
	const areaData = AREAS_DICT[areaId];
	const areaInstance = new AreaInstance();
	areaInstance.id = areaId;
	areaInstance.data = areaData;
	return areaInstance;
}
