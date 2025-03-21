<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import { getCrewActions } from '$lib/states/game-state.svelte';

	let { id, name, unitId } = $props();
	let data = $derived.by(() => {
		const crewActions = getCrewActions();
		let action = crewActions.find((action) => action.unitId == unitId);
		return { action };
	});
</script>

<div {id} data-id={unitId} class="p- flex items-center justify-center bg-blue-800 p-2">
	<Text>{name}</Text>
	<Text>({data.action?.skillInstance?.type})</Text>
</div>
