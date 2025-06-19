<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import { getCurrentQuest } from '$lib/states/player-state.svelte';

	const quest = getCurrentQuest();
</script>

<Drawer.Root>
	<Drawer.Trigger>
		<Button>Quest Details</Button>
	</Drawer.Trigger>
	<Drawer.Content>
		<div style="height: 50vh;">
			<div class="flex h-full flex-col items-center gap-4">
				<Text type="big">Quest Details</Text>

				<Text type="medium">{quest.data.name}</Text>
			</div>
		</div>
	</Drawer.Content>
</Drawer.Root>
