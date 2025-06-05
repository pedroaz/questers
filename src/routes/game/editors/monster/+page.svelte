<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { ChestId } from '$lib/data/chests/chests-models';
	import { MonsterId } from '$lib/data/monsters/monsters-models';
	import monstersFile from '$lib/data/monsters/monsters.json';
	import { SkillId } from '$lib/data/skills/skills-models';
	import { UnitType } from '$lib/domain/unit/unit';

	let monsterIds = Object.values(MonsterId);
	let initialData = structuredClone(monstersFile);
	let chestDropRate = $state(100);
	let chestLevel = $state(1);
	let data: {
		id: string;
		description: string;
		unit: {
			name: string;
			type: string;
			attributes: {
				strength: number;
				leadership: number;
				agility: number;
				intellect: number;
				spirit: number;
			};
			skills: string[];
			startingHp: number;
			bodyImage: string;
			iconImage: string;
		};
		chestDrops: {
			chance: number;
			chestId: string;
			level: number;
		}[];
	}[] = $state([]);

	monsterIds.forEach((id) => {
		const monster = initialData.find((monster) => monster.id == id);
		data.push({
			id: id,
			description: monster ? monster.description : 'NO_DESCRIPTION',
			unit: {
				name: monster ? monster.unit.name : 'NO_NAME',
				type: monster ? monster.unit.type : UnitType.Monster,
				attributes: {
					strength: monster ? monster.unit.attributes.strength : 0,
					leadership: monster ? monster.unit.attributes.leadership : 0,
					agility: monster ? monster.unit.attributes.agility : 0,
					intellect: monster ? monster.unit.attributes.intellect : 0,
					spirit: monster ? monster.unit.attributes.spirit : 0
				},
				skills: monster ? monster.unit.skills : [],
				startingHp: monster ? monster.unit.startingHp : 0,
				bodyImage: monster ? monster.unit.bodyImage : '',
				iconImage: monster ? monster.unit.iconImage : ''
			},
			chestDrops: monster ? monster.chestDrops : []
		});
	});

	let index = $state(0);

	function copyJson() {
		const output = JSON.stringify(data, null, 2);
		navigator.clipboard.writeText(output);
	}
</script>

<div class="my-10 flex flex-col items-center justify-center gap-4">
	<Button onclick={copyJson}>Copy JSON</Button>
	<div class="flex flex-wrap gap-2">
		{#each monsterIds as id, i}
			<Button onclick={() => (index = i)}>{id}</Button>
		{/each}
	</div>
	{#if index != -1}
		<div class="flex gap-2">
			<div>
				<Label>Id</Label>
				<Input disabled bind:value={data[index].id} />
			</div>
			<div>
				<Label>Description</Label>
				<Textarea bind:value={data[index].description} />
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<div class="flex gap-2">
				<div>
					<Label>Name</Label>
					<Input bind:value={data[index].unit.name} />
				</div>
				<div>
					<Label>Type</Label>
					<Select.Root bind:value={data[index].unit.type} type="single">
						<Select.Trigger class="w-[180px]">
							{data[index].unit.type}
						</Select.Trigger>
						<Select.Content>
							<Select.Item value={UnitType.Monster}>Monster</Select.Item>
							<Select.Item value={UnitType.Boss}>Boss</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>

				<div>
					<Label>Starting HP</Label>
					<Input type="number" bind:value={data[index].unit.startingHp} />
				</div>
			</div>
			<div class="flex gap-2">
				<div>
					<Label>Body Image</Label>
					<Input bind:value={data[index].unit.bodyImage} />
				</div>
				<div>
					<Label>Icon Image</Label>
					<Input bind:value={data[index].unit.iconImage} />
				</div>
			</div>

			<div>
				<Label>Attributes</Label>
				<div class="flex gap-2">
					<div>
						<Label>Strength</Label>
						<Input type="number" bind:value={data[index].unit.attributes.strength} />
					</div>
					<div>
						<Label>Agility</Label>
						<Input type="number" bind:value={data[index].unit.attributes.agility} />
					</div>
					<div>
						<Label>Leadership</Label>
						<Input type="number" bind:value={data[index].unit.attributes.leadership} />
					</div>

					<div>
						<Label>Intelligence</Label>
						<Input type="number" bind:value={data[index].unit.attributes.intellect} />
					</div>
					<div>
						<Label>Spirit</Label>
						<Input type="number" bind:value={data[index].unit.attributes.spirit} />
					</div>
				</div>
			</div>
			<Text type="big">Skills</Text>
			<div class="flex justify-around">
				<div class="box flex flex-[1/2] flex-wrap gap-2 p-4">
					{#each data[index].unit.skills as skill, skillIndex}
						<Button
							onclick={() => {
								data[index].unit.skills.splice(skillIndex, 1);
							}}>{skill}</Button
						>
					{/each}
				</div>
				<div class="box flex flex-[1/2] flex-wrap gap-2 p-4">
					{#each Object.values(SkillId) as skillToAdd}
						<Button
							onclick={() => {
								data[index].unit.skills.push(skillToAdd);
							}}>{skillToAdd}</Button
						>
					{/each}
				</div>
			</div>
			<Text type="big">Chests</Text>
			<div class="flex justify-around">
				<div class="box flex flex-[1/2] flex-wrap gap-2 p-4">
					{#each data[index].chestDrops as chest, chestIndex}
						<Button
							onclick={() => {
								data[index].chestDrops.splice(chestIndex, 1);
							}}>{chest.chestId} | {chest.chance}% | lvl: {chest.level}</Button
						>
					{/each}
				</div>
				<div class="box flex flex-[1/2] flex-wrap gap-2 p-4">
					{#each Object.values(ChestId) as chestToAdd}
						<Input type="number" bind:value={chestDropRate} />
						<Input type="number" bind:value={chestLevel} />
						<Button
							onclick={() => {
								data[index].chestDrops.push({
									chance: chestDropRate,
									chestId: chestToAdd,
									level: chestLevel
								});
							}}>{chestToAdd}</Button
						>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
