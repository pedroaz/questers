import { CutScene } from '$lib/data/cut-scenes';
import { PlayerCharacter } from '$lib/schemas/player-character';
import { ScreenType } from '$lib/schemas/screen-type';

export const loadingState = $state({
	loaded: false
});

export class GameState {
	data: GameStateData = new GameStateData();
}

export class GameStateData {
	screen: ScreenType = ScreenType.CharacterCreation;
	playerCharacter: PlayerCharacter = new PlayerCharacter();
	cutScene: CutScene = CutScene.None;
}

export const gameState = $state({} as GameState);
