import type { ClassId } from '../classes/classes-models';
import type { SkillId } from '../skills/skills-models';

import type { Attribute } from '$lib/domain/unit/attribute';

export enum CompanionId {
	Ruthgarth = 'ruthgarth',
	Runinati = 'runinati',
	Chrono = 'chrono',
	Mcorno = 'mcorno',
	Settings = 'settings',
	Freaks = 'freaks',
	Inverta = 'inverta',
	Saci = 'saci',
	Equalfour = 'equalfour',
	Gin = 'gin',
	Dora = 'dora',
	Lara = 'lara',
	Sugameuku = 'sugameuku',
	Anti = 'anti',
	Potter = 'potter',
	Six = 'six',
	Cabela = 'cabela',
	Bugiganga = 'bugiganga',
	Cacareco = 'cacareco',
	MineCrafter = 'minecrafter'
}

export interface CompanionData {
	id: CompanionId;
	name: string;
	description: string;
	image: string;
	class: ClassId;
	levelUps: Attribute[];
	skills: SkillId[];
}
