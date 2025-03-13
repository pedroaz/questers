import {
	getAreas,
	getCombatState,
	getCutSceneToLoad,
	getDay,
	getDayPhase,
	getDifficulty,
	getGodId,
	getPlayerCreated,
	getPlayerShipId,
	getPlayerUnitId,
	getQuestToLoad,
	getScreenToLoad,
	getWorldAge,
	getWorldShips,
	getWorldUnits,
	setAreas,
	setCombatState,
	setCutSceneToLoad,
	setDay,
	setDayPhase,
	setDifficulty,
	setGodId,
	setPlayerCreated,
	setPlayerShipId,
	setPlayerUnitId,
	setQuestToLoad,
	setScreenToLoad,
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
		key: 'combat-state',
		value: getCombatState,
		text: 'Combat State',
		setFunc: setCombatState,
		defaultValue: {}
	}
];
