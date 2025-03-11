export type GameConfig = {
	sound: boolean;
	music: boolean;
};

let _configState = $state({} as GameConfig);
export function getConfigState() {
	return _configState;
}
export function setConfigState(value: GameConfig) {
	_configState = value;
}
