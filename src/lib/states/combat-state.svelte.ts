import type { ArtifactId } from '$lib/data/artifacts/artifacts-models';
import type { BuffInstance } from '$lib/data/buffs/buffs-models';
import type { CombatLog } from '$lib/domain/combat/combat-log';
import { logCombat } from '$lib/domain/infra/logger';

export interface CombatState {
	phase: CombatPhase;
	roundIndex: number;
	combatIndex: number;
	logs: CombatLog[];

	// Party
	partyOrder: string[];
	partyBuffs: BuffInstance[];
	partyAttack: number;
	partyDefense: number;
	skillRolls: number;

	// Enemies
	enemiesHp: number;
	enemiesMaxHp: number;
	enemiesAttack: number;
	enemiesDefense: number;
	enemiesArtifacts: ArtifactId[];
	enemiesBuffs: BuffInstance[];
}

export enum CombatPhase {
	Initializing = 'Initializing',
	WaitingForInput = 'WaitingForInput',
	Calculating = 'Calculating',
	Won = 'Won',
	Lost = 'Lost'
}

export function generateNewCombatState() {
	const state: CombatState = {
		phase: CombatPhase.Initializing,
		roundIndex: 0,
		combatIndex: 0,
		partyOrder: [],
		partyBuffs: [],
		skillRolls: 0,
		enemiesArtifacts: [],
		enemiesBuffs: [],
		logs: [],
		enemiesHp: 0,
		enemiesMaxHp: 0,
		enemiesAttack: 0,
		enemiesDefense: 0,
		partyAttack: 0,
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
