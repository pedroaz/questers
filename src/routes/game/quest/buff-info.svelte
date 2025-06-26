<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { BUFFS_DICT } from '$lib/data/buffs/buffs-storage';
	import type { BuffInstance } from '$lib/data/buffs/buffs-models';

	let { buffInstance }: { buffInstance: BuffInstance } = $props();
</script>

<Popover.Root>
	<Popover.Trigger>
		<div class="gbox">
			<Text>{BUFFS_DICT[buffInstance.data.id].name}</Text>
		</div>
	</Popover.Trigger>
	<Popover.Content>
		<div class="flex items-center justify-center">
			<Text>{BUFFS_DICT[buffInstance.data.id].description}</Text>
		</div>
	</Popover.Content>
</Popover.Root>
