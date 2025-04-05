import { addLog } from './index-db-service';

const ENABLE_DEBUG = true;
const ENABLE_LOADER = false;
const ENABLE_CREATE_WORLD = false;
const ENABLE_PERSISTENCE = false;
const ENABLE_GROUPS = false;
const ENABLE_COMBAT = false;
const ENABLE_LOADOUT = false;

type LogCategory = 'debug' | 'loader' | 'create-world' | 'persistence' | 'combat' | 'loadout';

function internalLog(category: LogCategory, message: string) {
	addLog(category, message);
}

export function log(message: string) {
	if (!ENABLE_DEBUG) return;
	internalLog('debug', message);
}

export function logLoadEvent(message: string) {
	if (!ENABLE_LOADER) return;
	internalLog('loader', message);
}

export function logCreateWorld(message: string) {
	if (!ENABLE_CREATE_WORLD) return;
	internalLog('create-world', message);
}

export function logPersistence(message: string) {
	if (!ENABLE_PERSISTENCE) return;
	internalLog('persistence', message);
}

export function logStartGroup(groupName: string) {
	if (!ENABLE_GROUPS) return;
	console.group(groupName);
}

export function logEndGroup() {
	if (!ENABLE_GROUPS) return;
	console.groupEnd();
}

export function logCombat(message: string) {
	if (!ENABLE_COMBAT) return;
	internalLog('combat', message);
}

export function logLoadout(message: string) {
	if (!ENABLE_LOADOUT) return;
	internalLog('loadout', message);
}
