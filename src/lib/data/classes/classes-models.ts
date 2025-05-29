export enum ClassId {
	Warrior = 'warrior',
	Explorer = 'explorer',
	Crafter = 'crafter',
	Hunter = 'hunter',
	Sage = 'sage'
}

export interface ClassData {
	id: ClassId;
	name: string;
	description: string;
	iconImage: string;
	bodyImage: string;
}
