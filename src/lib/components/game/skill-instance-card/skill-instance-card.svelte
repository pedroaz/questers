<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import DropdownMenuLabel from '$lib/components/ui/dropdown-menu/dropdown-menu-label.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { SKILLS_DICT, type Skill, type SkillInstance } from '$lib/data/skills';
	import type { Unit } from '$lib/schemas/unit';
	import Icon from '../icon/icon.svelte';

	let { skillInstance }: { skillInstance: SkillInstance } = $props();
	const data = SKILLS_DICT[skillInstance.type];
</script>

<Button disabled={skillInstance.used}>{data.name}</Button>

<style>
</style>
