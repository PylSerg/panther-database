function doGet() {
	const sheet = SpreadsheetApp.getActiveSheet();
	const lastRow = sheet.getLastRow();

	let result = {
		status: 200,
		data: {
			id: [],
			date: [],
			time: [],
			responsible: [],
			objects: [],
		},
	};

	for (let i = 2; i <= lastRow; i++) {
		result.data.id.push(sheet.getRange(`A${i}`).getValue());
		result.data.date.push(sheet.getRange(`B${i}`).getValue());
		result.data.time.push(sheet.getRange(`C${i}`).getValue());
		result.data.responsible.push(sheet.getRange(`D${i}`).getValue());
		result.data.objects.push(sheet.getRange(`E${i}`).getValue());
	}

	return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
