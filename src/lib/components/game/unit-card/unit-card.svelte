<script lang="ts">
	import UnitCardDetails from './unit-card-details.svelte';
	import Icon from '../icon/icon.svelte';
	import GameImage from '../image/game-image.svelte';

	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import type { Unit } from '$lib/domain/unit/unit';

	let { unit }: { unit: Unit } = $props();
	let openDetails = $state(false);

	function showDetailedUnit() {
		openDetails = true;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={showDetailedUnit} class="gbox cursor-pointer p-2">
	<div class="flex items-center justify-center">
		<Text type="medium">{unit.name} - Lvl {unit.level}</Text>
	</div>
	<div class="flex flex-col items-center justify-center gap-2"></div>
	<div class="flex items-center justify-center">
		<GameImage width="auto" height="15vh" path={unit.bodyImage}></GameImage>
	</div>
	<div class="flex flex-col items-center justify-center gap-2"></div>
	<div class="">
		<div class="flex scale-75 items-center justify-center gap-2">
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
</div>

<Dialog.Root open={openDetails} onOpenChange={(open) => (openDetails = open)}>
	<Dialog.Content class="h-[80%] w-[80%] max-w-none">
		<Dialog.Description>
			<UnitCardDetails {unit}></UnitCardDetails>
		</Dialog.Description>
	</Dialog.Content>
</Dialog.Root>
