<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import { getCombatLogs } from '$lib/states/game-state.svelte';
</script>

<div class="flex flex-col items-center justify-center">
	{#each getCombatLogs() as log}
		<Text>{log.message}</Text>
	{/each}
</div>
