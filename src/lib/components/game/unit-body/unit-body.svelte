<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import type { Unit } from '$lib/schemas/unit';
	import GameImage from '../image/game-image.svelte';

	let { unit }: { unit: Unit } = $props();
</script>

<div class="relative flex h-full w-1/2 justify-center">
	<div class="flex w-1/2 items-center justify-center">
		<div class="flex h-full w-full justify-center">
			<div class="flex flex-col items-center justify-center"></div>
			<div class="flex flex-col items-center justify-center text-center">
				<div>
					<GameImage id={unit.image}></GameImage>
				</div>
			</div>
		</div>
	</div>
	<!-- Floating text for unit name and HP -->
	<div class="absolute -bottom-5 left-1/2 -translate-x-1/2">
		<Text type="small">[{unit.level}] {unit.name}</Text>
	</div>
</div>
