<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import { getCombatLogs } from '$lib/states/game-state.svelte';

	const data = $derived.by(() => {
		const combatLogs = getCombatLogs();
		return {
			combatLogs
		};
	});
</script>

{#each data.combatLogs as log}
	<Text>{log.message}</Text>
{/each}
