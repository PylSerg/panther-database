import notification from "./notification";
import formData from "./form-data";
import clearData from "./clear-data";

export async function postRequest(dispatch, url, data, setData, rows, setRows, setReport) {
	await fetch(url, {
		method: "POST",
		body: formData(data, rows),
	})
		.then(response => response.json())
		.then(response => {
			console.log(response);

			if (response.status === 200) {
				clearData(data, setData, setRows);

				notification(dispatch, "Звіт успішно відправлено");

				setReport({ show: false, url: null });
			}
		})
		.catch(error => {
			console.log(`\x1b[31m ${error}`);

			notification(dispatch, error);
		});
}
