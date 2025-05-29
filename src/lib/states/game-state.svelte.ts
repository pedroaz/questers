import type { GodId } from '$lib/data/gods/gods-models';
import type { StoryId } from '$lib/data/story/story-models';
import type { StartingParameters } from '$lib/domain/journey-selection/starting-parameters';
import { ScreenId } from '$lib/domain/screen-changing/screens';

let _gameIsLoaded = $state(true);
export function getGameIsLoaded() {
	return _gameIsLoaded;
}
export function setGameIsLoaded(value: boolean) {
	_gameIsLoaded = value;
}

let _screenToLoad = $state(ScreenId.MainMenu);
export function getScreenToLoad() {
	return _screenToLoad;
}
export function setScreenToLoad(screen: ScreenId) {
	_screenToLoad = screen;
}

let _startingParameters = $state({} as StartingParameters);
export function getStartingParameters() {
	return _startingParameters;
}
export function setStartingParameters(value: StartingParameters) {
	_startingParameters = value;
}

let _storyToLoad = $state('new-game' as StoryId);
export function getStoryToLoad() {
	return _storyToLoad;
}
export function setStoryToLoad(value: StoryId) {
	_storyToLoad = value;
}

// let _questToLoad = $state('');
// export function getQuestToLoad() {
// 	return _questToLoad;
// }
// export function setQuestToLoad(value: string) {
// 	_questToLoad = value;
// }

// let _threatLevel: number = $state(0);
// export function getThreatLevel() {
// 	return _threatLevel;
// }
// export function setThreatLevel(value: number) {
// 	_threatLevel = value;
// }
