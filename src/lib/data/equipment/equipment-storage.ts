import type { EquipmentId, EquipmentData, EquipmentType } from './equipment-models';
import equipsFile from './equipments.json';

export let EQUIP_DICT: Record<EquipmentId, EquipmentData>;

export function loadEquipDict() {
	EQUIP_DICT = equipsFile.reduce(
		(dict, equip) => {
			dict[equip.id as EquipmentId] = {
				...equip,
				type: equip.type as EquipmentType,
				bonusAttributes: equip.bonusAttributes
			};
			return dict;
		},
		{} as Record<EquipmentId, EquipmentData>
	);
}
