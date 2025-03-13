import { UnitAttributes } from '$lib/schemas/unit';

export type EquipmentType = 'weapon' | 'armor' | 'trinket';

export type Equipment = 'none' | 'bronze-sword' | 'bronze-armor';

export class EquipmentData {
	name: string = '';
	type: EquipmentType = 'armor';
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
				bonusAttributes: equip.bonusAttributes
			};
			return dict;
		},
		{} as Record<Equipment, EquipmentData>
	);
}
