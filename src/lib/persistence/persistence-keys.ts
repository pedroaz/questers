import {
	getArchipelago,
	getBackground,
	getCombatLogs,
	getUnitActions,
	getCrewOrder,
	getCutSceneToLoad,
	getTotalDays,
	getDayPhase,
	getDiscoveredAreas,
	getEnemiesOrder,
	getEnemyHp,
	getEnemyMaxHp,
	getGodId,
	getQuestRoundIndex,
	getPlayerCreated,
	getPlayerShipId,
	getPlayerUnitId,
	getQuests,
	getQuestToLoad,
	getScreenToLoad,
	getStage,
	getThreatLevel,
	getTotalCrewDefense,
	getTotalCrewPower,
	getTotalEnemyDefense,
	getTotalEnemyPower,
	getInitiative,
	getWorldShips,
	getWorldUnits,
	setArchipelago,
	setBackground,
	setCombatLogs,
	setUnitActions,
	setCrewOrder,
	setCutSceneToLoad,
	setTotalDays,
	setDayPhase,
	setDiscoveredAreas,
	setEnemiesOrder,
	setEnemyHp,
	setEnemyMaxHp,
	setGodId,
	setQuestRoundIndex,
	setPlayerCreated,
	setPlayerShipId,
	setPlayerUnitId,
	setQuests,
	setQuestToLoad,
	setScreenToLoad,
	setStage,
	setThreatLevel,
	setTotalCrewDefense,
	setTotalCrewPower,
	setTotalEnemyDefense,
	setTotalEnemyPower,
	setInitiative,
	setWorldShips,
	setWorldUnits,
	getArchipelagoDays,
	setArchipelagoDays,
	getAllOrder,
	setAllOrder
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
		key: 'cut-scene-to-load',
		value: getCutSceneToLoad,
		text: 'Cut Scene to load',
		setFunc: setCutSceneToLoad,
		defaultValue: 'none'
	},
	{
		key: 'total-days',
		value: getTotalDays,
		text: 'Day',
		setFunc: setTotalDays,
		defaultValue: 1
	},
	{
		key: 'archipelago-days',
		value: getArchipelagoDays,
		text: 'Archipelago Day',
		setFunc: setArchipelagoDays,
		defaultValue: 0
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
		key: 'initiative',
		value: getInitiative,
		text: 'Initiative',
		setFunc: setInitiative,
		defaultValue: 'player'
	},

	{
		key: 'unit-actions',
		value: getUnitActions,
		text: 'Unit Actions',
		setFunc: setUnitActions,
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
	},
	{
		key: 'quests',
		value: getQuests,
		text: 'Quests',
		setFunc: setQuests,
		defaultValue: []
	},
	{
		key: 'combat-logs',
		value: getCombatLogs,
		text: 'Combat Logs',
		setFunc: setCombatLogs,
		defaultValue: []
	},
	{
		key: 'archipelago',
		value: getArchipelago,
		text: 'Archipelago',
		setFunc: setArchipelago,
		defaultValue: {}
	},
	{
		key: 'discovered-areas',
		value: getDiscoveredAreas,
		text: 'Discovered Areas',
		setFunc: setDiscoveredAreas,
		defaultValue: []
	},
	{
		key: 'quest-round',
		value: getQuestRoundIndex,
		text: 'Quest Round',
		setFunc: setQuestRoundIndex,
		defaultValue: 0
	},
	{
		key: 'threat-level',
		value: getThreatLevel,
		text: 'Threat Level',
		setFunc: setThreatLevel,
		defaultValue: 0
	},
	{
		key: 'stage',
		value: getStage,
		text: 'Stage',
		setFunc: setStage,
		defaultValue: 'new-round'
	},
	{
		key: 'background',
		value: getBackground,
		text: 'Background',
		setFunc: setBackground,
		defaultValue: 'none'
	},
	{
		key: 'allOrder',
		value: getAllOrder,
		text: 'All Order',
		setFunc: setAllOrder,
		defaultValue: []
	}
];
