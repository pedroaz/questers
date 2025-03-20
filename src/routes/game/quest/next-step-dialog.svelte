<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Text from '$lib/components/ui/text/text.svelte';
	import { getPhaseIndex, getStage, setStage } from '$lib/states/game-state.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { firstTurn } from '$lib/services/combat/first-turn';
	import { onMount } from 'svelte';
	import { delay } from '$lib/utils';

	const data = $derived.by(() => {
		const stage = getStage();
		const phaseIndex = getPhaseIndex();
		const openDialog = stage === 'new-stage-dialog';
		return {
			phaseIndex,
			stage,
			openStageDialog: openDialog
		};
	});

	onMount(async () => {
		delay(1000).then(() => {
			close();
		});
	});

	function close() {
		firstTurn();
		setStage('waiting-for-input');
	}
</script>

<Dialog.Root bind:open={data.openStageDialog}>
	<Dialog.Content
		interactOutsideBehavior="ignore"
		escapeKeydownBehavior="ignore"
		class="h-[50%] w-[50%] [&>button]:hidden"
	>
		<div class="flex flex-col items-center justify-evenly">
			<div>
				<Text>Phase {data.phaseIndex}</Text>
			</div>
			<div>
				<Button
					onclick={() => {
						close();
					}}>Start Phase</Button
				>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
