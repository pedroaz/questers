<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { type AreaTab } from '$lib/data/areas';
	import { log } from '$lib/services/infra/logger';
	import { getArchipelago } from '$lib/states/game-state.svelte';
	import CrewTab from './tabs/crew-tab.svelte';
	import DarkLedgerTab from './tabs/dark-ledger-tab.svelte';
	import QuestListTab from './tabs/quest-list-tab.svelte';

	const archipelago = getArchipelago();
	log(`Loading Area ${archipelago?.id}`);
	let tab = $state('' as AreaTab);
	const storedTab = localStorage.getItem('town-tab');
	if (storedTab && storedTab != '') {
		tab = storedTab as AreaTab;
	} else {
		tab = 'crew';
	}
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<h1 class="text-5xl">{archipelago.name}</h1>
	<p>{archipelago.description}</p>
	<div class="flex gap-4">
		<Button
			onclick={() => {
				tab = 'crew';
				localStorage.setItem('town-tab', 'character');
			}}>Crew</Button
		>
		<Button
			onclick={() => {
				tab = 'quests';
				localStorage.setItem('town-tab', 'quests');
			}}>Quest List</Button
		>
		<Button
			onclick={() => {
				tab = 'shop';
				localStorage.setItem('town-tab', 'shop');
			}}>Shop</Button
		>
		<Button
			onclick={() => {
				tab = 'dark-ledger';
				localStorage.setItem('town-tab', 'dark-ledger');
			}}>Dark Ledger</Button
		>
	</div>
	{#if tab == 'crew'}
		<CrewTab></CrewTab>
	{/if}
	{#if tab == 'quests'}
		<QuestListTab></QuestListTab>
	{/if}
	{#if tab == 'dark-ledger'}
		<DarkLedgerTab></DarkLedgerTab>
	{/if}
</div>
