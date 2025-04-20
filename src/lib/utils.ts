import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import anime from 'animejs';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function roundNumber(value: number) {
	return Math.round(value * 10) / 10;
}

export function handleShakeByIdEvent(event: CustomEvent) {
	const elements = document.getElementById(event.detail.id);
	anime({
		targets: elements,
		translateX: [-10, 10, -10, 10, -5, 5, 0],
		duration: 500,
		easing: 'easeInOutQuad',
		autoplay: true
	});
}

export function handleShakeByClassEvent(event: CustomEvent) {
	const elements = document.getElementsByClassName(event.detail.id);
	anime({
		targets: elements,
		translateX: [-10, 10, -10, 10, -5, 5, 0],
		duration: 500,
		easing: 'easeInOutQuad',
		autoplay: true
	});
}
