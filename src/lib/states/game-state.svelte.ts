import { CutScene } from '$lib/data/cut-scenes';
import { AreaInstance } from '$lib/data/areas';
import { Unit } from '$lib/schemas/unit';
import { ScreenType } from '$lib/services/screen-changer-service';
import { God } from '$lib/data/gods';
import type { Ship } from '$lib/schemas/ship';
import { createGameState } from '$lib/services/factories/object-factory';

export class GameState {
	data: GameStateData = createGameState();
}

export class GameStateData {
	constructor() {}
	// General Stuff
	playerCreated: boolean = false;
	screenToLoad: ScreenType = ScreenType.MainMenu;
	godId: God = God.None;
	difficulty: number = 0;

	// Cut Scene
	cutSceneToLoad: CutScene = CutScene.None;

	// Time
	day: number = 1;
	worldAge: number = 1;

	// World
	areas: AreaInstance[] = [];

	// Player
	playerUnitId: string = '';
	playerShipId: string = '';

	// World Units
	worldUnits: Unit[] = [];
	worldShips: Ship[] = [];
}

export const loadingState = $state({
	loaded: false
});

const gameState = $state({} as GameState);

export function GetGameState() {
	return gameState;
}

export function SetGameState(newState: GameState) {
	gameState.data = newState.data;
}

export function GetPlayerUnit() {
	return gameState.data.worldUnits.find((unit) => unit.uuid == GetGameState().data.playerUnitId)!;
}

export function GetPlayerArea() {
	const area = gameState.data.areas.find((area) =>
		area.shipsInArea.includes(gameState.data.playerShipId)
	)!;
	return area;
}

export function GetUnitIdsFromShip(shipId: string) {
	return gameState.data.worldShips.find((ship) => ship.id == shipId)!.units;
}

export function GetUnitsFromShip(shipId: string) {
	return gameState.data.worldUnits.filter((unit) => GetUnitIdsFromShip(shipId).includes(unit.uuid));
}
