<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { TOWNS_DICT, TownTab } from '$lib/data/towns';
	import { gameState } from '$lib/states/game-state.svelte';
	import CharacterTab from './character-tab.svelte';
	import { page } from '$app/state';

	const town = TOWNS_DICT[gameState.data.townId];
	let tab = $state('');
	const storedTab = localStorage.getItem('town-tab');
	if (storedTab && storedTab != '') {
		tab = storedTab;
	} else {
		tab = TownTab.Image;
	}
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<h1 class="text-5xl">{town.name}</h1>
	<p>{town.description}</p>
	<div class="flex gap-4">
		<Button
			onclick={() => {
				tab = TownTab.Character;
				localStorage.setItem('town-tab', 'character');
			}}>Character</Button
		>
		<Button
			onclick={() => {
				tab = TownTab.Quests;
				localStorage.setItem('town-tab', 'quests');
			}}>Quests</Button
		>
		<Button
			onclick={() => {
				tab = TownTab.Shop;
				localStorage.setItem('town-tab', 'shop');
			}}>Shop</Button
		>
		<Button disabled>Leaderboard</Button>
		<Button disabled>Dungeons</Button>
		<Button disabled>Raids</Button>
	</div>
	{#if tab == TownTab.Image}
		<img alt="Town" src={town.image} />
	{/if}
	{#if tab == TownTab.Character}
		<CharacterTab></CharacterTab>
	{/if}
	{#if tab == TownTab.Quests}
		<h1>Quests</h1>
	{/if}
	{#if tab == TownTab.Shop}
		<h1>Shop</h1>
	{/if}
</div>
