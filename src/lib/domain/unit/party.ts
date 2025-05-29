import type { ChestId } from '$lib/data/chests/chests-models';
import type { EquipmentId } from '$lib/data/equipment/equipment-models';

export interface PlayerParty {
	id: string;
	playerId: string;
	companionsIds: string[];
	hp: number;
	experience: number;
	gold: number;
	maxHp: number;
	energy: number;
	maxEnergy: number;
	chestsToOpen: ChestId[];
	storedEquips: EquipmentId[];
	skillRolls: number;
	maxSkillRolls: number;
}

export interface NpcGroup {
	power: number;
}
