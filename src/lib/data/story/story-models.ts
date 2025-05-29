import type { ScreenId } from '$lib/domain/screen-changing/screens';

export enum StoryId {
	NewGame = 'new-game',
	SpiritTree = 'spirit-tree'
}

export interface StoryData {
	id: StoryId;
	lines: string[];
	screenToLoad: ScreenId;
}
