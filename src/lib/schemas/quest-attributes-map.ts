import type { QuestType } from '$lib/data/navigation/navigation-models';
import type { UnitAttributes } from '$lib/domain/unit/attribute';

export const POWER_MULT_MAP: Record<QuestType, UnitAttributes> = {
	balanced: {
		strength: 1,
		agility: 1,
		leadership: 1,
		intellect: 1,
		spirit: 1
	},
	combat: {
		strength: 3,
		agility: 1.5,
		leadership: 1.5,
		intellect: 0,
		spirit: 1
	},
	hunt: {
		strength: 1,
		agility: 2.5,
		leadership: 0,
		intellect: 1,
		spirit: 1
	},
	craft: {
		strength: 0,
		agility: 0.4,
		leadership: 0,
		intellect: 3,
		spirit: 1
	},
	recruit: {
		strength: 0.5,
		agility: 0,
		leadership: 3,
		intellect: 1.5,
		spirit: 1
	},
	gather: {
		strength: 0,
		agility: 0,
		leadership: 0,
		intellect: 0,
		spirit: 1
	},
	explore: {
		strength: 0,
		agility: 2,
		leadership: 0,
		intellect: 0,
		spirit: 0
	},
	fightspirits: {
		strength: 0,
		agility: 0,
		leadership: 0,
		intellect: 0,
		spirit: 5
	}
};
