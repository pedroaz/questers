<script lang="ts">
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { goToScreen } from '$lib/domain/screen-changing/screen-changer-service';
	import { ScreenId } from '$lib/domain/screen-changing/screens';
	import { setJourneyInProgress } from '$lib/states/player-state.svelte';

	setJourneyInProgress(false);
</script>

<div class="flex h-full flex-col items-center gap-10">
	<GameImage width="30vh" height="30vh" path="story/storyteller.png"></GameImage>
	<Text type="big">I guess this was not your story after all</Text>
	<Button
		onclick={() => {
			goToScreen(ScreenId.MainMenu);
		}}>Main Menu</Button
	>
</div>
