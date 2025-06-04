import { sleep } from '$lib/utils';

const SLEEP_TIME = 100;

export async function clickButton(text: string) {
	console.log('clickButton', text);
	const buttons = document.querySelectorAll('Button');
	for (const btn of buttons) {
		if (btn.textContent?.trim() === text) {
			(btn as HTMLElement).click();
			break;
		}
	}
	await sleep(SLEEP_TIME);
}

export async function closeDialog() {
	console.log('closeDialog');
	const btn = document.querySelector('button[data-state="open"]');
	if (btn) {
		(btn as HTMLElement).click();
	}
	await sleep(SLEEP_TIME);
}
