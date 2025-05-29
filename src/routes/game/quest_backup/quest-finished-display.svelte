<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Text from '$lib/components/ui/text/text.svelte';
	import { getStage } from '$lib/states/game-state.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { goToScreen } from '$lib/domain/screen-changer-service';

	const data = $derived.by(() => {
		const stage = getStage();
		return {
			stage
		};
	});
</script>

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
