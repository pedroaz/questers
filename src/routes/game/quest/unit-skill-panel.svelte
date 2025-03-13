<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import { getCrewActions } from '$lib/states/game-state.svelte';

	let { name, id } = $props();
	let skill = $derived.by(() => {
		let action = getCrewActions().find((action) => action.unitId == id);
		const type = action?.skillInstance?.type;
		return type;
	});
</script>

<div data-id={id} class="panel flex flex-col items-center justify-center p-2">
	<Text>{name}</Text>
	<Text>({skill})</Text>
</div>

<style>
	.panel {
		background: rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(0, 0, 0, 0.1);
		padding: 8px;
	}
</style>
