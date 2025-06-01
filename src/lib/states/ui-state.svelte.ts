let _showTopBar = $state(true);
export function getShowTopBar() {
	return _showTopBar;
}
export function setShowTopBar(value: boolean) {
	_showTopBar = value;
}

let _topMenuText = $state('Questers');
export function getTopMenuText() {
	return _topMenuText;
}
export function setTopMenuText(value: string) {
	_topMenuText = value;
}
