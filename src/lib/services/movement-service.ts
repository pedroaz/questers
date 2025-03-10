import type { AreaId } from '$lib/data/areas';
import { GetGameState } from '$lib/states/game-state.svelte';
import { log } from './infra/logger';

export function moveShip(shipId: string, areaId: AreaId) {
	log(`Moving Ship ${shipId} to Area ${areaId}`);

	const gameState = GetGameState();

	// Remove Ship from old Area
	const oldArea = gameState.data.areas.find((area) => area.shipsInArea.includes(shipId));
	if (oldArea) {
		oldArea.shipsInArea = oldArea.shipsInArea.filter((shipId) => shipId != shipId);
	}

	// Add Ship to new Area
	const newArea = gameState.data.areas.find((area) => area.id == areaId)!;
	newArea.shipsInArea.push(shipId);
}
