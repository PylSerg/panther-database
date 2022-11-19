import { readyToSend } from "./ready-to-send";

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
export function deleteRow(e, data, setData, rows, setRows, setSendData) {
	const indx = e.currentTarget.id;

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

	readyToSend(-1, data, setSendData, rows);
}