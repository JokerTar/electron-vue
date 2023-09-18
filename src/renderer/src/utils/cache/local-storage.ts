import { SIDEBAR_OPENED, SIDEBAR_CLOSED } from '@/settings';

export function getSidebarStatus(): typeof SIDEBAR_OPENED | typeof SIDEBAR_CLOSED {
	return SIDEBAR_CLOSED;
}

export function setSidebarStatus(val: typeof SIDEBAR_OPENED | typeof SIDEBAR_CLOSED) {
	console.log(val);
}
