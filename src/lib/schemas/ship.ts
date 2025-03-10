import { v4 as uuid4 } from 'uuid';

export class Ship {
	id: string = uuid4();
	units: string[] = [];
}
