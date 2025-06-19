<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { goToScreen } from '$lib/domain/screen-changing/screen-changer-service';
	import { ScreenId } from '$lib/domain/screen-changing/screens';
	import { driver } from 'driver.js';
	import 'driver.js/dist/driver.css';
	const driverObj = driver({
		showProgress: true,
		steps: [
			{
				element: '#party-crew-panel',
				popover: {
					title: 'Inputs',
					description: 'You can change the order of your party by dragging  them.'
				}
			},
			{
				element: '#party-artifacts-panel',
				popover: { title: 'Inputs', description: 'You can do the same with your artifacts.' }
			}
		]
	});
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button>Tutorials</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Tutorial Menu</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item
				onclick={() => {
					driverObj.drive();
				}}>Inputs</DropdownMenu.Item
			>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
