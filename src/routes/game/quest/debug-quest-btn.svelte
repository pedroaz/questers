<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { goToScreen } from '$lib/domain/screen-changing/screen-changer-service';
	import { ScreenId } from '$lib/domain/screen-changing/screens';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button>Debug</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Debug Menu</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item
				onclick={() => {
					goToScreen(ScreenId.Rewards);
				}}>Win</DropdownMenu.Item
			>
			<DropdownMenu.Item
				onclick={() => {
					goToScreen(ScreenId.Lose);
				}}>Lose</DropdownMenu.Item
			>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
