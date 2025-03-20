<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Text from '$lib/components/ui/text/text.svelte';
	import { getPhaseIndex, getStage, setStage } from '$lib/states/game-state.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	const data = $derived.by(() => {
		const stage = getStage();
		const openDialog = stage === 'player-won-dialog';
		return {
			stage,
			openStageDialog: openDialog
		};
	});
</script>

<Dialog.Root bind:open={data.openStageDialog}>
	<Dialog.Content
		interactOutsideBehavior="ignore"
		escapeKeydownBehavior="ignore"
		class="h-[50%] w-[50%] [&>button]:hidden"
	>
		<div class="flex flex-col items-center justify-evenly">
			<div>
				<Text>You won!</Text>
			</div>
			<div>
				<Button onclick={() => {}}>Exit</Button>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
