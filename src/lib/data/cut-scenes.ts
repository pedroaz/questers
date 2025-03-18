import { setScreenToLoad } from '$lib/states/game-state.svelte';

export type CutScene = 'none' | 'intro';

export class CutSceneData {
	title: string = 'NO TITLE';
	screens: Scenes[] = [];
	onFinish: (() => void) | null = null;
	constructor(title: string, screens: Scenes[], onFinish: () => void) {
		this.title = title;
		this.screens = screens;
		this.onFinish = onFinish;
	}
}

export class Scenes {
	text?: string = '';
	image?: string = '';
	constructor(text: string, imageId: string) {
		this.text = text;
		this.image = imageId;
	}
}

import scenesFile from './cut-scenes.json';

export let CUT_SCENES_DICT: Record<CutScene, CutSceneData>;

export function loadCutSceneDict() {
	CUT_SCENES_DICT = scenesFile.reduce(
		(dict, scene) => {
			const cutScene = new CutSceneData(scene.title as CutScene, scene.screens, () => {});
			switch (scene.id) {
				case 'intro':
					cutScene.onFinish = () => {
						setScreenToLoad('journey-selection');
					};
					break;
			}
			dict[scene.id as CutScene] = cutScene;
			return dict;
		},
		{} as Record<CutScene, CutSceneData>
	);
}
