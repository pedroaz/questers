<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import NumberPicker from '$lib/components/ui/number-picker/number-picker.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { GOD_DICT, type God } from '$lib/data/gods';
	import { STARTER_CLASSES } from '$lib/schemas/unit';
	import { startJourney } from '$lib/services/journey-starter';
	import {
		getPlayerUnit,
		setDifficulty,
		setGodId,
		setUnitClass
	} from '$lib/states/game-state.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { type CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import { log } from '$lib/services/infra/logger';

	let api = $state<CarouselAPI>();
	const gods = Object.entries(GOD_DICT);
	let difficulty: Record<God, number> = {
		['none']: 0,
		['blue']: 1,
		['red']: 1
	};
	let value = $state('');
	let selectedClass = $state(STARTER_CLASSES[0].class);

	$effect(() => {
		if (api) {
			api.on('select', () => {
				selectedClass = STARTER_CLASSES[api!.selectedScrollSnap()].class;
			});
		}
	});
</script>

<div class="central-screen">
	<div class="flex flex-col gap-4">
		<Carousel.Root opts={{}} class="w-full max-w-xs" setApi={(emblaApi) => (api = emblaApi)}>
			<Carousel.Content>
				{#each STARTER_CLASSES as classData}
					<Carousel.Item>
						<Card.Root>
							<Card.Header>
								<Text>{classData.class}</Text>
							</Card.Header>
							<Card.Content>{classData.image}</Card.Content>
							<Card.Footer class="flex justify-center">
								<Button onclick={() => {}}>Select</Button>
							</Card.Footer>
						</Card.Root>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>

		<Carousel.Root opts={{}} class="w-full max-w-xs">
			<Carousel.Content>
				{#each gods as [godId, godData]}
					<Carousel.Item>
						<Card.Root>
							<Card.Header>
								<Text>{godData.name}</Text>
							</Card.Header>
							<Card.Content>{godData.image}</Card.Content>
							<Card.Footer class="flex justify-center">
								<div class="flex flex-col items-center justify-center gap-4">
									<Text>Difficulty:</Text>
									<NumberPicker
										valueChanged={(value: number) => {
											difficulty[godId as God] = value;
										}}
									></NumberPicker>
									<Button
										onclick={() => {
											log('Starting Journey');
											log(
												`God: ${godId} | Difficulty: ${difficulty[godId as God]} | Class: ${selectedClass}`
											);
											setGodId(godId as God);
											setDifficulty(difficulty[godId as God]);
											setUnitClass(getPlayerUnit(), selectedClass);
											startJourney();
										}}>Start</Button
									>
								</div>
							</Card.Footer>
						</Card.Root>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
</div>
