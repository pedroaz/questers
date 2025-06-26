export interface GameConfig {
	sfx: number;
	music: number;
	calcDelay: number;
}

let _configState = $state({} as GameConfig);
export function getConfigState() {
	return _configState;
}
export function setConfigState(value: GameConfig) {
	_configState = value;
}
