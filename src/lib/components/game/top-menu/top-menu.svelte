<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import { REGIONS_DICT } from '$lib/data/navigation/navigation-storage';
	import { clearGameState } from '$lib/persistence/persistence-service.svelte';
	import {
		getNavigationData,
		getPlayerParty,
		getPlayerUnit
	} from '$lib/states/player-state.svelte';
	import { getShowTopBar, getTopMenuText } from '$lib/states/ui-state.svelte';

	import Icon from '../icon/icon.svelte';

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
		<div class="absolute left-0 ml-4 flex gap-4">
			<div class="flex items-center justify-center">
				<Icon icon="heart" />
				<Text type="medium">{data.party.hp}/{data.party.maxHp}</Text>
			</div>
			<div class="flex items-center justify-center">
				<Icon icon="energy" />
				<Text type="medium">{data.party.energy}/{data.party.maxEnergy}</Text>
			</div>
			<div class="flex items-center justify-center">
				<Icon icon="gold" />
				<Text type="medium">{data.party.gold}</Text>
			</div>
			<div class="flex items-center justify-center">
				<Icon icon="experience" />
				<Text type="medium">{data.party.experience}</Text>
			</div>
		</div>
		<div class="mx-auto">
			<Text type="big">{data.topMenuText}</Text>
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

<style>
	.top-menu {
		width: 100%;
		background-color: hsl(var(--color1));
	}
</style>
