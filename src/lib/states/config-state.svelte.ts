export type GameConfig = {
	sound: boolean;
	music: boolean;
};

export const configState = $state({} as GameConfig);
