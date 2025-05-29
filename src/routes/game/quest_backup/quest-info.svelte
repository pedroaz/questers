<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import {
		getRound,
		getInitiative,
		getQuestRoundIndex,
		getQuestById,
		getQuestToLoad,
		getStage
	} from '$lib/states/game-state.svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { buttonVariants } from '$lib/components/ui/button';
	import { QUEST_TYPE_TRANSLATION } from '$lib/data/quests';
	import { POWER_MULT_MAP } from '$lib/schemas/quest-attributes-map';
	import Icon from '$lib/components/game/icon/icon.svelte';

	const data = $derived.by(() => {
		const quest = getQuestById(getQuestToLoad());
		const roundIndex = getQuestRoundIndex();
		const round = getRound();
		const multMap = POWER_MULT_MAP[quest?.data.type!];
		const initiative = getInitiative();
		const stage = getStage();
		return {
			quest,
			roundIndex,
			round,
			multMap,
			initiative,
			stage
		};
	});
</script>

<div class="flex flex-col items-center justify-center">
	<Popover.Root>
		<Popover.Trigger class={buttonVariants({ variant: 'outline' })}>Quest Info</Popover.Trigger>
		<Popover.Content>
			<div class="flex items-center justify-center gap-2">
				<div class="flex-[0.1]">
					<div class="flex flex-col">
						<div class="flex items-center justify-center">
							<Icon icon="warrior"></Icon>
							<Text type="medium">x{data.multMap.strength}</Text>
						</div>
						<div class="flex items-center justify-center">
							<Icon icon="explorer"></Icon>
							<Text type="medium">x{data.multMap.leadership}</Text>
						</div>
						<div class="flex items-center justify-center">
							<Icon icon="hunter"></Icon>
							<Text type="medium">x{data.multMap.agility}</Text>
						</div>
						<div class="flex items-center justify-center">
							<Icon icon="crafter"></Icon>
							<Text type="medium">x{data.multMap.intellect}</Text>
						</div>
						<div class="flex items-center justify-center">
							<Icon icon="sage"></Icon>
							<Text type="medium">x{data.multMap.spirit}</Text>
						</div>
					</div>
				</div>
				<div class="flex-[0.9]">
					<div class="flex h-full flex-col items-center justify-center gap-2">
						<Text>{data.quest?.data.name}</Text>
						<Text>Type: {QUEST_TYPE_TRANSLATION[data.quest?.data.type!]}</Text>

						<Text>Win Condition: {data.round.winCondition}</Text>
						<Text>Round {data.roundIndex + 1}/{data.quest?.rounds.length}</Text>
					</div>
				</div>
			</div>
		</Popover.Content>
	</Popover.Root>
	<!-- <Text>Initiative: {data.initiative}</Text>
	<Text>Stage: {data.stage}</Text> -->
</div>
