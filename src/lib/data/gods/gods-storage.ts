export let GOD_DICT: Record<GodId, GodData>;

import type { GodId, GodData } from './gods-models';
import godsFile from './gods.json';

export function loadGodDict() {
	GOD_DICT = godsFile.reduce(
		(dict, god) => {
			dict[god.id as GodId] = god as GodData;
			return dict;
		},
		{} as Record<GodId, GodData>
	);
}
