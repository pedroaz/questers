import type { QuestType } from '$lib/data/quests';
import type { SkillInstance } from '$lib/data/skills';
import { log } from '$lib/services/infra/logger';
import {
	addTotalCrewPower,
	getCrew,
	getCrewActions,
	getCrewOrder,
	getPlayerQuest,
	setCrewActions
} from '$lib/states/game-state.svelte';
import { delay } from '$lib/utils';
import { tick } from 'svelte';
import { STARTER_CLASSES, UnitAttributes, type Unit } from './unit';
import { v4 as uuid4 } from 'uuid';

export type Turn = 'player' | 'enemy';

export const QUEST_ATTRIBUTE_MULT: Record<QuestType, UnitAttributes> = {
	none: {
		strength: 0,
		vitality: 0,
		agility: 0,
		intellect: 0,
		spirit: 0
	},
	hunt: {
		strength: 1,
		vitality: 0,
		agility: 0.5,
		intellect: 0,
		spirit: 0
	},
	fish: {
		strength: 0,
		vitality: 1,
		agility: 0,
		intellect: 0,
		spirit: 0
	},
	sail: {
		strength: 0,
		vitality: 0,
		agility: 1,
		intellect: 0,
		spirit: 0
	},
	craft: {
		strength: 0,
		vitality: 0,
		agility: 0,
		intellect: 1,
		spirit: 0
	},
	recruit: {
		strength: 0,
		vitality: 0,
		agility: 0,
		intellect: 0,
		spirit: 1
	},
	gather: {
		strength: 0,
		vitality: 0,
		agility: 0,
		intellect: 0,
		spirit: 1
	},
	explore: {
		strength: 0,
		vitality: 0,
		agility: 2,
		intellect: 0,
		spirit: 0
	}
};

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

	const quest = getPlayerQuest();
	const mult = QUEST_ATTRIBUTE_MULT[quest.type];
	const crew = getCrew();

	for (const unit of crew) {
		let statsPower = 0;
		const str = unit.baseAttributes.strength + mult.strength;
		const vit = unit.baseAttributes.vitality + mult.vitality;
		const agi = unit.baseAttributes.agility + mult.agility;
		const int = unit.baseAttributes.intellect + mult.intellect;
		const spi = unit.baseAttributes.spirit + mult.spirit;

		const event = new CustomEvent('shake-div', {
			detail: { id: unit.uuid }
		});

		statsPower += str + vit + agi + int + spi;
		addTotalCrewPower(statsPower);

		window.dispatchEvent(event);
		await tick();
		await delay(1000);
	}

	// add attributes to power

	// add attributes to defense
}

export function endCombatChecks() {}

export function getUnitAction(unitId: string): UnitAction | undefined {
	return getCrewActions().find((action) => action.unitId == unitId);
}
