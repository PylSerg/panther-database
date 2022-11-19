export function readyToSend(indx, data, setSendData, rows) {
	if (indx === -1) {
		let counter = 0;
		const keys = Object.keys(data);
		const rowsNumber = rows.indx;

		rowsNumber.pop();

		if (rowsNumber.length === 0) return setSendData(false);

		rowsNumber.map(row => {
			for (const key in data) {
				if (typeof data[key] === "object" && key !== "comments") {
					if (data[key][row] === "") {
						counter++;
					}
				}

				if (counter === 0 || (counter === keys.length - 2 && rowsNumber.length > 1)) {
					counter = 0;

					setSendData(true);
				} else {
					setSendData(false);
				}
			}
		});

		return;
	}

	for (const key in data) {
		if (typeof data[key] === "object") {
			if (data[key][indx] === "" && key !== "comments") return setSendData(false);
		} else {
			setSendData(true);
		}
	}

	return;
}
