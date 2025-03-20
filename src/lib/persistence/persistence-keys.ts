import {
	getArchipelago,
	getBackground,
	getCombatLogs,
	getCrewActions,
	getCrewOrder,
	getCutSceneToLoad,
	getDay,
	getDayPhase,
	getDiscoveredAreas,
	getEnemiesOrder,
	getEnemyActions,
	getEnemyHp,
	getEnemyMaxHp,
	getGodId,
	getPhaseIndex,
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
	getTurn,
	getWorldShips,
	getWorldUnits,
	setArchipelago,
	setBackground,
	setCombatLogs,
	setCrewActions,
	setCrewOrder,
	setCutSceneToLoad,
	setDay,
	setDayPhase,
	setDiscoveredAreas,
	setEnemiesOrder,
	setEnemyActions,
	setEnemyHp,
	setEnemyMaxHp,
	setGodId,
	setPhaseIndex,
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
	setTurn,
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
		key: 'phase-index',
		value: getPhaseIndex,
		text: 'Phase Index',
		setFunc: setPhaseIndex,
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
		defaultValue: 'new-stage-dialog'
	},
	{
		key: 'background',
		value: getBackground,
		text: 'Background',
		setFunc: setBackground,
		defaultValue: 'none'
	}
];
