<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import { getCrewActions } from '$lib/states/game-state.svelte';

	let { id, name, unitId } = $props();
	let state = $derived.by(() => {
		const crewActions = getCrewActions();
		let action = crewActions.find((action) => action.unitId == unitId);
		return { action };
	});
</script>

<div {id} data-id={unitId} class="panel flex flex-col items-center justify-center p-2">
	<Text>{name}</Text>
	<Text>({state.action?.skillInstance?.type})</Text>
</div>

<style>
	.panel {
		background: rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(0, 0, 0, 0.1);
		padding: 8px;
	}
</style>
