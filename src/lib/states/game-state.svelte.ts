import { CutScene } from '$lib/data/cut-scenes';
import { Area } from '$lib/data/areas';
import { ScreenType } from '$lib/schemas/screen-type';
import { Unit } from '$lib/schemas/unit';
import { setFullMana, setFullHp } from '$lib/services/combat-serice';
import { generateQuests, QuestInstance } from '$lib/services/quest-generator';
import { createUnit } from '$lib/services/unit-factory';

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
	screen: ScreenType = ScreenType.MainMenu;
	playerUnit: Unit = createUnit('Bob');
	cutSceneId: CutScene = CutScene.None;
	areaId: Area = Area.None;
	day: number = 1;
	quests: QuestInstance[] = [];
	currentQuest: QuestInstance = new QuestInstance();
	currentEncounterIndex: number = 0;
	playerCreated: boolean = false;
}

export const gameState = $state({} as GameState);

export function getQuestsFromArea(areaId: Area) {
	return gameState.data.quests.filter((quest) => quest.area == areaId);
}
