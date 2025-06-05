import { clickButton, closeDialog } from './test-driver';

import { sleep } from '$lib/utils';

export async function testMainMenuToCamp() {
	await clickButton('New Game');
	await clickButton('Next Line');
	await clickButton('Continue Story');
	await clickButton('Embark');
	await clickButton('Next Line');
	await clickButton('Continue Story');
	await sleep(200);
	await closeDialog();
	// await clickButton('Wander around');
	// await clickButton('Start Quest');
}
