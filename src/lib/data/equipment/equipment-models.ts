import type { UnitAttributes } from '$lib/domain/unit/attribute';

export enum EquipmentType {
	Weapon = 'weapon',
	Armor = 'armor',
	Trinket = 'trinket'
}

export enum EquipmentId {
	Sword = 'sword',
	Armor = 'armor'
}

export interface EquipmentData {
	name: string;
	type: EquipmentType;
	image: string;
	bonusAttributes?: UnitAttributes;
}
