<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import { SKILLS_DICT, type Skill } from '$lib/data/skills';

	let { skill }: { skill: Skill } = $props();
</script>

<div class="flex flex-col items-center justify-center gap-2">
	<Text type="medium">{SKILLS_DICT[skill].name}</Text>
	<Text type="small">{SKILLS_DICT[skill].description}</Text>
</div>
