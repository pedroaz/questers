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

	constructor(
		name: string,
		type: EquipmentType,
		bonusHealth?: number,
		bonusMana?: number,
		bonusStrength?: number,
		bonusAgility?: number,
		bonusIntellect?: number,
		bonusSpirit?: number,
		bonusVitality?: number,
		bonusAttack?: number,
		bonusDefense?: number
	) {
		this.name = name;
		this.type = type;
		this.bonusHealth = bonusHealth;
		this.bonusMana = bonusMana;
		this.bonusStrength = bonusStrength;
		this.bonusAgility = bonusAgility;
		this.bonusIntellect = bonusIntellect;
		this.bonusSpirit = bonusSpirit;
		this.bonusVitality = bonusVitality;
		this.bonusAttack = bonusAttack;
		this.bonusDefense = bonusDefense;
	}
}

export function loadEquipDict() {
	EQUIP_DICT = {
		[Equipment.BronzeSword]: new EquipmentData('Bronze Sword', EquipmentType.Weapon),
		[Equipment.BronzeArmor]: new EquipmentData('Bronze Armor', EquipmentType.Armor)
	};
}

export let EQUIP_DICT: Record<Equipment, EquipmentData>;
