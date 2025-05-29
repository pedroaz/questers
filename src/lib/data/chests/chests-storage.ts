import type { ChestData, ChestId } from './chests-models';
import chestsFile from './chests.json';
import type { EquipmentId } from '../equipment/equipment-models';

export let CHESTS_DICT: Record<ChestId, ChestData>;

export function loadChestsDict() {
	CHESTS_DICT = chestsFile.reduce(
		(dict, chest) => {
			dict[chest.id as ChestId] = {
				...chest,
				id: chest.id as ChestId,
				equipChances: chest.equipChances.map((equip) => ({
					equip: equip.equip as EquipmentId,
					chance: equip.chance
				}))
			};
			return dict;
		},
		{} as Record<ChestId, ChestData>
	);
}
