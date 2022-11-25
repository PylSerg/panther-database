export function pointerEventsON(appStyle, setAppStyle) {
	document.body.style.overflow = "auto";

	const styleAppBlock = appStyle.app__block;

	for (let i = 0; i < styleAppBlock.length; i++) {
		if (styleAppBlock[i] === "app__block--locked") styleAppBlock.splice(i, 1);
	}

	setAppStyle({ ...appStyle, app__block: styleAppBlock });
}

export function pointerEventsOFF(appStyle, setAppStyle) {
	document.body.style.overflow = "hidden";

	const appBlock = appStyle.app__block;
	appBlock.push("app__block--locked");

	setAppStyle({ ...appStyle, app__block: appBlock });
}
