export function generateSeed() {
	return Date.now().toString(36);
}

// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript/47593316#47593316
function splitmix32(a: number) {
	return function () {
		a |= 0;
		a = (a + 0x9e3779b9) | 0;
		let t = a ^ (a >>> 16);
		t = Math.imul(t, 0x21f0aaad);
		t = t ^ (t >>> 15);
		t = Math.imul(t, 0x735a2d97);
		return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
	};
}

function seedToNumber(seed: string): number {
	let hash = 0;
	for (let i = 0; i < seed.length; i++) {
		hash = (hash << 5) - hash + seed.charCodeAt(i);
		hash |= 0; // force 32-bit
	}
	return hash >>> 0; // make it positive
}

let rngFunc: () => number;
export function setRngFunction(seed: string) {
	const seedNumber = seedToNumber(seed);
	rngFunc = splitmix32(seedNumber);
}

export function getSeededRandomNumber() {
	if (!rngFunc) {
		throw new Error('RNG function not initialized. Call setRngFunction() first.');
	}
	return rngFunc();
}

/**
 * Get a random integer between min and max (inclusive).
 */
export function getRandomNumber(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
If chance = 30:
	•	There is a 30% chance the function returns true.
	•	There is a 70% chance it returns false.
*/
export function rollChance(chance: number): boolean {
	return getRandomNumber(1, 100) <= chance;
}

export function getRandomElement<T>(list: T[]): T | undefined {
	const randomIndex = Math.floor(Math.random() * list.length);
	return list[randomIndex];
}

export function getRandomElements<T>(list: T[], count: number): T[] {
	if (count <= 0) return [];
	if (count >= list.length) return [...list];

	const result: T[] = [];
	const usedIndices = new Set<number>();

	while (result.length < count) {
		const index = Math.floor(Math.random() * list.length);
		if (!usedIndices.has(index)) {
			usedIndices.add(index);
			result.push(list[index]);
		}
	}

	return result;
}
