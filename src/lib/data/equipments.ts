import { UnitAttributes, UnitStats } from '$lib/schemas/unit';

export type EquipmentType = 'weapon' | 'armor';

export type Equipment = 'bronze-sword' | 'bronze-armor';

export class EquipmentData {
	name: string = '';
	type: EquipmentType = 'armor';
	bonusStats?: UnitStats = new UnitStats();
	bonusAttributes?: UnitAttributes = new UnitAttributes();
}

export let EQUIP_DICT: Record<Equipment, EquipmentData>;
import equipsFile from './equipments.json';

export function loadEquipDict() {
	EQUIP_DICT = equipsFile.reduce(
		(dict, equip) => {
			dict[equip.id as Equipment] = {
				name: equip.name,
				type: equip.type as EquipmentType,
				bonusStats: equip.bonusStats,
				bonusAttributes: equip.bonusAttributes
			};
			return dict;
		},
		{} as Record<Equipment, EquipmentData>
	);
}
