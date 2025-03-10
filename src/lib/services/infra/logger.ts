import { addLog } from './index-db-service';

type LogCategory = 'debug' | 'loader' | 'create-world';

function internalLog(category: LogCategory, message: string) {
	console.log(`[${category}] ${message}`);
	addLog(category, message);
}

export function log(message: string) {
	internalLog('debug', message);
}

export function logLoadEvent(message: string) {
	internalLog('loader', message);
}

export function logCreateWorld(message: string) {
	internalLog('create-world', message);
}
