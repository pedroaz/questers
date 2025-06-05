import { getCombatState } from './combat-state.svelte';
import { getUnitById } from './units-state.svelte';

import type { NavigationData } from '$lib/domain/navigation/navigation-data';
import type { QuestInstance } from '$lib/domain/navigation/quests-models';
import type { PlayerParty } from '$lib/domain/unit/party';

let _journeyInProgress = $state(false);
export function getJourneyInProgress() {
	return _journeyInProgress;
}
export function setJourneyInProgress(value: boolean) {
	_journeyInProgress = value;
}

export function getPlayerUnit() {
	return getUnitById(_playerParty.playerId);
}

let _playerParty = $state({} as PlayerParty);
export function getPlayerParty() {
	return _playerParty;
}
export function setPlayerParty(value: PlayerParty) {
	_playerParty = value;
}

export function getPlayerPartyIds() {
	return [_playerParty.playerId, ..._playerParty.companionsIds];
}

let _navigationData = $state({} as NavigationData);
export function getNavigationData() {
	return _navigationData;
}
export function setNavigationData(value: NavigationData) {
	_navigationData = value;
}
export function getCurrentQuest(): QuestInstance {
	return getNavigationData().quests.find((q) => q.id == getNavigationData().selectedQuestId)!;
}
export function getEnemiesIds() {
	return getCurrentQuest().rounds[getCombatState().roundIndex ?? 0].enemiesIds;
}
