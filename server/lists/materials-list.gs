function doGet() {
	const sheet = SpreadsheetApp.getActiveSheet();
	const lastRow = sheet.getLastRow();

	let result = {
		status: 200,
		data: {
			materials: [],
		},
	};

	for (let i = 2; i <= lastRow; i++) {
		result.data.materials.push(sheet.getRange(`A${i}`).getValue());
	}

	return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
