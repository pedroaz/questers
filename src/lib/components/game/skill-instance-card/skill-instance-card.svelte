<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import DropdownMenuLabel from '$lib/components/ui/dropdown-menu/dropdown-menu-label.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { SKILLS_DICT, type Skill, type SkillInstance } from '$lib/data/skills';
	import { persistGameState } from '$lib/persistence/persistence-service.svelte';
	import type { Unit } from '$lib/schemas/unit';
	import { addCrewAction } from '$lib/schemas/unit-calculationts';
	import Icon from '../icon/icon.svelte';

	let { unit, skillInstance }: { unit: Unit; skillInstance: SkillInstance } = $props();
	const data = SKILLS_DICT[skillInstance.type];

	function onClick() {
		addCrewAction(unit.uuid, skillInstance);
	}
</script>

<Button onclick={onClick} disabled={skillInstance.used}>{data.name}</Button>

<style>
</style>
