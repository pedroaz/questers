<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	let openDebugMenu = $state(false);

	// Toggle debug menu if command + D is pressed
	import { onMount, onDestroy } from 'svelte';

	function handleKeyDown(event: KeyboardEvent) {
		const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
		const isCmd = isMac ? event.metaKey : event.ctrlKey;

		if (isCmd && event.shiftKey && event.key.toLowerCase() === 'd') {
			event.preventDefault(); // prevent default browser behavior
			openDebugMenu = !openDebugMenu;
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeyDown);
	});

	onDestroy(() => {
		window.removeEventListener('keydown', handleKeyDown);
	});
</script>

<Dialog.Root
	open={openDebugMenu}
	onOpenChange={(open) => {
		openDebugMenu = open;
	}}
>
	<Dialog.Content class="w-[40%] max-w-none">
		<Dialog.Title>
			<Text type="medium">Debug Menu</Text>
		</Dialog.Title>
		<Dialog.Description>
			<!-- <Button
				onclick={async () => {
					clearGameState();
					openDebugMenu = false;
					await testMainMenuToCamp();
				}}>Main Menu -> Quest</Button
			> -->
		</Dialog.Description>
	</Dialog.Content>
</Dialog.Root>
