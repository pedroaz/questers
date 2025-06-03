import type { ClassId } from '../classes/classes-models';

export enum CompanionId {
	Ruthgarth = 'ruthgarth',
	Sugameuku = 'sugameuku',
	Settings = 'settings'
}

export interface CompanionData {
	id: CompanionId;
	name: string;
	image: string;
	class: ClassId;
}
