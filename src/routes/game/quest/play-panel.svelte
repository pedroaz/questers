<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { startCombat } from '$lib/domain/combat/combat-life-cycle';
	import { CombatPhase, getCombatState } from '$lib/states/combat-state.svelte';

	const data = $derived.by(() => {
		const combatState = getCombatState();
		return {
			combatState
		};
	});
</script>

<div>
	<Button
		onclick={async () => await startCombat()}
		disabled={data.combatState.phase != CombatPhase.WaitingForInput}>Start</Button
	>
</div>
