<script lang="ts">
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { STORY_DIC } from '$lib/data/story/story-storage';
	import { goToScreen } from '$lib/domain/screen-changing/screen-changer-service';
	import { getStoryToLoad } from '$lib/states/game-state.svelte';

	const story = STORY_DIC[getStoryToLoad()];
	let lineIndex = $state(0);
	let lineToShow = $derived.by(() => {
		return story.lines[lineIndex];
	});
	let finished = $state(false);
	function nextLine() {
		if (lineIndex < story.lines.length - 1) {
			lineIndex++;
		}

		if (lineIndex === story.lines.length - 1) {
			finished = true;
		}
	}
	function finishStory() {
		goToScreen(story.screenToLoad);
	}
</script>

<div class="flex h-full flex-col items-center gap-10">
	<GameImage width="30vh" height="30vh" path="story/storyteller.png"></GameImage>
	<Text type="medium">{lineToShow}</Text>

	{#if !finished}
		<Button onclick={nextLine}>Next Line</Button>
	{/if}
	{#if finished}
		<Button onclick={finishStory}>Continue Story</Button>
	{/if}
</div>
