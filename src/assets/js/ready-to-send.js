export function readyToSend(indx, data, setSendData) {
	for (const key in data) {
		if (typeof data[key] === "object") {
			if (data[key][indx] === "" && key !== "comments") return setSendData(false);
		} else {
			setSendData(true);
		}
	}
}
