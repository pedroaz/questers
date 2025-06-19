import { v4 as uuid4 } from 'uuid';

import { SkillId } from './skills-models';
import { BuffId } from '../buffs/buffs-models';
import { BUFFS_DICT } from '../buffs/buffs-storage';

import type { Unit } from '$lib/domain/unit/unit';
import { getCombatState } from '$lib/states/combat-state.svelte';
import { getPlayerParty } from '$lib/states/player-state.svelte';
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
	[SkillId.Enrage]: (unit: Unit) => {
		removeHp(unit, 2);
		addBuff(unit, BuffId.Enrage);
	},
	[SkillId.ImprovisedShield]: nothing,
	[SkillId.FishingPoleStrike]: nothing
};

// UTILS
function nothing(unit: Unit) {}

function addBuff(unit: Unit, buffId: BuffId) {
	const state = getCombatState();
	const key = isUnitFriendly(unit) ? 'partyBuffs' : 'enemiesBuffs';
	const data = BUFFS_DICT[buffId];
	state[key].push({
		uuid: uuid4(),
		data,
		duration: data.initialDuration
	});
}

function removeHp(unit: Unit, amount: number) {
	const party = getPlayerParty();
	const state = getCombatState();
	if (isUnitFriendly(unit)) {
		party.hp -= amount;
	} else {
		state.enemiesHp -= amount;
	}
}

// SKILLS

function execAttack(unit: Unit) {
	const state = getCombatState();
	const key = isUnitFriendly(unit) ? 'partyAttack' : 'enemiesAttack';
	state[key] += 1;
}

function execDefend(unit: Unit) {
	const state = getCombatState();
	const key = isUnitFriendly(unit) ? 'partyDefense' : 'enemiesDefense';
	state[key] += 1;
}
