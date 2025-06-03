import { SkillId } from './skills-models';

export const SKILL_MAP: Record<SkillId, () => void> = {
	[SkillId.Attack]: execAttack,
	[SkillId.Defend]: execDefend,
	[SkillId.Slash]: nothing,
	[SkillId.DoubleSlash]: nothing,
	[SkillId.TripleSlash]: nothing,
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

function nothing() {}

function execAttack() {
	// setTotalCrewPower(getTotalCrewPower() + 1);
}
function execDefend() {
	// setTotalCrewDefense(getTotalCrewDefense() + 1);
}
