export enum EquipmentType {
	Weapon = 'Weapon',
	Armor = 'Armor'
}

export enum Equipment {
	BronzeSword = 'bronze-sword',
	BronzeArmor = 'bronze-armor'
}

export class EquipmentData {
	name: string = '';
	type: EquipmentType = EquipmentType.Weapon;
	bonusHealth?: number = 0;
	bonusMana?: number = 0;
	bonusStrength?: number = 0;
	bonusAgility?: number = 0;
	bonusIntellect?: number = 0;
	bonusSpirit?: number = 0;
	bonusVitality?: number = 0;
	bonusAttack?: number = 0;
	bonusDefense?: number = 0;
}

export const EQUIP_DICT: Record<Equipment, EquipmentData> = {
	[Equipment.BronzeSword]: {
		name: 'Bronze Sword',
		type: EquipmentType.Weapon,
		bonusAttack: 10
	},
	[Equipment.BronzeArmor]: new EquipmentData()
};
