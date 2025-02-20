import { ScreenType } from '$lib/schemas/screen-type';
import { gameState } from '$lib/states/game-state.svelte';
import { Area } from './areas';

export enum CutScene {
	None = 'none',
	Intro = 'intro'
}

export class CutSceneData {
	title: string = 'NO TITLE';
	screens: Scenes[] = [];
	onFinish: () => void = () => {};
	constructor(title: string, screens: Scenes[], onFinish: () => void) {
		this.title = title;
		this.screens = screens;
		this.onFinish = onFinish;
	}
}

export class Scenes {
	text?: string = '';
	imageId?: string = '';
	constructor(text: string, imageId: string) {
		this.text = text;
		this.imageId = imageId;
	}
}

export function loadCutSceneDict() {
	CUT_SCENES_DICT = {
		[CutScene.None]: new CutSceneData('None', [], () => {}),
		[CutScene.Intro]: new CutSceneData(
			'Intro',
			[new Scenes('Welcome to Questers', ''), new Scenes('It is a cool game', '')],
			() => {
				gameState.data.screen = ScreenType.Area;
				gameState.data.areaId = Area.Gauly;
			}
		)
	};
}

export let CUT_SCENES_DICT: Record<CutScene, CutSceneData>;
