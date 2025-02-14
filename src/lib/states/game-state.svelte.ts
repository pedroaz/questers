import { CutScene } from '$lib/data/cut-scenes';
import { Town } from '$lib/data/towns';
import { PlayerCharacter } from '$lib/schemas/player-character';
import { ScreenType } from '$lib/schemas/screen-type';
import { setFullMana, setFullHp } from '$lib/services/combat-serice';

export const loadingState = $state({
	loaded: false
});

export class GameState {
	data: GameStateData = new GameStateData();
	constructor() {
		setFullHp(this.data.playerCharacter.unit);
		setFullMana(this.data.playerCharacter.unit);
	}
}

export class GameStateData {
	screen: ScreenType = ScreenType.CharacterCreation;
	playerCharacter: PlayerCharacter = new PlayerCharacter();
	cutSceneId: CutScene = CutScene.None;
	townId: Town = Town.None;
}

export const gameState = $state({} as GameState);
