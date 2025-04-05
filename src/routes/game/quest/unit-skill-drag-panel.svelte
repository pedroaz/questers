<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import { getUnitActions, getUnitById } from '$lib/states/game-state.svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { SkillInstance, SKILLS_DICT, type Skill } from '$lib/data/skills';
	import { addUnitAction, removeAction } from '$lib/services/combat/player-combat-actions';

	let { id, unitId } = $props();
	let data = $derived.by(() => {
		const crewActions = getUnitActions();
		const unit = getUnitById(unitId);

		let action = crewActions.find((action) => action.unitId == unitId);
		return { action, unit };
	});

	function onClickSkill(skillInstance: SkillInstance) {
		const crewActions = getUnitActions();
		const action = crewActions.find((action) => action.unitId == data.unit.uuid);
		// Unit has an action selected
		if (action) {
			if (action.skillInstance?.id == skillInstance.id) {
				removeAction(data.unit.uuid);
			} else {
				addUnitAction(data.unit.uuid, skillInstance);
			}
		} else {
			addUnitAction(data.unit.uuid, skillInstance);
		}
	}
</script>

<div
	{id}
	data-id={unitId}
	class="drag-box flex cursor-pointer flex-col items-center justify-center rounded-md"
>
	<div class="flex h-24 w-24 flex-col rounded-lg">
		<div>
			<GameImage id={data.unit.image}></GameImage>
		</div>
		<Popover.Root>
			<Popover.Trigger class="flex items-center justify-center">
				<div class="flex items-center justify-center">
					<Button variant="outline" size="sm">{data.unit.name}</Button>
				</div>
			</Popover.Trigger>
			<Popover.Content class="w-full">
				<div class="flex flex-col items-center justify-center gap-2">
					<div class="flex items-center justify-center gap-4">
						{#each data.unit.skillInstances as skill}
							<Button
								onclick={() => {
									onClickSkill(skill);
								}}
								disabled={skill.used}>{SKILLS_DICT[skill.type].name}</Button
							>
						{/each}
					</div>
				</div>
			</Popover.Content>
		</Popover.Root>
	</div>
</div>

<style>
	.drag-box {
		background-color: hsl(var(--color2));
	}
</style>
