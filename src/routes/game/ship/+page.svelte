<script lang="ts">
	import {
		getArchipelago,
		getAreasData,
		getPlayerShip,
		getPlayerUnit,
		getQuests,
		getUnitById,
		setPhaseIndex,
		setQuestToLoad,
		setStage
	} from '$lib/states/game-state.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { goToScreen } from '$lib/services/screen-changer-service';
	import UnitBody from '$lib/components/game/unit-body/unit-body.svelte';
	import type { Unit } from '$lib/schemas/unit';
	import { onMount } from 'svelte';
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Icon from '$lib/components/game/icon/icon.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import type { AreaId } from '$lib/data/areas';

	// const archipelago = $state(getArchipelago());
	// const tab = $state('deck');

	let isMapOpen = $state(true);

	let data = $derived.by(() => {
		const player = getPlayerUnit();
		const ship = getPlayerShip();
		const quests = getQuests();
		const archipelago = getArchipelago();
		return {
			player,
			ship,
			quests,
			archipelago
		};
	});

	let selectedUnitId: string = $state('');
	let selectedUnit: Unit = $derived.by(() => {
		return getUnitById(selectedUnitId);
	});

	onMount(() => {
		selectedUnitId = data.player?.uuid ?? '';
	});

	function getIsland(pos: number): string | undefined {
		const areasData = getAreasData();
		return areasData.find((area) => area.pos == pos)?.name;
	}

	const cells = Array.from({ length: 81 });
</script>

<div class="flex h-full">
	<div class="flex flex-[0.3] flex-col items-center justify-center">
		{#if getUnitById(selectedUnitId)}
			<div class="flex items-center justify-center">
				<UnitBody unit={selectedUnit}></UnitBody>
			</div>
		{/if}
	</div>
	<div class="flex flex-[0.6] flex-col items-center">
		<div>
			<Text type="big">Quests</Text>
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Icon icon="question"></Icon>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<Text type="small"
							>Embark on adventures with your crew. Discover more islands to unlock more quests</Text
						>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</div>
		<div class="box m-5 h-full p-5">
			<div class="flex flex-wrap gap-6">
				{#each data.quests as quest}
					<Button
						size="sm"
						disabled={!quest.enabled}
						onclick={() => {
							setStage('new-stage-dialog');
							setPhaseIndex(0);
							setQuestToLoad(quest.id);
							goToScreen('quest');
						}}>{quest.data.name}</Button
					>
				{/each}
			</div>
		</div>
	</div>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="flex flex-[0.1] flex-col items-center justify-center">
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="cursor-pointer" onclick={() => (isMapOpen = true)}>
			<GameImage id="map/map-icon.png"></GameImage>
		</div>
	</div>
</div>

<Dialog.Root open={isMapOpen} onOpenChange={(open) => (isMapOpen = open)}>
	<Dialog.Content class="w-[40%] max-w-none">
		<Dialog.Title>
			<div class="flex items-center gap-4">
				<Text underline>{data.archipelago.name}</Text>
				<Button size="sm">Explore Archipelago!</Button>
			</div>
		</Dialog.Title>
		<Dialog.Description>
			<div class="flex items-center justify-center rounded-md bg-blue-200">
				<div class="grid aspect-square w-full max-w-screen-md grid-cols-9 gap-1">
					{#each cells as _, i}
						<div class="flex items-center justify-center">
							{#if getIsland(i)}
								<div>
									<Tooltip.Provider>
										<Tooltip.Root>
											<Tooltip.Trigger>
												<GameImage id="map/island.png"></GameImage>
											</Tooltip.Trigger>
											<Tooltip.Content>
												<Text type="small">{getIsland(i)}</Text>
											</Tooltip.Content>
										</Tooltip.Root>
									</Tooltip.Provider>
								</div>
							{:else}
								<!-- {i} -->
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</Dialog.Description>
	</Dialog.Content>
</Dialog.Root>
