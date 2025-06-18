<script lang="ts">
	import UnitCard from '$lib/components/game/unit-card/unit-card.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { getPlayerParty } from '$lib/states/player-state.svelte';
	import { getUnitById } from '$lib/states/units-state.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { initLoadout } from './loadout-service';
	import { goToScreen } from '$lib/domain/screen-changing/screen-changer-service';
	import { ScreenId } from '$lib/domain/screen-changing/screens';
	import { Button } from '$lib/components/ui/button';
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import { ARTIFACTS_DICT } from '$lib/data/artifacts/artifacts-storage';
	import ArtifactLoadout from './artifact-loadout.svelte';

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		initLoadout();
	});

	onDestroy(() => {
		window.removeEventListener('keydown', handleKeydown);
	});

	async function handleKeydown(event: KeyboardEvent) {
		if (event.code === 'Space') {
			event.preventDefault(); // Optional: prevent scrolling
			nextDay();
		}
	}

	const data = $derived.by(() => {
		const party = getPlayerParty();
		return {
			party
		};
	});

	function nextDay() {
		goToScreen(ScreenId.Camp);
	}
</script>

<div class="flex flex-col items-center justify-center gap-4">
	<div class="flex items-center justify-center gap-4"></div>
	<div class="flex items-center justify-center gap-4">
		<UnitCard unit={getUnitById(data.party.playerId)}></UnitCard>
		{#each data.party.companionsIds as unit}
			<UnitCard unit={getUnitById(unit)}></UnitCard>
		{/each}
	</div>
	<ArtifactLoadout></ArtifactLoadout>
	<Button onclick={nextDay}>Next Day</Button>
</div>
