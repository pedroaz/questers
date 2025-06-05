import { sleep } from '$lib/utils';

const SLEEP_TIME = 100;

export async function clickButton(text: string) {
	console.log('clickButton', text);
	for (let i = 0; i < 20; i++) {
		const buttons = document.querySelectorAll('Button');
		for (const btn of buttons) {
			if (btn.textContent?.includes(text)) {
				(btn as HTMLElement).click();
				return;
			}
		}
		await sleep(SLEEP_TIME);
	}
}

export async function closeDialog() {
	console.log('closeDialog');

	for (let i = 0; i < 20; i++) {
		const btn = document.querySelector('button[data-state="open"]');
		if (btn) {
			(btn as HTMLElement).click();
		}
		await sleep(SLEEP_TIME);
		return;
	}
}
