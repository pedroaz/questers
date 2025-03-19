<script lang="ts">
	import { getArchipelago } from '$lib/states/game-state.svelte';
	import CrewTab from './tabs/crew-tab.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import CaptainsTab from './tabs/captains-tab.svelte';
	import ShipsDeckTab from './tabs/ships-deck-tab.svelte';
	import WorkShopTab from './tabs/workshop-tab.svelte';

	const archipelago = $state(getArchipelago());
	const tab = $state('captain');
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<Text type="big">{archipelago.name}</Text>
	<Text>{archipelago.description}</Text>
	<Tabs.Root value={tab}>
		<Tabs.List>
			<Tabs.Trigger value="captain">Captain's Quarters</Tabs.Trigger>
			<Tabs.Trigger value="deck">Ship's Deck</Tabs.Trigger>
			<Tabs.Trigger value="crew">Crew</Tabs.Trigger>
			<Tabs.Trigger value="workshop">Armory</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="captain">
			<CaptainsTab></CaptainsTab>
		</Tabs.Content>
		<Tabs.Content value="deck">
			<ShipsDeckTab></ShipsDeckTab>
		</Tabs.Content>
		<Tabs.Content value="crew">
			<CrewTab></CrewTab>
		</Tabs.Content>
		<Tabs.Content value="workshop">
			<WorkShopTab></WorkShopTab>
		</Tabs.Content>
	</Tabs.Root>
</div>
