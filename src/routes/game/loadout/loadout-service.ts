import { resetUnitToNewDay } from '$lib/domain/unit/unit-reseter';
import { getPlayerParty, getPlayerUnit, setPlayerParty } from '$lib/states/player-state.svelte';
import { getUnitById } from '$lib/states/units-state.svelte';

export function initLoadout() {
	const party = getPlayerParty();

	const player = getPlayerUnit();
	player.level = party.level;
	resetUnitToNewDay(player);

	const companions = party.companionsIds.map((id) => getUnitById(id));
	companions.forEach((companion) => {
		companion.level = party.level;
		resetUnitToNewDay(companion);
	});

	setPlayerParty(party);
}
