import notification from "./notification";
import formData from "./form-data";
import closeReport from "./close-report";

export async function postRequest(dispatch, reportUrl, data, rows, setReport) {
	await fetch(reportUrl, {
		method: "POST",
		body: formData(data, rows),
	})
		.then(response => response.json())
		.then(response => {
			console.log(response);

			if (response.status === 200) {
				notification(dispatch, "Звіт успішно відправлено");

				closeReport(setReport, "auto");
			}
		})
		.catch(error => {
			console.log(`\x1b[31m ${error}`);

			notification(dispatch, error);
		});
}
