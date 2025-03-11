<script>
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import { clearGameState } from '$lib/persistence/persistence-service.svelte';
	import {
		getPlayerUnit,
		getPlayerShipEnergy,
		getPlayerCreated
	} from '$lib/states/game-state.svelte';
</script>

<div class="top-menu flex items-center justify-between">
	<div class="p-5">Tales of Dunklesee</div>
	<div class="flex gap-4">
		{#if getPlayerCreated()}
			<Text>{getPlayerUnit().name}</Text>
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
							window.location.reload();
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
