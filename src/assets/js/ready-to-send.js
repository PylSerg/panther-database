export function readyToSend(indx, rows, data, setSendData) {
	let counter = 0;
	let rowsCounter = 0;

	const keys = Object.keys(data);
	const rowsNumber = rows.indx;

	if (indx === -1) {
		rowsNumber.pop();

		if (rowsNumber.length === 0) return setSendData(false);

		addCount();

		return;
	}

	addCount();

	function addCount() {
		rowsNumber.map(row => {
			for (const key in data) {
				if (typeof data[key] === "object" && key !== "comments") {
					if (data[key][row] === "") {
						counter++;
					}
				}
			}

			if (counter > 0 && counter !== keys.length - 2) rowsCounter++;

			rowValidation();
		});
	}

	function rowValidation() {
		if (rowsCounter === 0) {
			counter = 0;
			rowsCounter = 0;

			setSendData(true);
		} else {
			setSendData(false);
		}
	}

	return;
}
