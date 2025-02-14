<script lang="ts">
	import { getMaxHp, getMaxMana, getAttack } from '$lib/services/combat-serice';
	import { gameState } from '$lib/states/game-state.svelte';
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<h1 class="text-5xl">Character</h1>
	<div>Name: {gameState.data.playerCharacter.unit.name}</div>
	<div>Level: {gameState.data.playerCharacter.unit.level}</div>
	<div>
		HP: {gameState.data.playerCharacter.unit.hp}/{getMaxHp(gameState.data.playerCharacter.unit)}
	</div>
	<div>
		MANA: {gameState.data.playerCharacter.unit.mana}/{getMaxMana(
			gameState.data.playerCharacter.unit
		)}
	</div>
	<div>
		ATTACK: {getAttack(gameState.data.playerCharacter.unit)}
	</div>
</div>
