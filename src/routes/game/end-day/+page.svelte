<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { goToScreen } from '$lib/domain/screen-changer-service';
	import ChestRoll from './chest-roll.svelte';
	import ExperienceRoll from './experience-roll.svelte';
	import GoldRoll from './gold-roll.svelte';

	type RewardType = 'chest' | 'gold' | 'experience' | 'loadout';

	let currentRoll = $state('chest' as RewardType);
	let buttonText = $derived.by(() => {
		if (currentRoll == 'loadout') {
			return 'Done';
		} else {
			return 'Next';
		}
	});

	function handleClick() {
		if (currentRoll == 'chest') {
			currentRoll = 'gold';
		} else if (currentRoll == 'gold') {
			currentRoll = 'experience';
		} else if (currentRoll == 'experience') {
			goToScreen('loadout');
		}
	}
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	{#if currentRoll != 'loadout'}
		<Text type="big">Collect your Rewards!</Text>
		<Button variant="outline" onclick={handleClick}>{buttonText}</Button>
	{/if}

	{#if currentRoll == 'chest'}
		<ChestRoll></ChestRoll>
	{:else if currentRoll == 'gold'}
		<GoldRoll></GoldRoll>
	{:else if currentRoll == 'experience'}
		<ExperienceRoll></ExperienceRoll>
	{/if}
</div>
