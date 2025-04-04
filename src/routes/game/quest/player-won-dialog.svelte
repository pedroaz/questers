<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Text from '$lib/components/ui/text/text.svelte';
	import { getPhaseIndex, getStage, setStage } from '$lib/states/game-state.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { goToScreen } from '$lib/services/screen-changer-service';

	const data = $derived.by(() => {
		const stage = getStage();
		return {
			stage
		};
	});
</script>

<Dialog.Root open={data.stage === 'player-won-dialog'}>
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
				<Button
					variant="outline"
					onclick={() => {
						goToScreen('rewards');
					}}>Rewards</Button
				>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
