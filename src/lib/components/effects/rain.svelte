<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	// Define props with TypeScript
	export let numDrops: number = 100;

	// Types
	interface Raindrop {
		x: number;
		y: number;
		length: number;
		speed: number;
		opacity: number;
	}

	let canvas: HTMLCanvasElement | null = null;
	let ctx: CanvasRenderingContext2D | null = null;
	let animationFrame: number;
	let raindrops: Raindrop[] = [];

	function setupCanvas() {
		if (!canvas) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx = canvas.getContext('2d');

		raindrops = Array.from({ length: numDrops }, () => ({
			x: Math.random() * (canvas?.width ?? 0),
			y: Math.random() * (canvas?.height ?? 0),
			length: Math.random() * 15 + 10,
			speed: Math.random() * 5 + 2,
			opacity: Math.random() * 0.5 + 0.2
		}));
	}

	function drawRain() {
		if (!ctx || !canvas) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
		ctx.lineWidth = 2;

		for (const drop of raindrops) {
			ctx.globalAlpha = drop.opacity;
			ctx.beginPath();
			ctx.moveTo(drop.x, drop.y);
			ctx.lineTo(drop.x, drop.y + drop.length);
			ctx.stroke();

			drop.y += drop.speed;
			if (drop.y > canvas.height) {
				drop.y = -drop.length;
				drop.x = Math.random() * canvas.width;
			}
		}

		animationFrame = requestAnimationFrame(drawRain);
	}

	function handleResize() {
		setupCanvas();
	}

	onMount(() => {
		setupCanvas();
		drawRain();
		window.addEventListener('resize', handleResize);
	});

	onDestroy(() => {
		cancelAnimationFrame(animationFrame);
		window.removeEventListener('resize', handleResize);
	});
</script>

<canvas bind:this={canvas} class="rain-canvas"></canvas>

<style>
	.rain-canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		pointer-events: none; /* Ensures UI remains interactive */
	}
</style>
