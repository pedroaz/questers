import { ClassId } from '$lib/data/classes/classes-models';

export interface StartingClass {
	id: ClassId;
	enabled: boolean;
}

export const STARTING_CLASSES: StartingClass[] = [
	{
		id: ClassId.Warrior,
		enabled: true
	},
	{
		id: ClassId.Explorer,
		enabled: false
	},
	{
		id: ClassId.Crafter,
		enabled: false
	},
	{
		id: ClassId.Hunter,
		enabled: false
	},
	{
		id: ClassId.Mage,
		enabled: false
	}
];
