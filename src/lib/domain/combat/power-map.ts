import type { UnitAttributes } from '../unit/attribute';

import { QuestType } from '$lib/data/navigation/navigation-models';
import { getCurrentQuest } from '$lib/states/player-state.svelte';
import { getUnitById } from '$lib/states/units-state.svelte';

const POWER_MAP: Record<QuestType, (attr: UnitAttributes) => number> = {
	[QuestType.Balanced]: function (attr: UnitAttributes): number {
		return attr.agility + attr.strength + attr.leadership + attr.intellect + attr.spirit;
	},
	[QuestType.Provoke]: function (attr: UnitAttributes): number {
		throw new Error('Function not implemented.');
	},
	[QuestType.Hunt]: function (attr: UnitAttributes): number {
		return 2 * attr.agility + attr.strength + attr.intellect;
	},
	[QuestType.Craft]: function (attr: UnitAttributes): number {
		throw new Error('Function not implemented.');
	},
	[QuestType.Recruit]: function (attr: UnitAttributes): number {
		throw new Error('Function not implemented.');
	},
	[QuestType.Gather]: function (attr: UnitAttributes): number {
		throw new Error('Function not implemented.');
	},
	[QuestType.Explore]: function (attr: UnitAttributes): number {
		throw new Error('Function not implemented.');
	},
	[QuestType.Pray]: function (attr: UnitAttributes): number {
		throw new Error('Function not implemented.');
	},
	[QuestType.Arcane]: function (attr: UnitAttributes): number {
		throw new Error('Function not implemented.');
	}
};

export const POWER_MAP_DESC: Record<QuestType, string> = {
	[QuestType.Balanced]: '',
	[QuestType.Provoke]: '',
	[QuestType.Hunt]: '2 * AGI + STR + INT',
	[QuestType.Craft]: '',
	[QuestType.Recruit]: '',
	[QuestType.Gather]: '',
	[QuestType.Explore]: '',
	[QuestType.Pray]: '',
	[QuestType.Arcane]: ''
};

export function setUnitPower(unitId: string) {
	const unit = getUnitById(unitId);
	const quest = getCurrentQuest();
	unit.power = POWER_MAP[quest.data.type](unit.attributes);
	console.log(`Power of ${unit.name} is ${unit.power}`);
}
