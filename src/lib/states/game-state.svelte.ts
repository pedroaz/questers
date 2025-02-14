import type { PlayerCharacter } from '$lib/schemas/player-character';

export const loadingState = $state({
	loaded: false
});

export type GameState = {
	screen: string;
	playerCharacter: PlayerCharacter;
};

export const gameState = $state({} as GameState);
