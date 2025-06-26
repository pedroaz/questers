import { animate, utils } from 'animejs';

export const SHAKE_BY_ID_EVENT = 'shake-by-id';

export function shakeById(id: string) {
	const event = new CustomEvent(SHAKE_BY_ID_EVENT, {
		detail: id
	});
	window.dispatchEvent(event);
}

export function handleShakeByIdEvent(event: CustomEvent) {
	const element = document.getElementById(event.detail);
	if (!element) {
		return;
	}

	animateElements(element);
}

function animateElements(element: HTMLElement) {
	utils.remove(element);

	animate(element, {
		translateX: [-10, 10, -10, 10, -5, 5, 0],
		duration: 500,
		autoplay: true
	});
}
