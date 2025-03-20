import { setStage } from '$lib/states/game-state.svelte';

export function newTurn() {
	setStage('waiting-for-input');
}
