import type { CombatLog } from '$lib/domain/combat/combat-log';
import { logCombat } from '$lib/domain/infra/logger';
import { getRandomNumber, rollChance } from '$lib/rng-service';

export interface CombatState {
	roundIndex: number;
	combatIndex: number;
	partyOrder: string[];
	logs: CombatLog[];
}

export function generateNewCombatState() {
	const state: CombatState = {
		roundIndex: 0,
		combatIndex: 0,
		partyOrder: [],
		logs: []
	};
	return state;
}

let _combatState: CombatState = $state({} as CombatState);
export function getCombatState() {
	return _combatState;
}
export function setCombatState(value: CombatState) {
	_combatState = value;
}

export function addCombatLog(state: CombatState, message: string) {
	const logObj: CombatLog = {
		text: message,
		roundIndex: state.roundIndex,
		combatIndex: state.combatIndex
	};
	state.logs.push(logObj);
	logCombat(message);
}
