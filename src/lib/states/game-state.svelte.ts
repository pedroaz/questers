import { ArchipelagoData, AreaData, AREAS_DICT, type AreaId } from '$lib/data/areas';
import { Unit, type UnitClassBonusId } from '$lib/schemas/unit';
import type { Ship } from '$lib/schemas/ship';
import type { BackgroundType, ScreenType } from '$lib/services/screen-changer-service';
import type { CutScene } from '$lib/data/cut-scenes';
import type { God } from '$lib/data/gods';
import { resetUnit, UnitAction } from '$lib/schemas/unit-calculationts';
import type { QuestInstance, QuestPhase, QuestStage, QuestTurn } from '$lib/data/quests';
import type { DayPhase } from '$lib/services/world-service';
import { roundNoDecimals } from '$lib/utils';
import { CombatLog } from '$lib/services/combat/start-combat';
import { logCombat } from '$lib/services/infra/logger';
import type { Equipment } from '$lib/data/equipments';
import type { ChestId } from '$lib/data/chests';

/***************************************************************************/
/* STATES */
/***************************************************************************/

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
 * Cut Scene to Load
 */
let _cutSceneToLoad = $state('none') as CutScene;
export function getCutSceneToLoad() {
	return _cutSceneToLoad;
}
export function setCutSceneToLoad(value: CutScene) {
	_cutSceneToLoad = value;
}

let _questToLoad = $state('');
export function getQuestToLoad() {
	return _questToLoad;
}
export function setQuestToLoad(value: string) {
	_questToLoad = value;
}

/**
 * Current Day
 */
let _totalDays = $state(1);
export function getTotalDays() {
	return _totalDays;
}
export function setTotalDays(value: number) {
	_totalDays = value;
}

let _archipelagoDays = $state(0);
export function getArchipelagoDays() {
	return _archipelagoDays;
}
export function setArchipelagoDays(value: number) {
	_archipelagoDays = value;
}

let _dayPhase = $state('night' as DayPhase);
export function getDayPhase() {
	return _dayPhase;
}
export function setDayPhase(value: DayPhase) {
	_dayPhase = value;
}

/**
 * Quests
 */
let _quests = $state([] as QuestInstance[]);
export function getQuests() {
	return _quests;
}
export function setQuests(value: QuestInstance[]) {
	_quests = value;
}
export function refreshQuests() {
	_quests = [..._quests];
}

/**
 * Archipelago
 */
let _archipelago = $state({} as ArchipelagoData);
export function getArchipelago() {
	return _archipelago;
}
export function setArchipelago(value: ArchipelagoData) {
	_archipelago = value;
}

