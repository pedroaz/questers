import type { ClassId } from '../classes/classes-models';

export enum CompanionId {
	Ruthgarth = 'ruthgarth',
	Runinati = 'runinati',
	Chrono = 'chrono',
	DarkKnight = 'dk',
	Settings = 'settings',
	Freaks = 'freaks',
	Inverto = 'inverto',
	Saci = 'saci',
	Equalfour = 'equalfour',
	Gin = 'gin',
	Dora = 'dora',
	Lara = 'lara',
	Sugameuku = 'sugameuku',
	Anti = 'anti',
	Potter = 'potter',
	Six = 'six',
	Cabelo = 'cabelo',
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
}
