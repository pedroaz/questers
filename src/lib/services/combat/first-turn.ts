import { getCurrentPhase, setEnemyHp, setEnemyMaxHp } from '$lib/states/game-state.svelte';

export function firstTurn() {
	const phase = getCurrentPhase();
	setEnemyMaxHp(phase.maxHp);
	setEnemyHp(phase.maxHp);
}
