<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import { clearGameState } from '$lib/persistence/persistence-service.svelte';
	import {
		getPlayerCreated,
		getDayPhase,
		getPlayerShip,
		getPlayerUnit
	} from '$lib/states/game-state.svelte';
	import Icon from '../icon/icon.svelte';

	const state = $derived.by(() => {
		const playerUnit = getPlayerUnit();
		const ship = getPlayerShip();
		return { ship, playerUnit };
	});
</script>

<div class="top-menu flex items-center justify-between">
	<div class="flex gap-4 p-4">
		{#if getPlayerCreated()}
			<div class="flex items-center justify-center gap-4">
				<Icon icon="heart"></Icon>
				<Text type="medium">{state.ship?.hp}/{state.ship?.maxHp}</Text>
			</div>
			<div class="flex items-center justify-center gap-4">
				<Icon icon="experience"></Icon>
				<Text type="medium">{state.playerUnit?.experience}</Text>
			</div>
			<div class="flex items-center justify-center gap-4">
				<Icon icon="gold"></Icon>
				<Text type="medium">{state.playerUnit?.gold}</Text>
			</div>
		{/if}
	</div>

	<div class="items-center justify-center gap-2 p-5">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<!-- <Text bold>Settings</Text> -->
				<Button size="icon" variant="outline">
					<Icon icon="menu"></Icon>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<!-- <DropdownMenu.Separator /> -->
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
		/* background: hsl(var(--muted-foreground)); */
	}
</style>
