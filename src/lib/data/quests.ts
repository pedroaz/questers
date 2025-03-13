export type Quest = 'none' | 'kill-rats';
import type { Attribute, Unit } from '$lib/schemas/unit';
import { v4 as uuid4 } from 'uuid';
import type { Monster } from './monsters';

export type QuestType =
	| 'none'
	| 'hunt'
	| 'fish'
	| 'sail'
	| 'craft'
	| 'recruit'
	| 'gather'
	| 'explore';

export let QUEST_ATTR_MAP: Record<QuestType, Attribute[]>;

export function loadAttributeMapping() {
	QUEST_ATTR_MAP = {
		none: [],
		hunt: ['str', 'agi'],
		fish: ['agi'],
		sail: ['vit'],
		craft: ['int'],
		recruit: ['vit'],
		gather: ['agi'],
		explore: ['vit']
	};
}

export class QuestData {
	name: string = '';
	type: QuestType = 'none';
	monsters?: Monster[] = [];
}

export class QuestInstance {
	id: string = uuid4();
	type: QuestType = 'none';
	enemies: Unit[] = [];
}
