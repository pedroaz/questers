<script lang="ts">
	import { getMaxHp, getMaxMana, getAttack } from '$lib/services/combat-serice';
	import { gameState } from '$lib/states/game-state.svelte';
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<h1 class="text-5xl">Character</h1>
	<div>Name: {gameState.data.playerUnit.name}</div>
	<div>Level: {gameState.data.playerUnit.level}</div>
	<div>
		HP: {gameState.data.playerUnit.hp}/{getMaxHp(gameState.data.playerUnit)}
	</div>
	<div>
		MANA: {gameState.data.playerUnit.mana}/{getMaxMana(gameState.data.playerUnit)}
	</div>
	<div>
		ATTACK: {getAttack(gameState.data.playerUnit)}
	</div>
</div>
