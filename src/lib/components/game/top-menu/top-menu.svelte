<script lang="ts">
	import { goto } from '$app/navigation';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import { clearGameState } from '$lib/persistence/persistence-service.svelte';
	import { log } from '$lib/services/infra/logger';
	import {
		getPlayerCreated,
		getDayPhase,
		getPlayerShip,
		getWorldShips,
		getPlayerShipId,
		getPlayerUnit
	} from '$lib/states/game-state.svelte';

	// const playerUnit = $derived.by(() => {
	// 	return getPlayerUnit();
	// });

	const state = $derived.by(() => {
		const playerUnit = getPlayerUnit();
		const ship = getPlayerShip();
		return { ship, playerUnit };
	});

	// let skill = $derived.by(() => {
	// 	let action = getCrewActions().find((action) => action.unitId == id);
	// 	const type = action?.skillInstance?.type;
	// 	return type;
	// });
</script>

<div class="top-menu flex items-center justify-between">
	<div class="p-5">Tales of Dunklesee</div>
	<div class="flex gap-4">
		{#if true}
			<div class="box p-1">
				<Text>Phase: {getDayPhase()}</Text>
			</div>

			<div class="box flex gap-2 p-1">
				<Text>{state.playerUnit?.name}</Text>
				<Text>Gold: {state.playerUnit?.gold}</Text>
				<Text>Exp: {state.playerUnit?.experience}</Text>
			</div>
			<div class="box flex gap-2 p-1">
				<Text>SHIP</Text>
				<Text>HP: {state.ship?.hp}</Text>
				<Text>Energy: {state.ship?.energy}</Text>
			</div>
		{/if}
	</div>
	<div class="p-5">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>Settings</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.GroupHeading>Settings</DropdownMenu.GroupHeading>
					<DropdownMenu.Separator />
					<DropdownMenu.Item
						onclick={() => {
							clearGameState();
							// reload screen
							goto('/');
						}}>Clear Game State</DropdownMenu.Item
					>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</div>

<!-- <ul>
		<li><a href="/">Home</a></li>
		<li><a href="/inventory">Inventory</a></li>
		<li><a href="/map">Map</a></li>
		<li><a href="/settings">Settings</a></li>
	</ul> -->

<style>
	.top-menu {
		width: 100%;
		background: rgba(255, 206, 138, 0.8);
	}
</style>
