<script lang="ts">
	import UnitCard from '$lib/components/game/unit-card/unit-card.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { GetGameState } from '$lib/states/game-state.svelte';

	const gameState = GetGameState();
</script>

<ScrollArea class="h-[400px] w-[350px] rounded-md border p-4">
	<div class="flex flex-col gap-4">
		{#each gameState.data.worldUnits as unit}
			<UnitCard {unit}></UnitCard>
		{/each}
	</div>
</ScrollArea>
