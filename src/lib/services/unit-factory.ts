import { Unit, UnitClass } from '$lib/schemas/unit';

export function createUnit(name: string) {
	const unit = new Unit();
	unit.name = name;
	return unit;
}

export function createMonsterUnit(name: string) {
	const unit = new Unit();
	unit.name = name;
	unit.class = UnitClass.MonsterNormal;
	return unit;
}
