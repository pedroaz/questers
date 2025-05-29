import type { SkillId } from './skills-models';

export const SKILL_MAP: Record<SkillId, () => void> = {
	attack: execAttack,
	defend: execDefend
};

function execAttack() {
	// setTotalCrewPower(getTotalCrewPower() + 1);
}
function execDefend() {
	// setTotalCrewDefense(getTotalCrewDefense() + 1);
}
