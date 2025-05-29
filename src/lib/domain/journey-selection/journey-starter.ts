import { createNewWorld } from './world-factory';
import { goToScreen } from '../screen-changing/screen-changer-service';
import { ScreenId } from '../screen-changing/screens';

import { StoryId } from '$lib/data/story/story-models';
import { persistGameState } from '$lib/persistence/persistence-service.svelte';
import { setStoryToLoad } from '$lib/states/game-state.svelte';

export function startJourney() {
	createNewWorld();
	persistGameState();
	setStoryToLoad(StoryId.SpiritTree);
	goToScreen(ScreenId.Story);
}
