<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Text from '$lib/components/ui/text/text.svelte';
	import { getStage } from '$lib/states/game-state.svelte';

	const data = $derived.by(() => {
		const stage = getStage();
		return {
			stage
		};
	});
</script>

<div class="flex flex-col items-center justify-evenly">
	<div>
		<Text>You lost!</Text>
	</div>
	<div>
		<Button variant="outline" onclick={() => {}}>Exit</Button>
	</div>
</div>
