import type { CombatLog } from '$lib/domain/combat/combat-manager';
import type { CombatStats } from '$lib/domain/combat/combat-stats';
import { logCombat } from '$lib/domain/infra/logger';
import { QuestInitiative, QuestStage } from '$lib/domain/navigation/quests-models';
import type { UnitAction } from '$lib/schemas/unit-calculationts';

/* GENERAL */

// let _initiative: QuestInitiative = $state(QuestInitiative.Player);
// export function getInitiative() {
// 	return _initiative;
// }
// export function setInitiative(value: QuestInitiative) {
// 	_initiative = value;
// }

// let _stage: QuestStage = $state(QuestStage.NewRound);
// export function getStage() {
// 	return _stage;
// }
// export function setStage(value: QuestStage) {
// 	_stage = value;
// }

// let _unitsActions: UnitAction[] = $state([]);
// export function getUnitActions() {
// 	return _unitsActions;
// }
// export function setUnitActions(value: UnitAction[]) {
// 	_unitsActions = [...value];
// }

// let _questRoundIndex: number = $state(0);
// export function getQuestRoundIndex() {
// 	return _questRoundIndex;
// }
// export function setQuestRoundIndex(value: number) {
// 	_questRoundIndex = value;
// }

// /* ENEMY*/
// let _enemyHp: number = $state(0);
// export function getEnemyHp() {
// 	return _enemyHp;
// }
// export function setEnemyHp(value: number) {
// 	_enemyHp = value;
// }
// export function decreaseEnemyHp(value: number) {
// 	_enemyHp -= value;
// }

// let _enemyMaxHp: number = $state(0);
// export function getEnemyMaxHp() {
// 	return _enemyMaxHp;
// }
// export function setEnemyMaxHp(value: number) {
// 	_enemyMaxHp = value;
// }

// /* ORDERS */
// let _crewOrder: string[] = $state([]);
// export function getCrewOrder() {
// 	return _crewOrder;
// }
// export function setCrewOrder(value: string[]) {
// 	_crewOrder = value;
// }

// let _enemiesOrder: string[] = $state([]);
// export function getEnemiesOrder() {
// 	return _enemiesOrder;
// }
// export function setEnemiesOrder(value: string[]) {
// 	_enemiesOrder = value;
// }

// let _allOrder: string[] = $state([]);
// export function getAllOrder() {
// 	return _allOrder;
// }
// export function setAllOrder(value: string[]) {
// 	_allOrder = value;
// }

// /* Combat Stats */
// let _crewCombatStats: CombatStats = $state({
// 	power: 0,
// 	defense: 0
// });
// export function getCrewCombatStats() {
// 	return _crewCombatStats;
// }
// export function setCrewCombatStats(value: CombatStats) {
// 	_crewCombatStats = value;
// }

// let _enemyCombatStats: CombatStats = $state({
// 	power: 0,
// 	defense: 0
// });
// export function getEnemyCombatStats() {
// 	return _enemyCombatStats;
// }
// export function setEnemyCombatStats(value: CombatStats) {
// 	_enemyCombatStats = value;
// }

// /* Combat Logs */
// let _combatLogs: CombatLog[] = $state([]);
// export function getCombatLogs() {
// 	return _combatLogs;
// }
// export function setCombatLogs(value: CombatLog[]) {
// 	_combatLogs = value;
// }
// export function addCombatLog(message: string) {
// 	logCombat(message);
// 	_combatLogs.push({
// 		message
// 	});
// }
