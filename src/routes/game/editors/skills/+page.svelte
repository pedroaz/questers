<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { SkillId, SkillType } from '$lib/data/skills/skills-models';
	import skillsFile from '$lib/data/skills/skills.json';
	import * as Select from '$lib/components/ui/select/index.js';
	import { ClassId } from '$lib/data/classes/classes-models';

	let data: {
		id: string;
		type: string;
		name: string;
		image: string;
		description: string;
		classes: string[];
	}[] = $state([]);

	let index = $state(0);

	let initialData = structuredClone(skillsFile);
	let skillIds = Object.values(SkillId);
	skillIds.forEach((id) => {
		const skill = initialData.find((skill) => skill.id == id);
		data.push({
			id: id,
			type: skill ? skill.type : 'offensive',
			name: skill ? skill.name : 'NO_NAME',
			image: skill ? skill.image : 'skills/default.png',
			description: skill ? skill.description : 'NO_DESCRIPTION',
			classes: skill ? skill.classes : []
		});
	});

	function copyJson() {
		const output = JSON.stringify(data, null, 2);
		navigator.clipboard.writeText(output);
	}
</script>

<div class="my-10 flex flex-col items-center justify-center gap-4">
	<Button onclick={copyJson}>Copy JSON</Button>
	<div class="flex flex-wrap gap-2">
		{#each Object.values(SkillId) as id, i}
			<Button variant={index === i ? 'selected' : 'default'} onclick={() => (index = i)}
				>{id}</Button
			>
		{/each}
	</div>
	{#if index != -1}
		<div class="flex flex-col gap-2">
			<div class="flex gap-2">
				<div>
					<Label>Id</Label>
					<Input disabled bind:value={data[index].id} />
				</div>
				<div>
					<Label>Name</Label>
					<Input bind:value={data[index].name} />
				</div>
				<div>
					<Label>Description</Label>
					<Textarea bind:value={data[index].description} />
				</div>
				<div>
					<Label>Image</Label>
					<Input bind:value={data[index].image} />
				</div>
			</div>
			<div class="flex gap-2">
				<div>
					<Label>Type</Label>
					<Select.Root bind:value={data[index].type} type="single">
						<Select.Trigger class="w-[180px]">
							{data[index].type}
						</Select.Trigger>
						<Select.Content>
							<Select.Item value={SkillType.Offensive}>Offensive</Select.Item>
							<Select.Item value={SkillType.Defensive}>Defensive</Select.Item>
							<Select.Item value={SkillType.Utility}>Utility</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
				<div>
					<Label>Classes</Label>
					<Select.Root bind:value={data[index].classes} type="multiple">
						<Select.Trigger class="w-[180px]">
							{data[index].classes}
						</Select.Trigger>
						<Select.Content>
							<Select.Item value={ClassId.Warrior}>Warrior</Select.Item>
							<Select.Item value={ClassId.Explorer}>Explorer</Select.Item>
							<Select.Item value={ClassId.Crafter}>Crafter</Select.Item>
							<Select.Item value={ClassId.Hunter}>Hunter</Select.Item>
							<Select.Item value={ClassId.Mage}>Mage</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
			</div>
		</div>
	{/if}
</div>
