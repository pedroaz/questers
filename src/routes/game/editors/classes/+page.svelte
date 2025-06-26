<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Text from '$lib/components/ui/text/text.svelte';
	import { ClassId, type ClassData } from '$lib/data/classes/classes-models';
	import { SkillId } from '$lib/data/skills/skills-models';
	import { loadSkillDict, SKILLS_DICT } from '$lib/data/skills/skills-storage';

	loadSkillDict();

	let index = $state(0);
	let data: {
		id: ClassId;
		skills: SkillId[];
	}[] = $state([
		{
			id: ClassId.Warrior,
			skills: []
		},
		{
			id: ClassId.Explorer,
			skills: []
		},
		{
			id: ClassId.Crafter,
			skills: []
		},
		{
			id: ClassId.Hunter,
			skills: []
		},
		{
			id: ClassId.Mage,
			skills: []
		}
	]);

	data.forEach((classData) => {
		const classIdToLook = classData.id;
		for (const [skillId, skillData] of Object.entries(SKILLS_DICT)) {
			if (skillData.classes.some((classId) => classId === classIdToLook)) {
				classData.skills.push(skillId as SkillId);
			}
		}
	});
</script>

<div class="my-10 flex flex-col items-center justify-center gap-4">
	<div class="flex flex-wrap gap-2">
		{#each Object.values(ClassId) as id, i}
			<Button variant={index === i ? 'selected' : 'default'} onclick={() => (index = i)}
				>{id}</Button
			>
		{/each}
	</div>
	<div class="flex flex-col items-center justify-center gap-2">
		<div>
			<Label>Id</Label>
			<Input disabled bind:value={data[index].id} />
		</div>
		<div class="flex flex-wrap gap-2">
			{#each data[index].skills as skill, skillIndex}
				<div class="gbox">
					<Text>{skill}</Text>
				</div>
			{/each}
		</div>
	</div>
</div>
