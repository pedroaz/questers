<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { startCombat } from '$lib/domain/combat/combat-life-cycle';
	import { goToScreen } from '$lib/domain/screen-changing/screen-changer-service';
	import { ScreenId } from '$lib/domain/screen-changing/screens';
	import { CombatPhase, getCombatState } from '$lib/states/combat-state.svelte';

	const data = $derived.by(() => {
		const combatState = getCombatState();
		return {
			combatState
		};
	});
</script>

<Button
	onclick={async () => await startCombat()}
	disabled={data.combatState.phase != CombatPhase.WaitingForInput}>Start</Button
>

{#if data.combatState.phase == CombatPhase.Won}
	<Button onclick={async () => goToScreen(ScreenId.Rewards)}>Win!</Button>
{/if}

{#if data.combatState.phase == CombatPhase.Lost}
	<Button onclick={async () => goToScreen(ScreenId.Lose)}>Lose!</Button>
{/if}
