<script lang="ts">
	import Icon from '../icon/icon.svelte';
	import GameImage from '../image/game-image.svelte';

	import * as HoverCard from '$lib/components/ui/hover-card/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import type { Unit } from '$lib/domain/unit/unit';

	let { unit }: { unit: Unit } = $props();
</script>

<div class="gbox h-full">
	<div class="flex items-center justify-center">
		<Text type="medium">{unit.name} - Lvl {unit.level}</Text>
	</div>
	<div class=" flex flex-col items-center justify-center gap-2"></div>
	<div class=" flex flex-col items-center justify-center">
		<GameImage height="15vh" width="auto" path={unit.bodyImage}></GameImage>
		<div class="flex items-center justify-center gap-2">
			<div class="flex flex-col items-center">
				<Icon icon="warrior"></Icon><Text>{unit.attributes.strength}</Text>
			</div>
			<div class="flex flex-col items-center">
				<Icon icon="explorer"></Icon><Text>{unit.attributes.leadership}</Text>
			</div>
			<div class="flex flex-col items-center">
				<Icon icon="hunter"></Icon><Text>{unit.attributes.agility}</Text>
			</div>
			<div class="flex flex-col items-center">
				<Icon icon="crafter"></Icon><Text>{unit.attributes.intellect}</Text>
			</div>
			<div class="flex flex-col items-center">
				<Icon icon="mage"></Icon><Text>{unit.attributes.spirit}</Text>
			</div>
		</div>
	</div>
	<div class=" flex flex-col items-center justify-center gap-2"></div>
	<div class=" flex items-center justify-center gap-2">
		{#each unit.skillInstances as skillInstance}
			<HoverCard.Root>
				<HoverCard.Trigger>
					{#if !skillInstance.used}
						<div class="skill-instance cursor-default">
							<Text type="small">
								{skillInstance.data.name}
							</Text>
						</div>
					{:else}
						<div class="gbox skill-instance-used cursor-default">
							<Text type="small">
								{skillInstance.data.name}
							</Text>
						</div>
					{/if}
				</HoverCard.Trigger>
				<HoverCard.Content>
					<div class="flex items-center justify-center">
						<Text>
							{skillInstance.data.description}
						</Text>
					</div>
				</HoverCard.Content>
			</HoverCard.Root>
		{/each}
	</div>
</div>

<style>
	.skill-instance {
		border: 2px solid hsl(var(--color4));
		background-color: hsl(var(--color11));
		border-radius: 1em;
		padding: 4px;
	}
	.skill-instance-used {
		border: 2px solid hsl(var(--color4));
		background-color: hsl(var(--color3));
		border-radius: 1em;
		padding: 4px;
	}
</style>
