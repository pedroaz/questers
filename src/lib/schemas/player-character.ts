import { Unit } from './unit';

export class PlayerCharacter {
	unit: Unit = new Unit();

	constructor() {
		this.unit.name = 'Bob';
	}
}
