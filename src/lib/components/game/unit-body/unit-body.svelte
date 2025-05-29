<!-- <script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import type { Unit } from '$lib/domain/unit/unit';
	import GameImage from '../image/game-image.svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import AttributeBox from '../attribute-box/attribute-box.svelte';
	import Icon from '../icon/icon.svelte';
	import { getUnitPower } from '$lib/domain/combat/combat-utils';

	let { unit }: { unit: Unit } = $props();
</script>


<div class="justify-centerbox flex h-24 w-24 cursor-pointer flex-col items-center">
	<Popover.Root>
		<Popover.Trigger>
			<GameImage id={unit.image}></GameImage>
		</Popover.Trigger>
		<Popover.Content>
			<div class="flex flex-col items-center justify-center gap-2">
				<Text type="medium">[{unit.level}] {unit.name}</Text>
				<AttributeBox attributes={unit.attributes}></AttributeBox>
			</div>
		</Popover.Content>
	</Popover.Root>
	<Text type="small">{unit.name}</Text>
	<div class="flex items-center justify-center">
		<Icon icon="power"></Icon>
		<Text>{getUnitPower(unit)}</Text>
	</div>
</div> -->
