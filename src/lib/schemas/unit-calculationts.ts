import type { SkillInstance } from '$lib/data/skills';
import { getCrewActions, getCrewOrder, setCrewActions } from '$lib/states/game-state.svelte';
import { STARTER_CLASSES, type Unit } from './unit';
import { v4 as uuid4 } from 'uuid';

export type Turn = 'player' | 'enemy';

export class UnitAction {
	unitId: string = '';
	skillInstance?: SkillInstance = undefined;
}

export function recalculateUnit(unit: Unit) {
	setBaseAttributes(unit);
	setSkills(unit);
	setSkillInstances(unit);
}
function setBaseAttributes(unit: Unit) {
	const classData = STARTER_CLASSES.find((classData) => classData.class == unit.class);
	if (!classData) {
		throw new Error(`Class ${unit.class} not found`);
	}
	unit.baseAttributes = classData.attributeBonus;
}

function setSkills(unit: Unit) {
	unit.skills = [];

	switch (unit.class) {
		case 'warrior':
			unit.skills.push('slash');
			break;
	}
}
function setSkillInstances(unit: Unit) {
	unit.skillInstances = [];
	unit.skills.forEach((skill) => {
		unit.skillInstances.push({
			id: uuid4(),
			type: skill,
			used: false
		});
	});
}

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

export function startTurn() {
	organizeActions();
}

export function resetCombatState() {}

export function getUnitAction(unitId: string): UnitAction | undefined {
	return getCrewActions().find((action) => action.unitId == unitId);
}
