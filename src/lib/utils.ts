import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { UnitType, type Unit } from './domain/unit/unit';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function roundNumber(value: number) {
	return Math.round(value * 10) / 10;
}

export function getRandomElement<T>(list: T[]): T | undefined {
	const randomIndex = Math.floor(Math.random() * list.length);
	return list[randomIndex];
}

export function isUnitFriendly(unit: Unit) {
	return unit.type === UnitType.Player || unit.type === UnitType.Companion;
}
