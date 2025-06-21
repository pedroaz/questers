<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { startCombat } from '$lib/domain/combat/combat-life-cycle';
	import { rollPartySkills } from '$lib/domain/combat/combat-manager';
	import { CombatPhase, getCombatState } from '$lib/states/combat-state.svelte';
	const combatState = getCombatState();
</script>

<Button
	disabled={combatState.skillRolls <= 0 || combatState.phase !== CombatPhase.WaitingForInput}
	onclick={async () => {
		if (combatState.skillRolls <= 0) return;
		combatState.skillRolls--;
		rollPartySkills();
	}}>Reroll Skills x{combatState.skillRolls}</Button
>
