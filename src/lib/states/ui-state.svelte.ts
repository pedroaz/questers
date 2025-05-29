let _showTopBar = $state(true);
export function getShowTopBar() {
	return _showTopBar;
}
export function setShowTopBar(value: boolean) {
	_showTopBar = value;
}
