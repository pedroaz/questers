import { CutScene } from '$lib/data/cut-scenes';
import { Area } from '$lib/data/areas';
import { ScreenType } from '$lib/schemas/screen-type';
import { Unit } from '$lib/schemas/unit';
import { setFullMana, setFullHp } from '$lib/services/combat-serice';
import { Encounter, generateQuests, QuestInstance } from '$lib/services/quest-generator';
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
	// General Stuff
	playerCreated: boolean = false;
	screen: ScreenType = ScreenType.MainMenu;
	cutSceneId: CutScene = CutScene.None;
	areaId: Area = Area.None;
	day: number = 1;

	// Player and Party
	playerUnit: Unit = createUnit('Bob');
	party: Unit[] = [];

	// Quests / Combat
	quests: QuestInstance[] = [];
	currentQuest: QuestInstance = new QuestInstance();
	currentEncounterIndex: number = 0;
	selectedEnemyId: string = '';
	monsterUnits: Unit[] = [];
	unitsOrder: string[] = [];
}

export const gameState = $state({} as GameState);

export function getQuestsFromArea(areaId: Area) {
	return gameState.data.quests.filter((quest) => quest.area == areaId);
}

export function currentEncounter(): Encounter {
	return gameState.data.currentQuest.encounters[gameState.data.currentEncounterIndex];
}
export function getFriendlyUnits(): Unit[] {
	return [gameState.data.playerUnit, ...gameState.data.party];
}
export function getAllUnits(): Unit[] {
	return [gameState.data.playerUnit, ...gameState.data.party, ...gameState.data.monsterUnits];
}

export function getUnitById(id: string): Unit | undefined {
	return getAllUnits().find((unit) => unit.uuid == id);
}
