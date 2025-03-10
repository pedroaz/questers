import { AreaId, AreaInstance, AREAS_DICT } from '$lib/data/areas';
import { Companion, COMPANION_DICT } from '$lib/data/companions';
import { MONSTER_DICT, type Monster } from '$lib/data/monsters';
import { Ship } from '$lib/schemas/ship';
import { Unit, UnitClass } from '$lib/schemas/unit';
import { GameStateData } from '$lib/states/game-state.svelte';

export function createUnit(name: string) {
	const unit = new Unit();
	unit.name = name;
	return unit;
}

export function createCompanionUnit(companion: Companion) {
	const unit = new Unit();
	const companionData = COMPANION_DICT[companion];
	unit.name = companionData.name;
	return unit;
}

export function createMonsterUnit(monster: Monster, sufix: string = '') {
	const unit = new Unit();
	const monsterData = MONSTER_DICT[monster];
	unit.name = monsterData.name + sufix;
	unit.class = UnitClass.MonsterNormal;
	return unit;
}

export function createGameState() {
	const data = new GameStateData();

	// Player
	const playerUnit = createUnit('Bob');
	data.playerUnitId = playerUnit.uuid;
	data.worldUnits.push(playerUnit);

	// Ship
	const playerShip = createShip();
	data.playerShipId = playerShip.id;
	data.worldShips.push(playerShip);
	playerShip.units.push(playerUnit.uuid);

	// World

	return data;
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
