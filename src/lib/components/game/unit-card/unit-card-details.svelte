<script lang="ts">
	import Icon from '../icon/icon.svelte';
	import GameImage from '../image/game-image.svelte';

	import * as HoverCard from '$lib/components/ui/hover-card/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import type { Unit } from '$lib/domain/unit/unit';

	let { unit }: { unit: Unit } = $props();
</script>

<div class="parent">
	<div class="div1 flex items-center justify-center">
		<Text type="medium">{unit.name} - Lvl {unit.level}</Text>
	</div>
	<div class="div2 flex flex-col items-center justify-center gap-2"></div>
	<div class="div3 flex flex-col items-center justify-center">
		<GameImage path={unit.bodyImage}></GameImage>
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
				<Icon icon="sage"></Icon><Text>{unit.attributes.spirit}</Text>
			</div>
		</div>
	</div>
	<div class="div4 flex flex-col items-center justify-center gap-2"></div>
	<div class="div5 flex items-center justify-center gap-2">
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
						<div class="skill-instance-used cursor-default">
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
	.parent {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		border: 2px solid hsl(var(--color4));
		background: hsl(var(--color10));
		border-radius: 1em;
		margin: 10px;
	}

	.div1 {
		grid-area: 1 / 1 / 2 / 6;
	}
	.div2 {
		grid-area: 2 / 1 / 5 / 2;
	}
	.div3 {
		grid-area: 2 / 2 / 5 / 5;
	}
	.div4 {
		grid-area: 2 / 5 / 5 / 6;
	}
	.div5 {
		grid-area: 5 / 1 / 6 / 6;
	}
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
