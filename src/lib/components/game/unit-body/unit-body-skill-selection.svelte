<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import { UnitType, type Unit } from '$lib/domain/unit/unit';
	import Icon from '../icon/icon.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import UnitBodyDetails from './unit-body-details.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	let { unit }: { unit: Unit } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button size="sm">
			{#if unit.action}
				<Text>{unit.action}</Text>
			{:else}
				<Text>No Action</Text>
			{/if}
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Skills</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item
				onclick={() => {
					unit.action = null;
				}}>None</DropdownMenu.Item
			>
			{#each unit.skillInstances as skillInstance}
				<DropdownMenu.Item
					onclick={() => {
						unit.action = skillInstance.data.id;
					}}>{skillInstance.data.id}</DropdownMenu.Item
				>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
