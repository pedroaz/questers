<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Text from '$lib/components/ui/text/text.svelte';
	import { goToScreen } from '$lib/domain/screen-changing/screen-changer-service';
	import { ScreenId } from '$lib/domain/screen-changing/screens';
</script>

<div class="flex flex-col items-center gap-4 py-20">
	<Text type="big">Camp</Text>
	<div class="flex flex-col items-center justify-center gap-2">
		<Button
			onclick={() => {
				goToScreen(ScreenId.EndDay);
			}}>End Day</Button
		>
		<Button
			onclick={() => {
				goToScreen(ScreenId.Gazette);
			}}>Quester's Gazette</Button
		>
	</div>
</div>
