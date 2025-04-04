<script lang="ts">
	import { getAreasData, getDiscoveredAreas } from '$lib/states/game-state.svelte';

	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import type { AreaData, AreaId } from '$lib/data/areas';

	interface IslandInstance {
		data: AreaData;
		enabled: boolean;
	}

	function getIsland(pos: number): IslandInstance | undefined {
		const areasData = getAreasData();
		const area = areasData.find((area) => area.pos == pos);
		const discoveredAreas = getDiscoveredAreas();
		if (!area) return undefined;
		return {
			data: area,
			enabled: area.id && discoveredAreas.includes(area?.id)
		};
	}

	const cells = Array.from({ length: 81 });
</script>

<div class="flex items-center justify-center rounded-md bg-blue-200">
	<div class="grid aspect-square w-full max-w-screen-md grid-cols-9 gap-1">
		{#each cells as _, i}
			<div class="flex items-center justify-center">
				{#if getIsland(i)}
					{#if !getIsland(i)?.enabled}
						<div class="cursor-default">
							<Text type="big">?</Text>
						</div>
					{:else}
						<div>
							<Tooltip.Provider>
								<Tooltip.Root>
									<Tooltip.Trigger>
										<GameImage id="map/island.png"></GameImage>
									</Tooltip.Trigger>
									<Tooltip.Content>
										<Text type="small">{getIsland(i)?.data.name}</Text>
									</Tooltip.Content>
								</Tooltip.Root>
							</Tooltip.Provider>
						</div>
					{/if}
				{:else}
					<!-- {i} -->
				{/if}
			</div>
		{/each}
	</div>
</div>
