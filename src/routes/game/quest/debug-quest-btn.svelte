<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
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
					goto('/game/rewards');
				}}>Win</DropdownMenu.Item
			>
			<DropdownMenu.Item>Lose</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
