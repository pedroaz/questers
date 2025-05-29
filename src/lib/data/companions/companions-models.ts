export enum CompanionId {
	Nioshi = 'nioshi',
	Takeo = 'takeo',
	Sugameuku = 'sugameuku',
	Ruthgarth = 'ruthgarth',
	Nina = 'nina'
}

export interface CompanionData {
	id: CompanionId;
	name: string;
	image: string;
}
