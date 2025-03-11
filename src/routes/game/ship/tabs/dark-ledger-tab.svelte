<script lang="ts">
	import UnitCard from '$lib/components/game/unit-card/unit-card.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { getWorldUnits } from '$lib/states/game-state.svelte';
</script>

<ScrollArea class="h-[400px] w-[350px] rounded-md border p-4">
	<div class="flex flex-col gap-4">
		{#each getWorldUnits() as unit}
			<UnitCard {unit}></UnitCard>
		{/each}
	</div>
</ScrollArea>
