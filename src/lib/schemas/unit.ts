export class Unit {
	name: string = '';
	level: number = 0;
}

export function newBaseUnit() {
	const obj: Unit = {
		name: '',
		level: 0
	};
	return obj;
}
