<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { AreaTab, AREAS_DICT } from '$lib/data/areas';
	import { gameState } from '$lib/states/game-state.svelte';
	import CharacterTab from './character-tab.svelte';
	import QuestTab from './quest-tab.svelte';

	const area = AREAS_DICT[gameState.data.areaId];
	let tab = $state('');
	const storedTab = localStorage.getItem('town-tab');
	if (storedTab && storedTab != '') {
		tab = storedTab;
	} else {
		tab = AreaTab.Image;
	}
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<h1 class="text-5xl">{area.name}</h1>
	<p>{area.description}</p>
	<div class="flex gap-4">
		<Button
			onclick={() => {
				tab = AreaTab.Character;
				localStorage.setItem('town-tab', 'character');
			}}>Character</Button
		>
		<Button
			onclick={() => {
				tab = AreaTab.Quests;
				localStorage.setItem('town-tab', 'quests');
			}}>Quests</Button
		>
		<Button
			onclick={() => {
				tab = AreaTab.Shop;
				localStorage.setItem('town-tab', 'shop');
			}}>Shop</Button
		>
		<Button disabled>Leaderboard</Button>
		<Button disabled>Dungeons</Button>
		<Button disabled>Raids</Button>
	</div>
	{#if tab == AreaTab.Image}
		<img alt="Town" src={area.image} />
	{/if}
	{#if tab == AreaTab.Character}
		<CharacterTab></CharacterTab>
	{/if}
	{#if tab == AreaTab.Quests}
		<QuestTab></QuestTab>
	{/if}
	{#if tab == AreaTab.Shop}
		<h1>Shop</h1>
	{/if}
</div>
