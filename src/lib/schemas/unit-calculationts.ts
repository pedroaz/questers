import type { SkillInstance } from '$lib/data/skills';
import { log } from '$lib/services/infra/logger';
import {
	getCrew,
	getCrewActions,
	getCrewOrder,
	getEnemies,
	getPlayerQuest,
	getTotalCrewDefense,
	getTotalCrewPower,
	getTotalEnemyDefense,
	getTotalEnemyPower,
	setCrewActions,
	setTotalCrewDefense,
	setTotalCrewPower,
	setTotalEnemyDefense,
	setTotalEnemyPower
} from '$lib/states/game-state.svelte';
import { delay } from '$lib/utils';
import { DEFENSE_MULT_MAP, POWER_MULT_MAP } from './quest-attributes-map';
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

export function newTurn() {}

export async function startCombat() {
	log('Starting Combat');
	organizeActions();

	const crew = getCrew();

	for (const unit of crew) {
		const statsPower = getUnitPower(unit);
		const statsDefense = getUnitDefense(unit);
		setTotalCrewPower(getTotalCrewPower() + statsPower);
		setTotalCrewDefense(getTotalCrewDefense() + statsDefense);
		shakeById(unit.uuid);
		await delay(500);
	}

	const enemies = getEnemies();
	for (const unit of enemies) {
		const statsPower = getUnitPower(unit);
		const statsDefense = getUnitDefense(unit);
		setTotalEnemyPower(getTotalEnemyPower() + statsPower);
		setTotalEnemyDefense(getTotalEnemyDefense() + statsDefense);
		shakeById(unit.uuid);
		await delay(500);
	}

	setTotalCrewPower(getTotalCrewPower() - getTotalEnemyDefense());
	setTotalEnemyPower(getTotalEnemyPower() - getTotalCrewDefense());
	setTotalCrewDefense(0);
	setTotalEnemyDefense(0);
	shakeByClass('total-box');
}

function shakeById(id: string) {
	window.dispatchEvent(
		new CustomEvent('shake-by-id', {
			detail: { id }
		})
	);
}

function shakeByClass(id: string) {
	window.dispatchEvent(
		new CustomEvent('shake-by-class', {
			detail: { id }
		})
	);
}

export function endCombatChecks() {}

export function getUnitAction(unitId: string): UnitAction | undefined {
	return getCrewActions().find((action) => action.unitId == unitId);
}
function getUnitPower(unit: Unit) {
	const quest = getPlayerQuest();

	const mult = POWER_MULT_MAP[quest.type];

	let statsPower = 0;
	const str = unit.baseAttributes.strength + mult.strength;
	const vit = unit.baseAttributes.vitality + mult.vitality;
	const agi = unit.baseAttributes.agility + mult.agility;
	const int = unit.baseAttributes.intellect + mult.intellect;
	const spi = unit.baseAttributes.spirit + mult.spirit;

	statsPower += str + vit + agi + int + spi;
	return statsPower;
}

function getUnitDefense(unit: Unit) {
	const quest = getPlayerQuest();

	const mult = DEFENSE_MULT_MAP[quest.type];

	let statsDefense = 0;
	const str = unit.baseAttributes.strength + mult.strength;
	const vit = unit.baseAttributes.vitality + mult.vitality;
	const agi = unit.baseAttributes.agility + mult.agility;
	const int = unit.baseAttributes.intellect + mult.intellect;
	const spi = unit.baseAttributes.spirit + mult.spirit;

	statsDefense += str + vit + agi + int + spi;
	return statsDefense;
}
