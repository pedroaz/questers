import { logCreateWorld } from '../infra/logger';
import { generateNavigationData } from '../navigation/navigation-data-factory';
import { generateParty } from '../unit/factories/party-factory';
import { generatePlayer } from '../unit/factories/unit-factory';
import type { Unit } from '../unit/unit';

import { RegionId } from '$lib/data/navigation/navigation-models';
import { setNavigationData, setPlayerParty } from '$lib/states/player-state.svelte';

export function createNewWorld() {
	logCreateWorld('Creating New World');
	const player = createPlayer();
	const companions = createCompanions();
	createPlayerParty(player.uuid, companions);
	setNavigation();
}

function createPlayer() {
	const player = generatePlayer();
	return player;
}

function createCompanions(): Unit[] {
	const res: Unit[] = [];
	// Object.values(CompanionId).forEach((companionId) => {
	// 	res.push(generateCompanion(companionId));
	// });
	// return [];
	return res;
}

function createPlayerParty(playerId: string, companions: Unit[]) {
	const party = generateParty(playerId);
	party.companionsIds = companions.map((companion) => companion.uuid);
	setPlayerParty(party);
}
function setNavigation() {
	const navigationData = generateNavigationData(RegionId.WhalePeninsula);
	setNavigationData(navigationData);
}
