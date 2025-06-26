import type { BuffData, BuffId, BuffTrigger } from './buffs-models';
import buffsFile from './buffs.json';

export let BUFFS_DICT: Record<BuffId, BuffData>;

export function loadBuffsDict() {
	BUFFS_DICT = buffsFile.reduce(
		(dict, buff) => {
			dict[buff.id as BuffId] = {
				...buff,
				id: buff.id as BuffId,
				trigger: buff.trigger as BuffTrigger
			};
			return dict;
		},
		{} as Record<BuffId, BuffData>
	);
}
