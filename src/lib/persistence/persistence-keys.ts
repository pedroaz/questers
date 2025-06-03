import { getCombatState, setCombatState } from '$lib/states/combat-state.svelte';
import {
	getScreenToLoad,
	getStartingParameters,
	getStoryToLoad,
	setScreenToLoad,
	setStartingParameters,
	setStoryToLoad
} from '$lib/states/game-state.svelte';
import {
	getJourneyInProgress,
	getNavigationData,
	getPlayerParty,
	setJourneyInProgress,
	setNavigationData,
	setPlayerParty
} from '$lib/states/player-state.svelte';
import {
	getShowTopBar,
	getTopMenuText,
	setShowTopBar,
	setTopMenuText
} from '$lib/states/ui-state.svelte';
import { getUnits, setUnits } from '$lib/states/units-state.svelte';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CONFIG_STORAGE_KEY = 'config';
export const GAME_IS_LOADED_STORAGE_KEY = 'game-is-loaded';

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
		key: 'journey-in-progress',
		value: getJourneyInProgress,
		text: 'Journey in Progress',
		setFunc: setJourneyInProgress,
		defaultValue: false
	},
	{
		key: 'screen-to-load',
		value: getScreenToLoad,
		text: 'Screen to load',
		setFunc: setScreenToLoad,
		defaultValue: 'journey-selection'
	},
	{
		key: 'starting-parameters',
		value: getStartingParameters,
		text: 'Starting Parameters',
		setFunc: setStartingParameters,
		defaultValue: {}
	},
	{
		key: 'units',
		value: getUnits,
		text: 'Units',
		setFunc: setUnits,
		defaultValue: []
	},
	{
		key: 'player-party',
		value: getPlayerParty,
		text: 'Player Party',
		setFunc: setPlayerParty,
		defaultValue: {}
	},
	{
		key: 'navigation-data',
		value: getNavigationData,
		text: 'Navigation Data',
		setFunc: setNavigationData,
		defaultValue: {}
	},
	{
		key: 'show-top-bar',
		value: getShowTopBar,
		text: 'Show Top Bar',
		setFunc: setShowTopBar,
		defaultValue: false
	},
	{
		key: 'story-to-load',
		value: getStoryToLoad,
		text: 'Story to load',
		setFunc: setStoryToLoad,
		defaultValue: ''
	},
	{
		key: 'top-menu-text',
		value: getTopMenuText,
		text: 'Top Menu Text',
		setFunc: setTopMenuText,
		defaultValue: 'Questers'
	},
	{
		key: 'combat-state',
		value: getCombatState,
		text: 'Combat State',
		setFunc: setCombatState,
		defaultValue: {}
	}
];
