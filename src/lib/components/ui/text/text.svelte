<script lang="ts">
	import { type TextType } from './index';
	export let type: TextType = 'ui-text';
	export let bold = false;
	export let underline = false;
	export let center = false;

	const sizeClasses: Record<string, string> = {
		'game-title': 'text-9xl',
		big: 'text-5xl',
		'ui-text': 'text-base',
		medium: 'text-3xl'
	};

	$: classList = `${sizeClasses[type]} ${bold ? 'font-bold' : ''} ${underline ? 'underline' : ''} ${center ? 'central-text' : ''}`;
</script>

<span class={classList}>
	<slot></slot>
</span>

<style>
	.underline {
		text-decoration: underline;
	}
	.font-bold {
		font-weight: bold;
	}
	.central-text {
		text-align: center;
	}
</style>
