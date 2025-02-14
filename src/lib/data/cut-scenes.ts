export enum CutScene {
	None = 'none',
	Intro = 'intro'
}

export class CutSceneData {
	title: string = 'NO TITLE';
}

export const CutSceneDict: Record<CutScene, CutSceneData> = {
	[CutScene.None]: { title: 'None' },
	[CutScene.Intro]: { title: 'Intro' }
};
