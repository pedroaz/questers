<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { MonsterId } from '$lib/data/monsters/monsters-models';
	import areasFile from '$lib/data/navigation/areas.json';
	import { AreaId, AreaType } from '$lib/data/navigation/navigation-models';
	import { QuestType, WinCondition } from '$lib/domain/navigation/quests-models';

	let areaIds = Object.values(AreaId);
	let initialData = structuredClone(areasFile);
	let chestDropRate = $state(100);
	let data: {
		id: string;
		name: string;
		type: string;
		description: string;
		image: string;
		questsData: {
			type: string;
			winCondition: string;
			energyCost: number;
			threat: number;
			name: string;
			description: string;
			minAmountOfInstances: number;
			maxAmountOfInstances: number;
			roundsData: {
				chance: number;
				spawns: {
					chance: number;
					level: number;
					monsterId: string;
				}[];
			}[];
		}[];
	}[] = $state([]);

	areaIds.forEach((id) => {
		const area = initialData.find((area) => area.id == id);
		data.push({
			id: id,
			name: area?.name ?? '',
			type: area?.type ?? '',
			description: area?.description ?? '',
			image: area?.image ?? '',
			questsData: area?.questsData ?? []
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
		{#each areaIds as id, i}
			<Button onclick={() => (index = i)}>{id}</Button>
		{/each}
	</div>
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
			<Label>Type</Label>
			<Select.Root bind:value={data[index].type} type="single">
				<Select.Trigger class="w-[180px]">
					{data[index].type}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value={AreaType.Normal}>Normal</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>
		<div>
			<Label>Image</Label>
			<Input bind:value={data[index].image} />
		</div>
		<div>
			<Label>Description</Label>
			<Textarea bind:value={data[index].description} />
		</div>
	</div>
	<Text type="big">Quests</Text>
	<Button
		onclick={() => {
			data[index].questsData.push({
				name: 'NO_NAME',
				description: 'NO DESCRIPTION',
				type: QuestType.Balanced,
				winCondition: WinCondition.Kill,
				energyCost: 1,
				threat: 10,
				minAmountOfInstances: 1,
				maxAmountOfInstances: 1,
				roundsData: []
			});
		}}>New Quest</Button
	>
	<div class="flex flex-col gap-2">
		{#each data[index].questsData as quest, questIndex}
			<div class="box flex flex-col gap-2 p-2">
				<div>
					<Label>Name</Label>
					<Input bind:value={data[index].questsData[questIndex].name} />
				</div>
				<div>
					<Label>Description</Label>
					<Textarea bind:value={data[index].questsData[questIndex].description} />
				</div>
				<div>
					<Button
						onclick={() => {
							data[index].questsData.splice(questIndex, 1);
						}}>Delete Quest</Button
					>
				</div>
				<div class="flex gap-2">
					<div>
						<Label>Type</Label>
						<Select.Root bind:value={data[index].questsData[questIndex].type} type="single">
							<Select.Trigger class="w-[180px]">
								{data[index].questsData[questIndex].type}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value={QuestType.Balanced}>Balanced</Select.Item>
								<Select.Item value={QuestType.Provoke}>Provoke</Select.Item>
								<Select.Item value={QuestType.Hunt}>Hunt</Select.Item>
								<Select.Item value={QuestType.Craft}>Craft</Select.Item>
								<Select.Item value={QuestType.Recruit}>Recruit</Select.Item>
								<Select.Item value={QuestType.Gather}>Gather</Select.Item>
								<Select.Item value={QuestType.Explore}>Explore</Select.Item>
								<Select.Item value={QuestType.Explore}>Pray</Select.Item>
								<Select.Item value={QuestType.Arcane}>Pray</Select.Item>
							</Select.Content>
						</Select.Root>
					</div>
					<div>
						<Label>Win Condition</Label>
						<Select.Root bind:value={data[index].questsData[questIndex].winCondition} type="single">
							<Select.Trigger class="w-[180px]">
								{data[index].questsData[questIndex].winCondition}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value={WinCondition.Kill}>Kill</Select.Item>
								<Select.Item value={WinCondition.Survive}>Survive</Select.Item>
							</Select.Content>
						</Select.Root>
					</div>
					<div>
						<Label>Energy Cost</Label>
						<Input type="number" bind:value={data[index].questsData[questIndex].energyCost} />
					</div>
					<div>
						<Label>Threat</Label>
						<Input type="number" bind:value={data[index].questsData[questIndex].threat} />
					</div>
					<div>
						<Label>Min Amount of Instances</Label>
						<Input
							type="number"
							bind:value={data[index].questsData[questIndex].minAmountOfInstances}
						/>
					</div>
					<div>
						<Label>Max Amount of Instances</Label>
						<Input
							type="number"
							bind:value={data[index].questsData[questIndex].maxAmountOfInstances}
						/>
					</div>
				</div>
				<dir>
					<Text type="medium">Rounds</Text>
					<Button
						onclick={() => {
							data[index].questsData[questIndex].roundsData.push({
								chance: 100,
								spawns: []
							});
						}}>New Round</Button
					>
					<div class="flex flex-col flex-wrap gap-2">
						{#each data[index].questsData[questIndex].roundsData as round, roundIndex}
							<div class="box flex flex-col gap-2 p-4">
								<div>
									<Text>Round Index: {roundIndex}</Text>
									<Button
										onclick={() => {
											data[index].questsData[questIndex].roundsData.splice(roundIndex, 1);
										}}>Delete Round</Button
									>
								</div>

								<div>
									<Label>Round Chance</Label>
									<Input
										type="number"
										bind:value={data[index].questsData[questIndex].roundsData[roundIndex].chance}
									/>
								</div>
								<Button
									onclick={() => {
										data[index].questsData[questIndex].roundsData[roundIndex].spawns.push({
											chance: 100,
											level: 1,
											monsterId: MonsterId.Ratly
										});
									}}>New Spawn</Button
								>
								<div class="flex gap-2">
									{#each data[index].questsData[questIndex].roundsData[roundIndex].spawns as spawn, spawnIndex}
										<div class="box p-2">
											<div>
												<Text>Spawn Index: {spawnIndex}</Text>
												<Button
													onclick={() => {
														data[index].questsData[questIndex].roundsData[roundIndex].spawns.splice(
															spawnIndex,
															1
														);
													}}>Delete Spawn</Button
												>
											</div>
											<div>
												<Label>Monster</Label>
												<Select.Root bind:value={spawn.monsterId} type="single">
													<Select.Trigger class="w-[180px]">
														{spawn.monsterId}
													</Select.Trigger>
													<Select.Content>
														{#each Object.values(MonsterId) as monsterId}
															<Select.Item value={monsterId}>{monsterId}</Select.Item>
														{/each}
													</Select.Content>
												</Select.Root>
											</div>
											<div>
												<Label>Spawn Chance</Label>
												<Input type="number" bind:value={spawn.chance} />
											</div>
											<div>
												<Label>Level</Label>
												<Input type="number" bind:value={spawn.level} />
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</dir>
			</div>
		{/each}
	</div>
</div>
