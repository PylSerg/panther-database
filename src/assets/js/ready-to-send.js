export function readyToSend(indx, rows, data, setSendData) {
	let counter = 0;
	const keys = Object.keys(data);
	const rowsNumber = rows.indx;

	if (indx === -1) {
		rowsNumber.pop();

		if (rowsNumber.length === 0) return setSendData(false);

		rowsNumber.map(row => {
			for (const key in data) {
				if (typeof data[key] === "object" && key !== "comments") {
					if (data[key][row] === "") {
						counter++;
					}
				}

				rowValidation();
			}
		});

		return;
	}

	for (const key in data) {
		if (typeof data[key] === "object") {
			if (data[key][indx] === "" && key !== "comments") counter++;
		}

		rowValidation();
	}

	function rowValidation() {
		if (counter === 0 || (counter === keys.length - 2 && rowsNumber.length > 1)) {
			counter = 0;

			setSendData(true);
		} else {
			setSendData(false);
		}
	}

	return;
}
