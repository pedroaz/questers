import { AreaId } from '$lib/data/areas';
import { GetGameState } from '$lib/states/game-state.svelte';
import { log } from './infra/logger';
import { moveShip } from './movement-service';
import { goToScreen, ScreenType } from './screen-changer-service';

export function startJourney() {
	log('Starting Journey');
	const gameState = GetGameState();
	gameState.data.day = 1;
	moveShip(gameState.data.playerShipId, AreaId.TartarugaPort);
	goToScreen(ScreenType.Ship);
}
