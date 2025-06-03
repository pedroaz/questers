<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import { getCombatState } from '$lib/states/combat-state.svelte';

	const data = $derived.by(() => {
		const combatState = getCombatState();
		const logs = combatState.logs;
		return {
			logs
		};
	});
</script>

<div class="flex flex-col items-center gap-2">
	<Text type="big">Logs</Text>
	{#each data.logs as log}
		<Text>[R{log.roundIndex}|C{log.combatIndex}]&nbsp;{log.text}</Text>
	{/each}
</div>
