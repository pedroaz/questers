<script lang="ts">
	import { SKILLS_DICT, type Skill } from '$lib/data/skills';
	import * as HoverCard from '$lib/components/ui/hover-card/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import SkillBox from '$lib/components/game/skill-box/skill-box.svelte';

	let { skill }: { skill: Skill } = $props();
</script>

<div class="box p-4">
	<HoverCard.Root>
		<HoverCard.Trigger>
			<Text>{SKILLS_DICT[skill].name}</Text>
		</HoverCard.Trigger>
		<HoverCard.Content>
			<SkillBox {skill}></SkillBox>
		</HoverCard.Content>
	</HoverCard.Root>
</div>
