<script lang="ts">
	import { type TextType } from './index';
	export let type: TextType = 'ui-text';
	export let bold = false;
	export let underline = false;
	export let center = false;
	export let strike = false;
	export let selectable = false;

	const sizeClasses: Record<string, string> = {
		'game-title': 'text-8xl',
		big: 'text-5xl',
		'ui-text': 'text-base',
		medium: 'text-3xl',
		small: 'text-sm'
	};

	$: classList = `${selectable ? '' : 'select-none'} z-10 ${sizeClasses[type]} ${bold ? 'font-bold' : ''} ${underline ? 'underline' : ''} ${center ? 'central-text' : ''} ${strike ? 'font-strike' : ''}`;
</script>

<span style="white-space: pre-line;" class={classList}>
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
	.font-strike {
		text-decoration: line-through;
	}
</style>
