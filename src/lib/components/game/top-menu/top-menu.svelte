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
		getPlayerUnit,
		getThreatLevel
	} from '$lib/states/game-state.svelte';
	import Icon from '../icon/icon.svelte';

	const data = $derived.by(() => {
		const playerUnit = getPlayerUnit();
		const ship = getPlayerShip();
		const threatLevel = getThreatLevel();
		return { ship, playerUnit, threatLevel };
	});
</script>

<div class="top-menu flex items-center justify-between">
	<div class="flex gap-4 p-4">
		{#if getPlayerCreated()}
			<div class="flex items-center justify-center">
				<Icon icon="heart"></Icon>
				<Text type="medium">{data.ship?.hp}/{data.ship?.maxHp}</Text>
			</div>
			<div class="flex items-center justify-center">
				<Icon icon="energy"></Icon>
				<Text type="medium">{data.ship?.energy}</Text>
			</div>
			<div class="flex items-center justify-center">
				<Icon icon="gold"></Icon>
				<Text type="medium">{data.playerUnit?.gold}</Text>
			</div>
			<div class="flex items-center justify-center">
				<Icon icon="experience"></Icon>
				<Text type="medium">{data.playerUnit?.experience}</Text>
			</div>
			<div class="flex items-center justify-center">
				<Icon icon="threat"></Icon>
				<Text type="medium">{data.threatLevel}%</Text>
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
	}
</style>
