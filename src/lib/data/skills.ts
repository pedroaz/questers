import type { Unit } from '$lib/schemas/unit';
import { getAttack } from '$lib/services/combat-serice';

export enum Skill {
	None = 'none',
	WeaponAttack = 'weapon-attack'
	// FireBall = 'fireball',
	// Blizzard = 'blizzard'
}

export enum SkillType {
	None = 'none',
	Attack = 'attack',
	Defense = 'defense'
}

export enum SkillTargetType {
	None = 'none',
	Self = 'self',
	Single = 'single',
	All = 'all',
	FrontRow = 'front-row',
	BackRow = 'back-row',
	Vertical = 'vertical',
	Horizontal = 'horizontal'
}

export class SkillData {
	name: string = '';
	description: string = '';
	type: SkillType = SkillType.None;
	targetType: SkillTargetType = SkillTargetType.None;
	cast: (caster: Unit, targets: Unit[], level: number) => void = () => {};
}

export const SKILL_DICT: Record<Skill, SkillData> = {
	[Skill.None]: {
		name: 'None',
		description: 'No Skill',
		type: SkillType.None,
		targetType: SkillTargetType.None,
		cast: () => {}
	},
	[Skill.WeaponAttack]: {
		name: 'Weapon Attack',
		description: 'Attack with a weapon',
		type: SkillType.Attack,
		targetType: SkillTargetType.Single,
		cast: (unit: Unit, targets: Unit[], level: number) => {
			let dmg = 0;
			const attack = getAttack(unit);
			dmg += attack;
			const target = targets[0];
			dmg += level * 2;
			target.hp -= dmg;
		}
	}
};
