<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Text from '$lib/components/ui/text/text.svelte';
	import { goToScreen } from '$lib/domain/screen-changing/screen-changer-service';
	import { ScreenId } from '$lib/domain/screen-changing/screens';
	import { getSelectedQuest } from '$lib/states/player-state.svelte';
	import { getUnitById } from '$lib/states/units-state.svelte';

	let data = $derived.by(() => {
		const quest = getSelectedQuest();
		return {
			quest
		};
	});
</script>

<div class="central-screen">
	<div class="flex flex-col items-center justify-center gap-4">
		<!-- <Button onclick={() => goToScreen(ScreenId.Rewards)}>Win Quest</Button> -->
	</div>
</div>
