import type { SkillInstance } from '$lib/data/skills';
import { UnitAction } from '$lib/schemas/unit-calculationts';
import { getCrewActions, setCrewActions, getCrewOrder } from '$lib/states/game-state.svelte';

export function addCrewAction(unitId: string, skillInstance: SkillInstance) {
	if (getCrewActions().find((action) => action.unitId == unitId)) {
		return;
	}
	const unitAction = new UnitAction();
	unitAction.unitId = unitId;
	unitAction.skillInstance = skillInstance;
	const actions = [...getCrewActions(), unitAction];
	setCrewActions(actions);
}

export function removeCrewAction(unitId: string) {
	const newActions = getCrewActions().filter((unitAction) => unitAction.unitId != unitId);
	setCrewActions(newActions);
}

export function organizeActions() {
	// Organize actions
	const actionMap = new Map(getCrewActions().map((action) => [action.unitId, action]));

	// Reorder based on newOrder
	const orderedList = getCrewOrder()
		.map((id) => actionMap.get(id))
		.filter((action): action is UnitAction => !!action);
	setCrewActions(orderedList);
}

export function endCombatChecks() {}

export function getUnitAction(unitId: string): UnitAction | undefined {
	return getCrewActions().find((action) => action.unitId == unitId);
}
