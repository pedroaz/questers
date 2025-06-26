export enum BuffId {
	Rally = 'rally',
	Enrage = 'enrage'
}

export enum BuffTrigger {
	StartCombat = 'start-combat',
	EndCombat = 'end-combat',
	UnitAttack = 'unit-attack',
	OffensiveSkills = 'offensive-skills',
	DefensiveSkills = 'defensive-skills'
}

export interface BuffData {
	id: BuffId;
	image: string;
	name: string;
	description: string;
	trigger: BuffTrigger;
	initialDuration: number;
}

export interface BuffInstance {
	uuid: string;
	data: BuffData;
	duration: number;
}
