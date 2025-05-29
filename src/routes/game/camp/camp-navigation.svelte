<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import { AREAS_DICT, REGIONS_DICT } from '$lib/data/navigation/navigation-storage';
	import { getNavigationData, setNavigationData } from '$lib/states/player-state.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import { persistGameState } from '$lib/persistence/persistence-service.svelte';
	import Icon from '$lib/components/game/icon/icon.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { type QuestInstance } from '$lib/domain/navigation/quests-models';
	import { getRandomElement } from '$lib/utils';
	import { log } from '$lib/domain/infra/logger';
	import { goToScreen } from '$lib/domain/screen-changing/screen-changer-service';
	import { ScreenId } from '$lib/domain/screen-changing/screens';

	let openQuestDialog = $state(false);
	let selectedQuest = $state<QuestInstance>();

	let data = $derived.by(() => {
		const navigationData = getNavigationData();
		const regionName = REGIONS_DICT[navigationData.currentRegion].name;
		const openRegionImage = navigationData.firstTimeInRegion;
		return {
			navigationData,
			regionName,
			openRegionImage
		};
	});

	function startQuestByName(questName: string) {
		const navigationData = data.navigationData;
		const quests = data.navigationData.quests.filter((q) => q.data.name == questName);
		const quest = getRandomElement(quests);
		if (quest) {
			log(`Starting quest ${quest.data.name}`);
			navigationData.selectedQuestId = quest.id;
			setNavigationData(navigationData);
			goToScreen(ScreenId.Quest);
		}
	}
</script>

<div class="mt-10 flex flex-col items-center gap-4">
	<div class="flex items-center justify-center">
		<!-- <Icon
			classes="cursor-pointer"
			onclick={() => {
				data.navigationData.firstTimeInRegion = true;
				setNavigationData(data.navigationData);
			}}
			icon="image"
		></Icon> -->
	</div>

	<div class="flex flex-col items-center gap-4">
		<Text type="big">Quests</Text>
		<div class="flex gap-2">
			<div class="quest-box">
				<Text type="big">Available</Text>
				<div class="flex flex-wrap justify-center gap-2">
					{#each Array.from(data.navigationData.quests
							.filter((q) => !q.finished)
							.reduce((map, quest) => {
								const name = quest.data.name;
								if (!map.has(name)) {
									map.set(name, { ...quest, count: 1 });
								} else {
									map.get(name).count++;
								}
								return map;
							}, new Map())
							.values()) as quest}
						<Button
							onclick={() => {
								selectedQuest = quest;
								openQuestDialog = true;
							}}
						>
							{quest.data.name} (x{quest.count})
						</Button>
					{/each}
				</div>
			</div>
			<div class="quest-box">
				<Text type="big">Finished</Text>
				<div class="flex flex-wrap justify-center gap-2">
					{#each data.navigationData.quests.filter((q) => q.finished) as quest}
						<Button>
							{quest.data.name}
						</Button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<Dialog.Root
	open={data.openRegionImage}
	onOpenChange={(open) => {
		data.openRegionImage = open;
		data.navigationData.firstTimeInRegion = false;
		setNavigationData(data.navigationData);
		persistGameState();
	}}
>
	<Dialog.Content class="w-[40%] max-w-none">
		<Dialog.Title>
			<Text type="medium">Welcome to {data.regionName}</Text>
		</Dialog.Title>
		<Dialog.Description>
			<GameImage width="100%" path={REGIONS_DICT[data.navigationData.currentRegion].image}
			></GameImage>
		</Dialog.Description>
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root
	open={openQuestDialog}
	onOpenChange={(open) => {
		openQuestDialog = open;
	}}
>
	<Dialog.Content class="w-[40%] max-w-none">
		<Dialog.Title>
			<Text type="medium">{selectedQuest?.data.name}</Text>
		</Dialog.Title>
		<Dialog.Description>
			<div class="flex flex-col gap-4">
				<Text type="medium">[{selectedQuest!.data.type}]</Text>
				<Text type="medium">{selectedQuest!.data.description}</Text>
			</div>
			<div class="flex justify-center">
				<Button onclick={() => startQuestByName(selectedQuest?.data.name!)}>Start Quest</Button>
			</div>
		</Dialog.Description>
	</Dialog.Content>
</Dialog.Root>

<style>
	.quest-box {
		padding: 4px;
		@apply flex flex-col items-center gap-4 rounded-xl;
		border: 4px solid hsl(var(--color4));
	}
</style>
