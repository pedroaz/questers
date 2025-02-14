import { CutScene } from '$lib/data/cut-scenes';
import { Area } from '$lib/data/areas';
import { ScreenType } from '$lib/schemas/screen-type';
import { Unit } from '$lib/schemas/unit';
import { setFullMana, setFullHp } from '$lib/services/combat-serice';
import { generateQuests, type QuestInstance } from '$lib/services/quest-generator';

export const loadingState = $state({
	loaded: false
});

export class GameState {
	data: GameStateData = new GameStateData();
	constructor() {
		setFullHp(this.data.playerUnit);
		setFullMana(this.data.playerUnit);
		generateQuests(this);
	}
}

export class GameStateData {
	screen: ScreenType = ScreenType.CharacterCreation;
	playerUnit: Unit = new Unit();
	cutSceneId: CutScene = CutScene.None;
	areaId: Area = Area.None;
	day: number = 1;
	quests: QuestInstance[] = [];
}

export const gameState = $state({} as GameState);

export function getQuestsFromArea(areaId: Area) {
	return gameState.data.quests.filter((quest) => quest.area == areaId);
}
