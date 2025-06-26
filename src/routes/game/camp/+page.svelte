<script lang="ts">
	import CampActions from './camp-actions.svelte';
	import CampNavigation from './camp-navigation.svelte';
	import CampParty from './camp-party.svelte';
</script>

<div class="flex h-full justify-center">
	<div class="flex w-full">
		<div class="flex flex-[0.3] flex-col items-center justify-evenly">
			<CampParty></CampParty>
		</div>
		<div class="flex flex-[0.4] justify-center">
			<CampNavigation></CampNavigation>
		</div>
		<div class="flex flex-[0.3] justify-center">
			<CampActions></CampActions>
		</div>
	</div>
</div>
