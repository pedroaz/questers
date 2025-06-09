import type { IOptions, RecursivePartial } from '@tsparticles/engine';

export const RNG_PARTICLES: RecursivePartial<IOptions> = {
	particles: {
		color: {
			value: '#574852'
		},
		move: {
			enable: true,
			direction: 'bottom'
		},
		number: {
			value: 30
		}
	},
	fullScreen: false,
	zLayers: 1
};
