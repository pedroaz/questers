import { clickButton, closeDialog } from './test-driver';

import { sleep } from '$lib/utils';

export async function testMainMenuToCamp() {
	await clickButton('New Game');
	await clickButton('Next Line');
	await clickButton('Continue Story');
	await clickButton('Embark');
	await clickButton('Next Line');
	await clickButton('Continue Story');
	await closeDialog();
}
