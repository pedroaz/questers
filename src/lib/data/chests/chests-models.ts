import type { EquipmentId } from '../equipment/equipment-models';

export enum ChestId {
	GoldCommon = 'gold-common'
}

export interface ChestData {
	id: ChestId;
	name: string;
	image: string;
	minGold: number;
	maxGold: number;
	equipChances: EquipmentChance[];
}

export interface ChestReward {
	data: ChestData | null;
	gold: number;
	equips: EquipmentId[];
}

export interface EquipmentChance {
	equip: EquipmentId;
	chance: number;
}
