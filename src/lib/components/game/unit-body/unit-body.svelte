<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import type { Unit } from '$lib/schemas/unit';
	import GameImage from '../image/game-image.svelte';

	let { unit }: { unit: Unit } = $props();
</script>

<div class="flex h-full w-1/2 justify-center">
	<div class="flex w-1/2 items-center justify-center">
		<div class="flex h-full w-full justify-center">
			<div class="flex flex-col items-center justify-center"></div>
			<div class="flex flex-col items-center justify-center text-center">
				<div>
					<GameImage id={unit.image}></GameImage>
				</div>
			</div>
			<div class="flex flex-col items-center justify-center"></div>
		</div>
	</div>
</div>
