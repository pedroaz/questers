import { CutScene } from '$lib/data/cut-scenes';
import { Town } from '$lib/data/towns';
import { ScreenType } from '$lib/schemas/screen-type';
import { Unit } from '$lib/schemas/unit';
import { setFullMana, setFullHp } from '$lib/services/combat-serice';

export const loadingState = $state({
	loaded: false
});

export class GameState {
	data: GameStateData = new GameStateData();
	constructor() {
		setFullHp(this.data.playerUnit);
		setFullMana(this.data.playerUnit);
	}
}

export class GameStateData {
	screen: ScreenType = ScreenType.CharacterCreation;
	playerUnit: Unit = new Unit();
	cutSceneId: CutScene = CutScene.None;
	townId: Town = Town.None;
	day: number = 0;
}

export const gameState = $state({} as GameState);
