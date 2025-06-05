import type { CombatLog } from '$lib/domain/combat/combat-log';
import { logCombat } from '$lib/domain/infra/logger';

export interface CombatState {
	roundIndex: number;
	combatIndex: number;
	partyOrder: string[];
	logs: CombatLog[];

	enemiesHp: number;
	enemiesMaxHp: number;
	enemiesPower: number;
	enemiesDefense: number;

	partyPower: number;
	partyDefense: number;
}

export function generateNewCombatState() {
	const state: CombatState = {
		roundIndex: 0,
		combatIndex: 0,
		partyOrder: [],
		logs: [],
		enemiesHp: 0,
		enemiesMaxHp: 0,
		enemiesPower: 0,
		enemiesDefense: 0,
		partyPower: 0,
		partyDefense: 0
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
	setCombatState(state);
}
