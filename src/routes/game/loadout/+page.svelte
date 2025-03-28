<script lang="ts">
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { getPlayerShip, getPlayerUnit } from '$lib/states/game-state.svelte';

	let data = $derived.by(() => {
		const player = getPlayerUnit();
		const ship = getPlayerShip();
		return { player, ship };
	});
</script>

<div class="flex h-screen items-center justify-center gap-4 p-4">
	<div class="flex-[0.4] bg-red-200"></div>
	<div class="h-52 w-52 flex-[0.2] bg-green-200">
		<!-- <GameImage id={data.player?.image}></GameImage> -->
	</div>
	<div class="flex-[0.4] bg-blue-200"></div>
</div>
