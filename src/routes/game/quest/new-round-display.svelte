<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import { getQuestRoundIndex, getStage } from '$lib/states/game-state.svelte';

	const data = $derived.by(() => {
		const stage = getStage();
		const roundIndex = getQuestRoundIndex();
		return {
			roundIndex,
			stage
		};
	});
</script>

<div class="flex flex-col items-center justify-center">
	<Text type="big">Round {data.roundIndex + 1}</Text>
</div>
