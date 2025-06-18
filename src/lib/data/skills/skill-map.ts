import { SkillId } from './skills-models';

import type { Unit } from '$lib/domain/unit/unit';
import { getCombatState } from '$lib/states/combat-state.svelte';
import { isUnitFriendly } from '$lib/utils';

export const SKILL_MAP: Record<SkillId, (unit: Unit) => void> = {
	[SkillId.Attack]: execAttack,
	[SkillId.Defend]: execDefend,
	[SkillId.Slash]: nothing,
	[SkillId.DoubleSlash]: nothing,
	[SkillId.AllIn]: nothing,
	[SkillId.RallyTroops]: nothing,
	[SkillId.Resilience]: nothing,
	[SkillId.FarSight]: nothing,
	[SkillId.QuickAttack]: nothing,
	[SkillId.Blast]: nothing,
	[SkillId.BruteForce]: nothing,
	[SkillId.Concentrate]: nothing,
	[SkillId.FireZap]: nothing,
	[SkillId.IceZap]: nothing,
	[SkillId.ThunderZap]: nothing,
	[SkillId.Enrage]: nothing,
	[SkillId.ImprovisedShield]: nothing,
	[SkillId.FishingPoleStrike]: nothing
};

function nothing(unit: Unit) {}

function execAttack(unit: Unit) {
	const state = getCombatState();
	if (isUnitFriendly(unit)) {
		state.partyAttack += 1;
	} else {
		state.enemiesAttack += 1;
	}
}
function execDefend(unit: Unit) {
	const state = getCombatState();
	if (isUnitFriendly(unit)) {
		state.partyDefense += 1;
	} else {
		state.enemiesDefense += 1;
	}
}
