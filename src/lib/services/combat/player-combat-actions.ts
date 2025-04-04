import type { SkillInstance } from '$lib/data/skills';
import { UnitAction } from '$lib/schemas/unit-calculationts';
import { getUnitActions, setUnitActions, getCrewOrder } from '$lib/states/game-state.svelte';

export function addUnitAction(unitId: string, skillInstance: SkillInstance) {
	removeAction(unitId);
	const unitAction = new UnitAction();
	unitAction.unitId = unitId;
	unitAction.skillInstance = skillInstance;
	const actions = [...getUnitActions(), unitAction];
	setUnitActions(actions);
}

export function removeAction(unitId: string) {
	const newActions = getUnitActions().filter((unitAction) => unitAction.unitId != unitId);
	setUnitActions(newActions);
}

export function organizeActions() {
	// Organize actions
	const actionMap = new Map(getUnitActions().map((action) => [action.unitId, action]));

	// Reorder based on newOrder
	const orderedList = getCrewOrder()
		.map((id) => actionMap.get(id))
		.filter((action): action is UnitAction => !!action);
	setUnitActions(orderedList);
}

export function endCombatChecks() {}

export function getUnitAction(unitId: string): UnitAction | undefined {
	return getUnitActions().find((action) => action.unitId == unitId);
}
