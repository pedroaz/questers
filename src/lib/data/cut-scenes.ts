import { ScreenType } from '$lib/schemas/screen-type';
import { gameState } from '$lib/states/game-state.svelte';
import { Town } from './towns';

export enum CutScene {
	None = 'none',
	Intro = 'intro'
}

export class CutSceneData {
	title: string = 'NO TITLE';
	screens: Scenes[] = [];
	onFinish: () => void = () => {};
}

export class Scenes {
	text?: string = '';
	imageId?: string = '';
}

export const CUT_SCENES_DICT: Record<CutScene, CutSceneData> = {
	[CutScene.None]: { title: 'None', screens: [], onFinish: () => {} },
	[CutScene.Intro]: {
		title: 'Intro',
		screens: [
			{
				text: 'Welcome to Questers'
			},
			{
				text: 'It is a cool game'
			}
		],
		onFinish: () => {
			gameState.data.screen = ScreenType.Town;
			gameState.data.town = Town.Gauly;
		}
	}
};
