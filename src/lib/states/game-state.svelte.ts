import { AreaInstance } from '$lib/data/areas';
import { Unit } from '$lib/schemas/unit';
import type { Ship } from '$lib/schemas/ship';
import type { ScreenType } from '$lib/services/screen-changer-service';
import type { CutScene } from '$lib/data/cut-scenes';
import type { God } from '$lib/data/gods';

/**
 * Game Is Loaded
 */
let _gameIsLoaded = $state(true);
export function getGameIsLoaded() {
	return _gameIsLoaded;
}
export function setGameIsLoaded(value: boolean) {
	_gameIsLoaded = value;
}

/**
 * If Player is created
 */
let _playerCreated = $state(false);
export function getPlayerCreated() {
	return _playerCreated;
}
export function setPlayerCreated(value: boolean) {
	_playerCreated = value;
}

/**
 * Screen to Load
 */
let _screenToLoad = $state('main-menu');
export function getScreenToLoad() {
	return _screenToLoad;
}
export function setScreenToLoad(screen: ScreenType) {
	_screenToLoad = screen;
}

/**
 * Current God Id
 */
let _godId = $state('none');
export function getGodId() {
	return _godId;
}
export function setGodId(value: God) {
	_godId = value;
}

/**
 * Current Difficulty
 */
let _difficulty = $state(0);
export function getDifficulty() {
	return _difficulty;
}
export function setDifficulty(value: number) {
	_difficulty = value;
}

/**
 * Cut Scene to Load
 */
let _cutSceneToLoad = $state('none') as CutScene;
export function getCutSceneToLoad() {
	return _cutSceneToLoad;
}
export function setCutSceneToLoad(value: CutScene) {
	_cutSceneToLoad = value;
}

/**
 * Current Day
 */
let _day = $state(1);
export function getDay() {
	return _day;
}
export function setDay(value: number) {
	_day = value;
}

/**
 * Current World Age
 */
let _worldAge = $state(1);
export function getWorldAge() {
	return _worldAge;
}
export function setWorldAge(value: number) {
	_worldAge = value;
}

/**
 * Areas
 */
let _areas = $state([] as AreaInstance[]);
export function getAreas() {
	return _areas;
}
export function setAreas(value: AreaInstance[]) {
	_areas = value;
}

/**
 * Player Unit Id
 */
let _playerUnitId = $state('');
export function getPlayerUnitId() {
	return _playerUnitId;
}
export function setPlayerUnitId(value: string) {
	_playerUnitId = value;
}

/**
 * Player Ship Id
 */
let _playerShipId = $state('');
export function getPlayerShipId() {
	return _playerShipId;
}
export function setPlayerShipId(value: string) {
	_playerShipId = value;
}

/**
 * Player Ship Energy
 */
let _playerShipEnergy = $state(5);
export function getPlayerShipEnergy() {
	return _playerShipEnergy;
}
export function setPlayerShipEnergy(value: number) {
	_playerShipEnergy = value;
}

/**
 * World Units
 */
let _worldUnits = $state([] as Unit[]);
export function getWorldUnits() {
	return _worldUnits;
}
export function setWorldUnits(value: Unit[]) {
	_worldUnits = value;
}

/**
 * World Ships
 */
let _worldShips = $state([] as Ship[]);
export function getWorldShips() {
	return _worldShips;
}
export function setWorldShips(value: Ship[]) {
	_worldShips = value;
}

/**
 * Derived Stuff
 */
const _playerUnit = $derived.by(() => {
	return _worldUnits.find((unit) => unit.uuid == _playerUnitId)!;
});
export function getPlayerUnit() {
	return _playerUnit;
}

const _playerShip = $derived.by(() => {
	return _worldShips.find((ship) => ship.id == _playerShipId)!;
});
export function getPlayerShip() {
	return _playerShip;
}

const _playerArea = $derived.by(() => {
	return _areas.find((area) => area.shipsInArea.includes(_playerShipId))!;
});
export function getPlayerArea() {
	return _playerArea;
}

/**
 * Functions
 */

export function addUnitToWorld(unit: Unit) {
	_worldUnits.push(unit);
}

export function addAreaToWorld(area: AreaInstance) {
	_areas.push(area);
}

export function addShipToWorld(ship: Ship) {
	_worldShips.push(ship);
}

export function updateUnits() {
	_worldUnits = [..._worldUnits];
}

export function setPlayerName(name: string) {
	_playerUnit.name = name;
}
