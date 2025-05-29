import { logCreateWorld } from '../infra/logger';
import { generateNavigationData } from '../navigation/navigation-data-factory';
import { generateParty } from '../unit/factories/party-factory';
import { generatePlayer } from '../unit/factories/unit-factory';

import { RegionId } from '$lib/data/navigation/navigation-models';
import { setNavigationData, setPlayerParty } from '$lib/states/player-state.svelte';
import { addUnitToWorld } from '$lib/states/units-state.svelte';

export function createNewWorld() {
	logCreateWorld('Creating New World');
	const player = createPlayer();
	createCompanions();
	createPlayerParty(player.uuid);
	setNavigation();
}

function createPlayer() {
	const player = generatePlayer();
	return player;
}

function createCompanions() {}

function createPlayerParty(playerId: string) {
	const party = generateParty(playerId);
	setPlayerParty(party);
}
function setNavigation() {
	const navigationData = generateNavigationData(RegionId.WhalePeninsula);
	setNavigationData(navigationData);
}
