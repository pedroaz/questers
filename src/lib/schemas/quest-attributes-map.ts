import type { QuestType } from '$lib/data/quests';
import type { UnitAttributes } from './unit';

export const POWER_MULT_MAP: Record<QuestType, UnitAttributes> = {
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

export const DEFENSE_MULT_MAP: Record<QuestType, UnitAttributes> = {
	none: {
		strength: 0,
		vitality: 0,
		agility: 0,
		intellect: 0,
		spirit: 0
	},
	hunt: {
		strength: 0.1,
		vitality: 0,
		agility: 0,
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
