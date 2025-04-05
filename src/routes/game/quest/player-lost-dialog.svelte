<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Text from '$lib/components/ui/text/text.svelte';
	import { getStage } from '$lib/states/game-state.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	const data = $derived.by(() => {
		const stage = getStage();
		return {
			stage
		};
	});
</script>

<Dialog.Root open={data.stage === 'player-lost-dialog'}>
	<Dialog.Content
		interactOutsideBehavior="ignore"
		escapeKeydownBehavior="ignore"
		class="h-[50%] w-[50%] [&>button]:hidden"
	>
		<div class="flex flex-col items-center justify-evenly">
			<div>
				<Text>You lost!</Text>
			</div>
			<div>
				<Button variant="outline" onclick={() => {}}>Exit</Button>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
