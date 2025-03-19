<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import { GOD_DICT, GOD_INSTANCES, type God } from '$lib/data/gods';
	import { STARTER_CLASSES } from '$lib/schemas/unit';
	import { type CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import { log } from '$lib/services/infra/logger';
	import { startJourney } from '$lib/services/journey-starter';
	import { getPlayerUnit, setGodId, setUnitClass } from '$lib/states/game-state.svelte';

	// States
	let selectedGod = $state(GOD_DICT['red']);
	let selectedClass = $state(STARTER_CLASSES[0]);

	// Carousels
	let classCarouselApi = $state<CarouselAPI>();
	let godApi = $state<CarouselAPI>();

	$effect(() => {
		if (classCarouselApi) {
			classCarouselApi.on('select', () => {
				selectedClass = STARTER_CLASSES[classCarouselApi!.selectedScrollSnap()];
			});
		}
		if (godApi) {
			godApi.on('select', () => {
				const godInstance = GOD_INSTANCES[godApi!.selectedScrollSnap()];
				selectedGod = GOD_DICT[godInstance.id];
			});
		}
	});
</script>

<div class="central-screen">
	<div class="flex flex-col items-center gap-24">
		<Text type="big">Pick your favors</Text>
		<div class="flex items-center gap-44">
			<div class="flex flex-col items-center gap-4">
				<Text underline type="medium">Spirit</Text>
				<Carousel.Root
					opts={{}}
					class="w-full max-w-xs"
					setApi={(emblaApi) => (classCarouselApi = emblaApi)}
				>
					<Carousel.Content>
						{#each STARTER_CLASSES as classData}
							<Carousel.Item>
								<div class="flex flex-col items-center gap-4">
									<Text strike={!classData.enabled}>{classData.description}</Text>
								</div>
							</Carousel.Item>
						{/each}
					</Carousel.Content>
					<Carousel.Previous />
					<Carousel.Next />
				</Carousel.Root>
			</div>
			<div class="flex flex-col items-center gap-4">
				<Text underline type="medium">God</Text>
				<Carousel.Root opts={{}} class="w-full max-w-xs" setApi={(emblaApi) => (godApi = emblaApi)}>
					<Carousel.Content>
						{#each GOD_INSTANCES as godInstance}
							<Carousel.Item>
								<div class="flex flex-col items-center gap-4">
									<Text strike={!godInstance.enabled}>{GOD_DICT[godInstance.id].name}</Text>
								</div>
							</Carousel.Item>
						{/each}
					</Carousel.Content>
					<Carousel.Previous />
					<Carousel.Next />
				</Carousel.Root>
			</div>
		</div>
		<div class="flex flex-col items-center justify-center gap-4">
			<Text>{selectedClass.description} | {selectedGod.name}</Text>
			<Button
				onclick={() => {
					log('Starting Journey');
					const playerUnit = getPlayerUnit();
					if (!playerUnit) return;
					setGodId(selectedGod.id as God);
					setUnitClass(playerUnit, selectedClass.class);
					startJourney();
				}}>Embark</Button
			>
		</div>
	</div>
</div>
