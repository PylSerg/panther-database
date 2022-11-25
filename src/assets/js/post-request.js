import { showNotification, hideNotification } from "./notifications";
import formData from "./form-data";
import clearData from "./clear-data";

export async function postRequest(url, data, setData, rows, setRows, setNotification, setReport) {
	await fetch(url, {
		method: "POST",
		body: formData(data, rows),
	})
		.then(response => response.json())
		.then(response => {
			showNotification(setNotification, "Звіт успішно відправлено");
			hideNotification(setNotification);
			setReport({ show: false, url: null });

			console.log(response);
		})
		.then(clearData(data, setData, setRows))
		.catch(error => {
			setNotification({ show: true, message: error });
			hideNotification(setNotification);

			console.log(`\x1b[31m ${error}`);
		});
}
