export enum GodId {
	Blue = 'blue',
	Red = 'red',
	Green = 'green'
}

export interface GodData {
	id: GodId;
	name: string;
	description: string;
	iconImage: string;
}
