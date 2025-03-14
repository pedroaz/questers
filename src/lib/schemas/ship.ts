import { v4 as uuid4 } from 'uuid';

export class Ship {
	id: string = uuid4();
	units: string[] = [];

	// If ship hp is zero, you lose (red)
	hp: number = 0;
	maxHp: number = 0;

	// Energy - Spend to do quests
	energy: number = 0;
}
