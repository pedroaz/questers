<script lang="ts">
	import UnitBodyDetails from './unit-body-details.svelte';
	import Icon from '../icon/icon.svelte';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import type { SkillInstance } from '$lib/data/skills/skills-models';
	import { SKILLS_DICT } from '$lib/data/skills/skills-storage';
	import { UnitType, type Unit } from '$lib/domain/unit/unit';
	import { getCurrentQuest } from '$lib/states/player-state.svelte';
	let { unit }: { unit: Unit } = $props();
	const availableActions = $derived.by(() => {
		const res: SkillInstance[] = [];
		unit.skillInstances.forEach((skillInstance) => {
			const quest = getCurrentQuest();
			if (skillInstance.used) return;
			if (skillInstance.data.quests.includes(quest.data.type)) res.push(skillInstance);
		});
		return res;
	});
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button size="sm">
			{#if unit.action}
				<Text>{unit.action.name}</Text>
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
			{#each availableActions as skillInstance}
				<DropdownMenu.Item
					onclick={() => {
						unit.action = {
							instanceUuid: skillInstance.uuid,
							skillId: skillInstance.data.id,
							name: skillInstance.data.name
						};
					}}>{SKILLS_DICT[skillInstance.data.id].name}</DropdownMenu.Item
				>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
