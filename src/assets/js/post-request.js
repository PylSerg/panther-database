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
			console.log(response);

			showNotification(response.status, setNotification, "Звіт успішно відправлено");
			setReport({ show: false, url: null });
			hideNotification(setNotification);
		})
		.then(clearData(data, setData, setRows))
		.catch(error => {
			setNotification({ sended: true, message: error });
			console.log(`\x1b[31m ${error}`);
		});
}
