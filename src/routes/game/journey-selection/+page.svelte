<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import NumberPicker from '$lib/components/ui/number-picker/number-picker.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { God, GOD_DICT } from '$lib/data/gods';
	import { startJourney } from '$lib/services/journey-starter';
	import { GetGameState } from '$lib/states/game-state.svelte';

	// iterator of dict
	const gods = Object.entries(GOD_DICT);
	let difficulty: Record<God, number> = {
		[God.None]: 0,
		[God.Blue]: 1,
		[God.Red]: 1
	};
</script>

<div class="central-screen">
	<Carousel.Root opts={{}} class="w-full max-w-xl">
		<Carousel.Content>
			{#each gods as [godId, godData]}
				<Carousel.Item class="md:basis-1/2 lg:basis-1/3">
					<div class="p-1">
						<Card.Root>
							<Card.Header>
								<Text>{godData.name}</Text>
							</Card.Header>
							<Card.Content>{godData.image}</Card.Content>
							<Card.Footer>
								<div class="flex flex-col">
									<NumberPicker
										valueChanged={(value: number) => {
											difficulty[godId as God] = value;
										}}
									></NumberPicker>
									<Button
										onclick={() => {
											GetGameState().data.godId = godId as God;
											GetGameState().data.difficulty = difficulty[godId as God];
											startJourney();
										}}>Start</Button
									>
								</div>
							</Card.Footer>
						</Card.Root>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
</div>
