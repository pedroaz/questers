<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { AREAS_DICT, AreaTab } from '$lib/data/areas';
	import { log } from '$lib/services/infra/logger';
	import { GetGameState, GetPlayerArea } from '$lib/states/game-state.svelte';
	import CrewTab from './tabs/crew-tab.svelte';
	import DarkLedgerTab from './tabs/dark-ledger-tab.svelte';
	import NavigationMapTab from './tabs/navigation-map-tab.svelte';
	import QuestListTab from './tabs/quest-list-tab.svelte';
	import ShopTab from './tabs/shop-tab.svelte';
	// import { AreaTab, AREAS_DICT } from '$lib/data/areas';
	// import { gameState } from '$lib/states/game-state.svelte';
	// import CharacterTab from './character-tab.svelte';
	// import QuestTab from './quest-tab.svelte';

	const area = GetPlayerArea();
	log(`Loading Area ${area?.id}`);
	let tab = $state('');
	const storedTab = localStorage.getItem('town-tab');
	if (storedTab && storedTab != '') {
		tab = storedTab;
	} else {
		tab = AreaTab.Crew;
	}
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<h1 class="text-5xl">{area.data.name}</h1>
	<p>{area.data.description}</p>
	<div class="flex gap-4">
		<Button
			onclick={() => {
				tab = AreaTab.Crew;
				localStorage.setItem('town-tab', 'character');
			}}>Crew</Button
		>
		<Button
			onclick={() => {
				tab = AreaTab.Quests;
				localStorage.setItem('town-tab', 'quests');
			}}>Quest List</Button
		>
		<Button
			onclick={() => {
				tab = AreaTab.Shop;
				localStorage.setItem('town-tab', 'shop');
			}}>Shop</Button
		>
		<Button
			onclick={() => {
				tab = AreaTab.darkLedger;
				localStorage.setItem('town-tab', 'dark-ledger');
			}}>Dark Ledger</Button
		>
		<Button
			onclick={() => {
				tab = AreaTab.NavigationMap;
				localStorage.setItem('town-tab', 'navigation-map');
			}}>Map</Button
		>
	</div>
	{#if tab == AreaTab.Crew}
		<CrewTab></CrewTab>
	{/if}
	{#if tab == AreaTab.Quests}
		<QuestListTab></QuestListTab>
	{/if}
	{#if tab == AreaTab.Shop}
		<ShopTab></ShopTab>
	{/if}
	{#if tab == AreaTab.darkLedger}
		<DarkLedgerTab></DarkLedgerTab>
	{/if}
	{#if tab == AreaTab.NavigationMap}
		<NavigationMapTab></NavigationMapTab>
	{/if}
</div>
