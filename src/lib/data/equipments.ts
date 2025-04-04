import { UnitAttributes } from '$lib/schemas/unit';

export type EquipmentType = 'weapon' | 'armor' | 'trinket';

export type Equipment = 'sword' | 'armor';

export class EquipmentData {
	name: string = '';
	type: EquipmentType = 'armor';
	image: string = '';
	bonusAttributes?: UnitAttributes = new UnitAttributes();
}

export let EQUIP_DICT: Record<Equipment, EquipmentData>;
import equipsFile from './equipments.json';

export function loadEquipDict() {
	EQUIP_DICT = equipsFile.reduce(
		(dict, equip) => {
			dict[equip.id as Equipment] = {
				...equip,
				type: equip.type as EquipmentType,
				bonusAttributes: equip.bonusAttributes
			};
			return dict;
		},
		{} as Record<Equipment, EquipmentData>
	);
}
