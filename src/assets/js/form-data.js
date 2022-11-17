import { getDate, getTime } from "./date";

export default function formData(data) {
	const formData = new FormData();

	formData.append("date", getDate());
	formData.append("time", getTime());

	for (const key in data) {
		if (typeof data[key] === "object") {
			formData.append(`${key}`, data[`${key}`].join("|"));
		} else {
			formData.append(`${key}`, data[`${key}`]);
		}
	}

	return formData;
}
