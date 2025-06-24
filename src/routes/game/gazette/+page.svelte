<script lang="ts">
	import UnitCard from '$lib/components/game/unit-card/unit-card.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import { goToScreen } from '$lib/domain/screen-changing/screen-changer-service';
	import { ScreenId } from '$lib/domain/screen-changing/screens';
	import { getNavigationData } from '$lib/states/player-state.svelte';
	import { getNpcParties, getUnitById } from '$lib/states/units-state.svelte';

	let data = $derived.by(() => {
		const navigationData = getNavigationData();
		const npcParties = getNpcParties();

		return {
			navigationData,
			npcParties
		};
	});
</script>

<Button
	onclick={() => {
		goToScreen(ScreenId.Camp);
	}}>Return to Camp</Button
>

<div class="flex items-center justify-center">
	<Text type="big">Find out about other parties</Text>
</div>
<ScrollArea class="p-4">
	<div class="flex flex-col items-center gap-2">
		{#each data.npcParties as party}
			<div class="flex flex-col items-center justify-center gap-2">
				<Text underline type="medium">{party.name}</Text>
				<Text>Power: {party.power}</Text>
				<div class="flex flex-wrap gap-2">
					{#each party.companionsIds as companionId}
						<UnitCard unit={getUnitById(companionId)}></UnitCard>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</ScrollArea>
