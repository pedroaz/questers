<script lang="ts" module>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: 'z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
		variants: {
			variant: {
				default_old: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
				outline:
					'border-input bg-background hover:bg-accent hover:text-accent-foreground border shadow-sm',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
				ghost: '',
				link: 'text-primary underline-offset-4 hover:underline',
				default:
					'bg-[hsl(var(--background))] text-[hsl(var(--foreground))] border-4 border-[hsl(var(--border))] ' +
					'shadow-[1px_1px_0_hsl(var(--color4))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] ' +
					'active:shadow-[2px_2px_0_hsl(var(--color4))] active:translate-x-[2px] active:translate-y-[2px] ' +
					'text-base rounded-none px-4 py-2 tracking-wide',
				selected:
					'bg-[hsl(var(--color9))] text-[hsl(var(--foreground))] border-4 border-[hsl(var(--border))] ' +
					'shadow-[1px_1px_0_hsl(var(--color4))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] ' +
					'active:shadow-[2px_2px_0_hsl(var(--color4))] active:translate-x-[2px] active:translate-y-[2px] ' +
					'text-base rounded-none px-4 py-2 tracking-wide'
			},
			size: {
				default: 'h-9 rounded-md px-4 py-2',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'h-9 w-9'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	import { playSfx, SfxId } from '$lib/sound/sound-service.svelte';
	import { cn } from '$lib/utils.js';

	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		children,
		onclick,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		onclick={(event: any) => {
			if (onclick) {
				onclick(event);
			}
			playSfx(SfxId.Click);
		}}
		bind:this={ref}
		class={cn(buttonVariants({ variant, size }), className)}
		{href}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		onclick={(event: any) => {
			if (onclick) {
				onclick(event);
			}
			playSfx(SfxId.Click);
		}}
		bind:this={ref}
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
