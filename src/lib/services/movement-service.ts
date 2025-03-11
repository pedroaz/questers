import type { AreaId } from '$lib/data/areas';
import { getAreas } from '$lib/states/game-state.svelte';
import { log } from './infra/logger';

export function moveShip(shipId: string, areaId: AreaId) {
	log(`Moving Ship ${shipId} to Area ${areaId}`);

	// Remove Ship from old Area
	const oldArea = getAreas().find((area) => area.shipsInArea.includes(shipId));
	if (oldArea) {
		oldArea.shipsInArea = oldArea.shipsInArea.filter((shipId) => shipId != shipId);
	}

	// Add Ship to new Area
	const newArea = getAreas().find((area) => area.id == areaId)!;
	newArea.shipsInArea.push(shipId);
}
