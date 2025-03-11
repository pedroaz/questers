<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import type { AreaInstance } from '$lib/data/areas';
	import type { Unit } from '$lib/schemas/unit';

	let { area }: { area: AreaInstance } = $props();
</script>

<div>
	<Text type="medium">{area.data.name}</Text>
</div>