export function getAreasData(): AreaData[] {
	return _archipelago.areas.map((areaId) => AREAS_DICT[areaId]);
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
 * World Units
 */
let _worldUnits = $state([] as Unit[]);
export function getWorldUnits() {
	return _worldUnits;
}
export function setWorldUnits(value: Unit[]) {
	_worldUnits = value;
}
export function refreshWorldUnits(): void {
	_worldUnits = [..._worldUnits];
}
export function addUnitToWorld(unit: Unit): void {
	_worldUnits.push(unit);
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
export function refreshWorldShips() {
	_worldShips = [..._worldShips];
}
export function addShipToWorld(ship: Ship): void {
	_worldShips.push(ship);
}

/**
 * Turn
 */
let _turn: QuestTurn = $state('player');
export function getTurn() {
	return _turn;
}
export function setTurn(value: QuestTurn) {
	_turn = value;
}

let _stage: QuestStage = $state('new-stage-dialog');
export function getStage() {
	return _stage;
}
export function setStage(value: QuestStage) {
	_stage = value;
}

/**
 * Enemy Hp
 */
let _enemyHp: number = $state(0);
export function getEnemyHp() {
	return _enemyHp;
}
export function setEnemyHp(value: number) {
	_enemyHp = value;
}

export function decreaseEnemyHp(value: number) {
	_enemyHp -= value;
}

/**
 * Enemy Max Hp
 */
let _enemyMaxHp: number = $state(0);
export function getEnemyMaxHp() {
	return _enemyMaxHp;
}
export function setEnemyMaxHp(value: number) {
	_enemyMaxHp = value;
}

/**
 * Crew Actions
 */
let _crewActions: UnitAction[] = $state([]);
export function getCrewActions() {
	return _crewActions;
}
export function setCrewActions(value: UnitAction[]) {
	_crewActions = value;
}

/**
 * Crew Order
 */
let _crewOrder: string[] = $state([]);
export function getCrewOrder() {
	return _crewOrder;
}
export function setCrewOrder(value: string[]) {
	_crewOrder = value;
}

/**
 * Enemy Actions
 */
let _enemyActions: UnitAction[] = $state([]);
export function getEnemyActions() {
	return _enemyActions;
}
export function setEnemyActions(value: UnitAction[]) {
	_enemyActions = value;
}

/**
 * Enemies Order
 */
let _enemiesOrder: string[] = $state([]);
export function getEnemiesOrder() {
	return _enemiesOrder;
}
export function setEnemiesOrder(value: string[]) {
	_enemiesOrder = value;
}

/**
 * Total Crew Power
 */
let _totalCrewPower: number = $state(0);
export function getTotalCrewPower() {
	return roundNoDecimals(_totalCrewPower);
}
export function setTotalCrewPower(value: number) {
	_totalCrewPower = value;
	_totalCrewPower = roundNoDecimals(_totalCrewPower);
	if (_totalCrewPower < 0) _totalCrewPower = 0;
}

/**
 * Total Crew Defense
 */
let _totalCrewDefense: number = $state(0);
export function getTotalCrewDefense() {
	return roundNoDecimals(_totalCrewDefense);
}
export function setTotalCrewDefense(value: number) {
	_totalCrewDefense = value;
	_totalCrewDefense = roundNoDecimals(_totalCrewDefense);
	if (_totalCrewDefense < 0) _totalCrewDefense = 0;
}

/**
 * Total Enemy Power
 */
let _totalEnemyPower: number = $state(0);
export function getTotalEnemyPower() {
	return roundNoDecimals(_totalEnemyPower);
}
export function setTotalEnemyPower(value: number) {
	_totalEnemyPower = value;
	_totalEnemyPower = roundNoDecimals(_totalEnemyPower);
	if (_totalEnemyPower < 0) _totalEnemyPower = 0;
}

/**
 * Total Enemy Defense
 */
let _totalEnemyDefense: number = $state(0);
export function getTotalEnemyDefense() {
	return roundNoDecimals(_totalEnemyDefense);
}
export function setTotalEnemyDefense(value: number) {
	_totalEnemyDefense = value;
	_totalEnemyDefense = roundNoDecimals(_totalEnemyDefense);
	if (_totalEnemyDefense < 0) _totalEnemyDefense = 0;
}

let _combatLogs: CombatLog[] = $state([]);
export function getCombatLogs() {
	return _combatLogs;
}
export function setCombatLogs(value: CombatLog[]) {
	_combatLogs = value;
}
export function addCombatLog(message: string) {
	logCombat(message);
	_combatLogs.push({
		message
	});
}

let _discoveredAreas: AreaId[] = $state([]);
export function getDiscoveredAreas() {
	return _discoveredAreas;
}
export function setDiscoveredAreas(value: AreaId[]) {
	_discoveredAreas = value;
}

let _phaseIndex: number = $state(0);
export function getPhaseIndex() {
	return _phaseIndex;
}
export function setPhaseIndex(value: number) {
	_phaseIndex = value;
}

let _threatLevel: number = $state(0);
export function getThreatLevel() {
	return _threatLevel;
}
export function setThreatLevel(value: number) {
	_threatLevel = value;
}

let _background: BackgroundType = $state('none');
export function getBackground() {
	return _background;
}
export function setBackground(value: BackgroundType) {
	_background = value;
}

/***************************************************************************/
/* GET VALUES */
/***************************************************************************/
export function getPlayerUnit() {
	return _worldUnits.find((unit) => unit.uuid == _playerUnitId);
}

export function getPlayerShip() {
	return _worldShips.find((ship) => ship.id == _playerShipId);
}

export function getQuestById(questId: string): QuestInstance | undefined {
	return _quests.find((quest) => quest.id == questId);
}

export function getUnitById(unitId: string): Unit {
	return _worldUnits.find((unit) => unit.uuid == unitId)!;
}

export function getPlayerQuest(): QuestInstance | undefined {
	return getQuestById(getQuestToLoad());
}

export function completePlayerQuest() {
	const quest = getPlayerQuest();
	const ship = getPlayerShip();

	if (!ship || !quest) {
		throw new Error('No quest or ship found');
	}

	ship.energy -= quest.data.energyCost;
	ship.chestsToOpen.push(...quest.chestRewards);
	addMoneyToPlayer(quest.goldReward);
	addExperienceToPlayer(quest.experienceReward);
	setThreatLevel(getThreatLevel() + quest.data.threat);
	quest.enabled = false;

	refreshQuests();
	refreshWorldShips();
}

export function getCrew() {
	return getUnitsFromShip(_playerShipId);
}

export function getEnemies(): Unit[] {
	return getPlayerQuest()?.phases[getPhaseIndex()].enemies ?? [];
}

export function getCurrentPhase(): QuestPhase {
	const phases = getPlayerQuest()?.phases;
	if (!phases) {
		throw new Error('No phases found');
	}
	const index = getPhaseIndex();
	if (index >= phases.length) {
		throw new Error('Phase index out of bounds');
	}
	const phase = phases[index];
	return phase;
}

export function getUnitsNotOnPlayerBoat(): Unit[] {
	const unitsFromShip = getUnitsFromShip(_playerShipId);
	return _worldUnits.filter((unit) => !unitsFromShip.includes(unit));
}

export function getShipById(shipId: string): Ship {
	return _worldShips.find((ship) => ship.id == shipId)!;
}

export function getUnitsFromShip(shipId: string): Unit[] {
	const unitIds = _worldShips.find((ship) => ship.id == shipId)?.units;
	const units: Unit[] = [];
	if (unitIds) {
		for (const unitId of unitIds) {
			units.push(_worldUnits.find((unit) => unit.uuid == unitId)!);
		}
	}
	return units;
}

/***************************************************************************/
/* SET VALUES */
/* All functions here should recalculate state if required */
/***************************************************************************/
export function setPlayerName(name: string): void {
	const playerUnit = getPlayerUnit();
	if (!playerUnit) return;
	playerUnit.name = name;
	refreshWorldUnits();
}

export function moveUnitToPlayerShip(unitId: string): void {
	getPlayerShip()?.units.push(unitId);
	refreshWorldShips();
}

export function setUnitClass(unit: Unit, className: UnitClassBonusId): void {
	unit.class = className;
	resetUnit(unit);
	refreshWorldUnits();
}

export function addUnitToPlayerShip(id: string): void {
	getPlayerShip()?.units.push(id);
	refreshWorldShips();
}

export function addMoneyToPlayer(amount: number): void {
	const playerUnit = getPlayerUnit();
	if (!playerUnit) return;
	playerUnit.gold += amount;
	refreshWorldUnits();
}

export function addExperienceToPlayer(amount: number): void {
	const playerUnit = getPlayerUnit();
	if (!playerUnit) return;
	playerUnit.experience += amount;
	refreshWorldUnits();
}

export function addEquipmentsToPlayer(equips: Equipment[]): void {
	const ship = getPlayerShip();
	if (!ship) return;
	ship.storedEquips.push(...equips);
	refreshWorldShips();
}

export function removeChestFromPlayer(chestId: ChestId): void {
	const ship = getPlayerShip();
	if (!ship) return;
	const index = ship.chestsToOpen.indexOf(chestId);
	if (index > -1) {
		ship.chestsToOpen.splice(index, 1);
	}
	refreshWorldShips();
}

/***************************************************************************/
/* TRASH */
/***************************************************************************/
