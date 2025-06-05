import type { Unit } from '$lib/domain/unit/unit';

let _units = $state({} as Unit[]);
export function getUnits() {
	return _units;
}
export function setUnits(value: Unit[]) {
	_units = value;
}
export function getUnitById(unitId: string) {
	return _units.find((u) => u.uuid === unitId)!;
}
export function addUnitToWorld(unit: Unit) {
	_units.push(unit);
}
export function removeUnitById(unitId: string) {
	_units = _units.filter((u) => u.uuid !== unitId);
}

// let _npcParties = $state({} as Party[]);
// export function getNpcParties() {
// 	return _npcParties;
// }
// export function setNpcParties(value: Party[]) {
// 	_npcParties = value;
// }
