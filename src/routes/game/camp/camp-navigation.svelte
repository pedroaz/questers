<script lang="ts">
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import { AREAS_DICT, REGIONS_DICT } from '$lib/data/navigation/navigation-storage';
	import { log } from '$lib/domain/infra/logger';
	import { type QuestInstance } from '$lib/domain/navigation/quests-models';
	import { goToScreen } from '$lib/domain/screen-changing/screen-changer-service';
	import { ScreenId } from '$lib/domain/screen-changing/screens';
	import { persistGameState } from '$lib/persistence/persistence-service.svelte';
	import {
		getCurrentQuest,
		getNavigationData,
		getPlayerParty,
		setNavigationData
	} from '$lib/states/player-state.svelte';
	import { getRandomElement } from '$lib/utils';

	let openQuestDialog = $state(false);
	let selectedQuest = $state<QuestInstance>();

	let statusFilter = $state('all');
	let areaIdFilter = $state('all');
	let typeFilter = $state('all');

	let data = $derived.by(() => {
		const navigationData = getNavigationData();
		const regionName = REGIONS_DICT[navigationData.currentRegion].name;
		const uniqueQuestAreasIds = [...new Set(navigationData.quests.map((q) => q.areaId))];
		const uniqueQuestAreaIds = uniqueQuestAreasIds.map((id) => AREAS_DICT[id].id);
		const openRegionImage = navigationData.firstTimeInRegion;
		const uniqueQuestTypes = [...new Set(navigationData.quests.map((q) => q.data.type))];

		const filteredQuests: QuestInstance[] = [];
		const questCountMap: Record<string, number> = {};

		navigationData.quests.forEach((questInstance) => {
			// Filter by status
			if (statusFilter === 'available' && questInstance.finished) {
				return;
			}
			if (statusFilter === 'finished' && !questInstance.finished) {
				return;
			}

			// Filter by area
			if (areaIdFilter !== 'all' && areaIdFilter != questInstance.areaId) {
				return;
			}

			// Filter by type
			if (typeFilter !== 'all' && typeFilter != questInstance.data.type) {
				return;
			}

			filteredQuests.push(questInstance);
			questCountMap[questInstance.data.name] = (questCountMap[questInstance.data.name] || 0) + 1;
		});

		const uniqueQuestNames = [...new Set(filteredQuests.map((q) => q.data.name))];

		return {
			navigationData,
			regionName,
			openRegionImage,
			uniqueQuestAreaIds,
			uniqueQuestTypes,
			filteredQuests,
			questCountMap,
			uniqueQuestNames
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
			const party = getPlayerParty();
			party.energy -= quest.data.energyCost;
			goToScreen(ScreenId.Quest);
		}
	}
</script>

<div class="flex flex-col items-center gap-4">
	<div class="flex flex-col items-center gap-2">
		<Text type="big">Quests</Text>
		<Text type="medium">Filters</Text>
		<div class="quest-box flex flex-col items-center justify-center gap-2">
			<div class="flex items-center justify-center gap-2">
				<Button
					onclick={() => {
						statusFilter = 'all';
					}}
					size="sm"
					variant={statusFilter === 'all' ? 'selected' : undefined}
				>
					All Statuses</Button
				>
				<Button
					onclick={() => {
						statusFilter = 'available';
					}}
					size="sm"
					variant={statusFilter === 'available' ? 'selected' : undefined}
				>
					Available</Button
				>
				<Button
					onclick={() => {
						statusFilter = 'finished';
					}}
					size="sm"
					variant={statusFilter === 'finished' ? 'selected' : undefined}
				>
					Finished</Button
				>
			</div>
			<div class="flex items-center justify-center gap-2">
				<Button
					onclick={() => (areaIdFilter = 'all')}
					size="sm"
					variant={areaIdFilter === 'all' ? 'selected' : undefined}
				>
					All Areas</Button
				>
				{#each data.uniqueQuestAreaIds as uniqueAreaId}
					<Button
						onclick={() => {
							areaIdFilter = uniqueAreaId;
						}}
						size="sm"
						variant={areaIdFilter === uniqueAreaId ? 'selected' : undefined}
						>{AREAS_DICT[uniqueAreaId].name}
					</Button>
				{/each}
			</div>
			<div class="flex items-center justify-center gap-2">
				<Button
					onclick={() => {
						typeFilter = 'all';
					}}
					size="sm"
					variant={typeFilter === 'all' ? 'selected' : undefined}>All Types</Button
				>
				{#each data.uniqueQuestTypes as uniqueType}
					<Button
						onclick={() => {
							typeFilter = uniqueType;
						}}
						size="sm"
						variant={typeFilter === uniqueType ? 'selected' : undefined}>{uniqueType}</Button
					>
				{/each}
			</div>
		</div>
		<Text type="medium">Instances</Text>
		<div class="flex flex-wrap justify-center gap-2">
			{#each data.uniqueQuestNames as questName}
				<Button
					onclick={() => {
						const quests = data.filteredQuests.filter((q) => q.data.name == questName);
						const questInstance = getRandomElement(quests);
						selectedQuest = questInstance;
						openQuestDialog = true;
					}}
				>
					<div class="flex gap-8">
						<Text type="medium">{questName}</Text>
						<Text type="medium">x{data.questCountMap[questName]}</Text>
					</div>
				</Button>
			{/each}
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
			<Text underline type="medium">{selectedQuest?.data.name}</Text>
		</Dialog.Title>
		<Dialog.Description>
			<div class="flex flex-col gap-4">
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
		border: 4px solid hsl(var(--color4));
	}
</style>
