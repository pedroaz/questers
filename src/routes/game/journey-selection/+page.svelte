<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { log } from '$lib/domain/infra/logger';
	import { startJourney } from '$lib/domain/journey-selection/journey-starter';
	import { STARTING_GODS } from '$lib/domain/journey-selection/starting-gods';
	import { STARTING_CLASSES } from '$lib/domain/journey-selection/starting-classes';
	import { GOD_DICT } from '$lib/data/gods/gods-storage';
	import { setStartingParameters } from '$lib/states/game-state.svelte';
	import { CLASSES_DICT } from '$lib/data/classes/classes-storage';
	import GameImage from '$lib/components/game/image/game-image.svelte';

	// States
	let selectedGodId = $state(STARTING_GODS[0].id);
	let selectedClassId = $state(STARTING_CLASSES[0].id);

	// Carousels
	function handleStartJourney() {
		log('Starting Journey');
		setStartingParameters({
			godId: selectedGodId,
			classId: selectedClassId
		});
		startJourney();
	}
</script>

<div class="flex flex-col">
	<div class="flex flex-col items-center gap-24">
		<Text type="big">What is it going to be, Nioshi?</Text>
		<div class="flex flex-col gap-24">
			<div class="flex items-center justify-center gap-4">
				{#each Object.values(CLASSES_DICT) as classData}
					<div class={classData.id == selectedClassId ? 'selected' : ''}>
						<Button
							onclick={() => {
								selectedClassId = classData.id;
							}}
							variant="ghost"
						>
							<GameImage path={classData.iconImage}></GameImage>
						</Button>
					</div>
				{/each}
			</div>
			<div class=" flex items-center justify-center">
				{#each Object.values(GOD_DICT) as godData}
					<div class={godData.id == selectedGodId ? 'selected' : ''}>
						<Button
							onclick={() => {
								selectedGodId = godData.id;
							}}
							variant="ghost"
						>
							<GameImage path={godData.iconImage}></GameImage>
						</Button>
					</div>
				{/each}
			</div>
		</div>
		<div class="flex flex-col items-center justify-center gap-4">
			<Text type="medium"
				>{CLASSES_DICT[selectedClassId].description} assisted by {GOD_DICT[selectedGodId]
					.name}</Text
			>
			<Button
				size="lg"
				onclick={() => {
					handleStartJourney();
				}}>Embark</Button
			>
		</div>
	</div>
</div>

<style>
	.selected {
		border-bottom: 5px solid hsl(var(--color13));
	}
</style>
