import {
	getAreas,
	getCrewActions,
	getCrewOrder,
	getCutSceneToLoad,
	getDay,
	getDayPhase,
	getDifficulty,
	getEnemiesOrder,
	getEnemyActions,
	getEnemyHp,
	getEnemyMaxHp,
	getGodId,
	getPlayerCreated,
	getPlayerShipId,
	getPlayerUnitId,
	getQuestToLoad,
	getScreenToLoad,
	getTotalCrewDefense,
	getTotalCrewPower,
	getTotalEnemyDefense,
	getTotalEnemyPower,
	getTurn,
	getWorldAge,
	getWorldShips,
	getWorldUnits,
	setAreas,
	setCrewActions,
	setCrewOrder,
	setCutSceneToLoad,
	setDay,
	setDayPhase,
	setDifficulty,
	setEnemiesOrder,
	setEnemyActions,
	setEnemyHp,
	setEnemyMaxHp,
	setGodId,
	setPlayerCreated,
	setPlayerShipId,
	setPlayerUnitId,
	setQuestToLoad,
	setScreenToLoad,
	setTotalCrewDefense,
	setTotalCrewPower,
	setTotalEnemyDefense,
	setTotalEnemyPower,
	setTurn,
	setWorldAge,
	setWorldShips,
	setWorldUnits
} from '$lib/states/game-state.svelte';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const SAVE_STORAGE_KEY = 'save';
export const CONFIG_STORAGE_KEY = 'config';
export const GAME_IS_LOADED_STORAGE_KEY = 'game-is-loaded';

export function getStorageKey(key: string) {
	return `${key}-${localStorage.getItem(SAVE_STORAGE_KEY)}`;
}

export class PersistenceData {
	key: string;
	value: any;
	text: string;
	setFunc: (value: any) => void;
	defaultValue: any;
	constructor(
		key: string,
		value: any,
		text: string,
		setFunc: (value: any) => void,
		defaultValue: any
	) {
		this.key = key;
		this.value = value;
		this.text = text;
		this.setFunc = setFunc;
		this.defaultValue = defaultValue;
	}
}

export const gameStatePersistenceData: PersistenceData[] = [
	{
		key: 'player-created',
		value: getPlayerCreated,
		text: 'Player Created',
		setFunc: setPlayerCreated,
		defaultValue: false
	},
	{
		key: 'screen-to-load',
		value: getScreenToLoad,
		text: 'Screen to load',
		setFunc: setScreenToLoad,
		defaultValue: 'main-menu'
	},
	{
		key: 'god-id',
		value: getGodId,
		text: 'God Id',
		setFunc: setGodId,
		defaultValue: 'none'
	},
	{
		key: 'difficulty',
		value: getDifficulty,
		text: 'Difficulty',
		setFunc: setDifficulty,
		defaultValue: 0
	},
	{
		key: 'cut-scene-to-load',
		value: getCutSceneToLoad,
		text: 'Cut Scene to load',
		setFunc: setCutSceneToLoad,
		defaultValue: 'none'
	},
	{
		key: 'day',
		value: getDay,
		text: 'Day',
		setFunc: setDay,
		defaultValue: 1
	},
	{
		key: 'world-age',
		value: getWorldAge,
		text: 'World Age',
		setFunc: setWorldAge,
		defaultValue: 1
	},
	{
		key: 'areas',
		value: getAreas,
		text: 'Areas',
		setFunc: setAreas,
		defaultValue: []
	},
	{
		key: 'player-unit-id',
		value: getPlayerUnitId,
		text: 'Player Unit Id',
		setFunc: setPlayerUnitId,
		defaultValue: ''
	},
	{
		key: 'player-ship-id',
		value: getPlayerShipId,
		text: 'Player Ship Id',
		setFunc: setPlayerShipId,
		defaultValue: ''
	},
	{
		key: 'world-units',
		value: getWorldUnits,
		text: 'World Units',
		setFunc: setWorldUnits,
		defaultValue: []
	},
	{
		key: 'world-ships',
		value: getWorldShips,
		text: 'World Ships',
		setFunc: setWorldShips,
		defaultValue: []
	},
	{
		key: 'quest-to-load',
		value: getQuestToLoad,
		text: 'Quest to load',
		setFunc: setQuestToLoad,
		defaultValue: ''
	},
	{
		key: 'day-phase',
		value: getDayPhase,
		text: 'Day Phase',
		setFunc: setDayPhase,
		defaultValue: 'night'
	},
	{
		key: 'turn',
		value: getTurn,
		text: 'Turn',
		setFunc: setTurn,
		defaultValue: 'player'
	},

	{
		key: 'crew-actions',
		value: getCrewActions,
		text: 'Crew Actions',
		setFunc: setCrewActions,
		defaultValue: []
	},
	{
		key: 'crew-order',
		value: getCrewOrder,
		text: 'Crew Order',
		setFunc: setCrewOrder,
		defaultValue: []
	},
	{
		key: 'enemy-actions',
		value: getEnemyActions,
		text: 'Enemy Actions',
		setFunc: setEnemyActions,
		defaultValue: []
	},
	{
		key: 'enemies-order',
		value: getEnemiesOrder,
		text: 'Enemies Order',
		setFunc: setEnemiesOrder,
		defaultValue: []
	},
	{
		key: 'total-crew-power',
		value: getTotalCrewPower,
		text: 'Total Crew Power',
		setFunc: setTotalCrewPower,
		defaultValue: 0
	},
	{
		key: 'total-crew-defense',
		value: getTotalCrewDefense,
		text: 'Total Crew Defense',
		setFunc: setTotalCrewDefense,
		defaultValue: 0
	},
	{
		key: 'total-enemy-power',
		value: getTotalEnemyPower,
		text: 'Total Enemy Power',
		setFunc: setTotalEnemyPower,
		defaultValue: 0
	},
	{
		key: 'total-enemy-defense',
		value: getTotalEnemyDefense,
		text: 'Total Enemy Defense',
		setFunc: setTotalEnemyDefense,
		defaultValue: 0
	},
	{
		key: 'enemy-hp',
		value: getEnemyHp,
		text: 'Enemy HP',
		setFunc: setEnemyHp,
		defaultValue: 0
	},
	{
		key: 'enemy-max-hp',
		value: getEnemyMaxHp,
		text: 'Enemy Max HP',
		setFunc: setEnemyMaxHp,
		defaultValue: 0
	}
];
