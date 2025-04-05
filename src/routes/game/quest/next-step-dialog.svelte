<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Text from '$lib/components/ui/text/text.svelte';
	import { getQuestRoundIndex, getStage, setStage } from '$lib/states/game-state.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { onMount } from 'svelte';
	import { delay } from '$lib/utils';
	import { firstTurn } from '$lib/services/combat/combat-utils';

	const data = $derived.by(() => {
		const stage = getStage();
		const roundIndex = getQuestRoundIndex();
		return {
			roundIndex,
			stage
		};
	});

	onMount(async () => {
		delay(500).then(() => {
			close();
		});
	});

	function close() {
		firstTurn();
	}
</script>

<Dialog.Root open={data.stage === 'new-stage-dialog'}>
	<Dialog.Content
		interactOutsideBehavior="ignore"
		escapeKeydownBehavior="ignore"
		class="h-[50%] w-[50%] [&>button]:hidden"
	>
		<div class="flex flex-col items-center justify-evenly">
			<div>
				<Text>Round {data.roundIndex + 1}</Text>
			</div>
			<div>
				<Button
					variant="outline"
					onclick={() => {
						close();
					}}>Start Round</Button
				>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
