<script lang="ts">
	import Icon from '../icon/icon.svelte';

	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import { clearGameState } from '$lib/persistence/persistence-service.svelte';
	import {
		getNavigationData,
		getPlayerParty,
		getPlayerUnit
	} from '$lib/states/player-state.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { getShowTopBar, getTopMenuText } from '$lib/states/ui-state.svelte';
	import ConfigPanel from '../config-panel/config-panel.svelte';

	let isConfigOpen = $state(false);

	const data = $derived.by(() => {
		const player = getPlayerUnit();
		const party = getPlayerParty();
		const navigationData = getNavigationData();
		const topMenuText = getTopMenuText();
		return { player, party, navigationData, topMenuText };
	});
</script>

{#if getShowTopBar()}
	<div class="top-menu relative m-4 flex items-center justify-between rounded-xl">
		<div class="ml-4 flex items-center justify-center gap-4">
			<div class="flex items-center justify-center">
				<Text type="medium">Level: {data.party.level}</Text>
			</div>
			<div class="flex items-center justify-center">
				<Icon icon="heart" />
				<Text type="medium">{data.party.hp}/{data.party.maxHp}</Text>
			</div>
			<div class="flex items-center justify-center">
				<Icon icon="energy" />
				<Text type="medium">{data.party.energy}/{data.party.maxEnergy}</Text>
			</div>
			<div class="flex items-center justify-center">
				<Icon icon="threat" />
				<Text type="medium">{data.party.threat}%</Text>
			</div>
		</div>
		<div class="mx-auto">
			<Text type="big">{data.topMenuText}</Text>
		</div>

		<div class="mr-10 flex items-center justify-center">
			<div class="flex items-center justify-center">
				<Icon icon="gold" />
				<Text type="medium">{data.party.gold}</Text>
			</div>

			<div class="flex items-center justify-center">
				<Icon icon="experience" />
				<Text type="medium">{data.party.experience}</Text>
			</div>
		</div>

		<div class="items-center justify-center gap-2 p-5">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Button size="icon">
						<Icon icon="settings"></Icon>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Item
							onclick={() => {
								isConfigOpen = true;
							}}>Settings</DropdownMenu.Item
						>
						<DropdownMenu.Item
							onclick={() => {
								clearGameState();
								goto('/');
							}}>Clear Game State</DropdownMenu.Item
						>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
{/if}

<Dialog.Root
	open={isConfigOpen}
	onOpenChange={(open) => {
		isConfigOpen = open;
	}}
>
	<Dialog.Content class="h-[80%]">
		<ConfigPanel></ConfigPanel>
	</Dialog.Content>
</Dialog.Root>

<style>
	.top-menu {
		width: 100%;
		background-color: hsl(var(--color1));
	}
</style>
