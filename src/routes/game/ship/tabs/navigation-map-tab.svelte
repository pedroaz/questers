<script lang="ts">
	import AreaCard from '$lib/components/game/area-card/area-card.svelte';
	import { getAreas } from '$lib/states/game-state.svelte';

	const availableAreas = getAreas();
</script>

Navigation Map

{#each availableAreas as area}
	<AreaCard {area}></AreaCard>
{/each}
