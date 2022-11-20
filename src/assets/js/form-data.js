import { getDate, getTime } from "./date";

export default function formData(data, rows) {
	const formData = new FormData();
	const keys = Object.keys(data);
	let newData = { responsible: data.responsible };

	rows.indx.map(row => {
		for (const key in data) {
			const valueArray = [];

			if (typeof data[key] === "object" && key !== "comments") {
				if (data[key][row] !== "") {
					if (newData[key]) {
						const newValueArray = newData[key];

						newValueArray.push(data[key][row]);
						newData = { ...newData, [key]: newValueArray };
					} else {
						valueArray.push(data[key][row]);
						newData = { ...newData, [key]: valueArray };
					}
				}
			}

			if (key === "comments" && data[`${keys[0]}`][row] !== "") {
				if (newData[key]) {
					const newValueArray = newData[key];

					newValueArray.push(data[key][row]);
					newData = { ...newData, [key]: newValueArray };
				} else {
					valueArray.push(data[key][row]);
					newData = { ...newData, [key]: valueArray };
				}
			}
		}
	});

	formData.append("date", getDate());
	formData.append("time", getTime());

	for (const key in newData) {
		const dataArray = newData[`${key}`];

		if (typeof newData[key] === "object") {
			formData.append(`${key}`, dataArray.join("|"));
		} else {
			formData.append(`${key}`, dataArray);
		}
	}

	return formData;
}
