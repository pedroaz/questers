<script lang="ts">
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import Text from '../text/text.svelte';
	import Button from '../button/button.svelte';
	let { valueChanged, value = 0, min = 0, max = 1000, step = 1 } = $props();

	function add() {
		value += step;
		if (value > max) {
			value = max;
		}
		valueChanged(value);
	}

	function subtract() {
		value -= step;
		if (value < min) {
			value = min;
		}
		valueChanged(value);
	}
</script>

<div class="flex items-center text-center">
	<Button onclick={subtract}>
		<ChevronLeft></ChevronLeft>
	</Button>
	<Text type="big">{value}</Text>
	<Button onclick={add}>
		<ChevronRight></ChevronRight>
	</Button>
</div>
<!-- <input type="number" bind:value on:change={handleChange} {min} {max} {step} class="w-full" /> -->
