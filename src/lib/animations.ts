import anime from 'animejs';

export const SHAKE_BY_ID_EVENT = 'shake-by-id';

export function shakeById(id: string) {
	const event = new CustomEvent(SHAKE_BY_ID_EVENT, {
		detail: id
	});
	window.dispatchEvent(event);
}

export function handleShakeByIdEvent(event: CustomEvent) {
	const elements = document.getElementById(event.detail);
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
