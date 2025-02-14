export type GameConfig = {
	sound: boolean;
	music: boolean;
};

export const gameConfigState = $state({} as GameConfig);
