<script lang="ts">
	import { goto } from '$app/navigation';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import { clearGameState } from '$lib/persistence/persistence-service.svelte';
	import {
		getPlayerCreated,
		getDayPhase,
		getPlayerShip,
		getPlayerUnit
	} from '$lib/states/game-state.svelte';

	const state = $derived.by(() => {
		const playerUnit = getPlayerUnit();
		const ship = getPlayerShip();
		return { ship, playerUnit };
	});
</script>

<div class="top-menu flex items-center justify-between">
	<div class="flex gap-4 p-4">
		{#if getPlayerCreated()}
			<div class="flex flex-col justify-center">
				<Text type="big">{state.playerUnit?.name}</Text>
			</div>

			<div class="box flex items-center justify-center p-1">
				<Text>Phase: {getDayPhase()}</Text>
			</div>

			<div class="box flex items-center justify-center gap-4 p-1">
				<Text>Gold: {state.playerUnit?.gold}</Text>
				<Text>Exp: {state.playerUnit?.experience}</Text>
			</div>
			<div class="box flex items-center justify-center gap-4 p-1">
				<Text>HP: {state.ship?.hp}</Text>
				<Text>Energy: {state.ship?.energy}</Text>
			</div>
		{/if}
	</div>

	<div class="items-center justify-center gap-2 p-5">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Text bold>Settings</Text>
			</DropdownMenu.Trigger>
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

<style>
	.top-menu {
		width: 100%;
		background: hsl(var(--muted-foreground));
	}
</style>
