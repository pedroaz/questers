import { MONSTER_DICT, type Monster } from '$lib/data/monsters';
import { Unit, UnitClass } from '$lib/schemas/unit';

export function createUnit(name: string) {
	const unit = new Unit();
	unit.name = name;
	return unit;
}

export function createMonsterUnit(monster: Monster, sufix: string = '') {
	const unit = new Unit();
	const monsterData = MONSTER_DICT[monster];
	unit.name = monsterData.name + sufix;
	unit.class = UnitClass.MonsterNormal;
	unit.row = monsterData.startingLocation;
	return unit;
}
