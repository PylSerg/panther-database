// Auto creates new row
export function autoCreateNewRow(indx, rows, setRows, data) {
	if (Number(indx) === rows.indx.length - 1) {
		createNewRow(rows, setRows, data);
	}
}

// Creates new row
export function createNewRow(rows, setRows, data) {
	const newRow = rows.indx;

	newRow.push(rows.indx.length);

	for (const key in data) {
		const newArray = data[key];

		if (typeof newArray === "object") newArray.push("");
	}

	setRows({ indx: newRow });
}

// Deletes row
export function deleteRow(indx, data, setData, rows, setRows) {
	const newRowsArray = [];

	for (let i = 0; i < rows.indx.length - 1; i++) {
		newRowsArray.push(i);
	}

	setRows({ indx: newRowsArray });

	for (const key in data) {
		const newArray = data[key];

		if (typeof newArray === "object") {
			newArray.splice(indx, 1);

			setData({ ...data, [key]: newArray });
		}
	}
}
