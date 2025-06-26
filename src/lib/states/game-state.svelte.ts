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

let _gameSeed = $state('');
export function getGameSeed() {
	return _gameSeed;
}
export function setGameSeed(value: string) {
	_gameSeed = value;
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
