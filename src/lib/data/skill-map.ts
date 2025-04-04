import {
	getTotalCrewDefense,
	getTotalCrewPower,
	setTotalCrewDefense,
	setTotalCrewPower
} from '$lib/states/game-state.svelte';
import type { Skill } from './skills';

export const SKILL_MAP: Record<Skill, () => void> = {
	none: () => {},
	attack: execAttack,
	defend: execDefend
};

function execAttack() {
	setTotalCrewPower(getTotalCrewPower() + 1);
}
function execDefend() {
	setTotalCrewDefense(getTotalCrewDefense() + 1);
}
