<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import { Slider } from '$lib/components/ui/slider/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { getConfigState, setConfigState } from '$lib/states/config-state.svelte';
	import { Divide } from '@lucide/svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { persistConfig } from '$lib/persistence/persistence-saver';

	const config = getConfigState();

	let musicSliderValue = $state(config.music);
	let sfxSliderValue = $state(config.sound);
</script>

<div class="flex flex-col items-center gap-4">
	<Text type="big">Config Panel</Text>
	<div class="flex w-full flex-col items-center gap-4">
		<Text type="medium">Music</Text>
		<Slider type="single" bind:value={musicSliderValue} max={100} step={1} />
	</div>

	<div class="flex w-full flex-col items-center gap-4">
		<Text type="medium">SFX</Text>
		<Slider type="single" bind:value={sfxSliderValue} max={100} step={1} />
	</div>

	<div class="flex w-full flex-col items-center gap-4">
		<Text type="medium">Combat Speed</Text>
		<div class="flex gap-4">
			<Button
				onclick={() => {
					config.calcDelay = 200;
				}}>Fast (200ms)</Button
			>
			<Button
				onclick={() => {
					config.calcDelay = 500;
				}}>Medium (500ms)</Button
			>
			<Button
				onclick={() => {
					config.calcDelay = 1000;
				}}>Slow (1000ms)</Button
			>
		</div>
	</div>
	<Separator></Separator>
	<Button
		size={'lg'}
		onclick={() => {
			config.music = musicSliderValue;
			config.sound = sfxSliderValue;
			setConfigState(config);
			persistConfig();
		}}>Save Config</Button
	>
</div>
