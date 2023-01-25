/* 
  POST request
*/
function doPost(request) {
	const sheet = SpreadsheetApp.getActiveSheet();
	const lastRow = sheet.getLastRow();

	const { date, time, responsible, positions, quantity, prices, sums, comments, edit, remove } = request.parameter;

	const positionsList = positions.split("|");
	let quantityList = quantity.split("|");
	let pricesList = prices.split("|");
	let sumsList = sums.split("|");
	const commentsList = comments.split("|");

	// Creates new report number
	const lastReportNumber = sheet.getRange(`B${lastRow}`).getValue();

	let reportNumber = "";

	if (lastReportNumber === "report") {
		reportNumber = `O-23-1`;
	} else {
		const lastReportComponents = lastReportNumber.split("-");

		reportNumber = `O-23-${Number(lastReportComponents[2]) + 1}`;
	}

	// Changes dot to comma
	changeDotToComma(quantityList);
	changeDotToComma(pricesList);
	changeDotToComma(sumsList);

	function changeDotToComma(numberList) {
		if (numberList.length > 0) {
			const newNumberList = [];

			for (let i = 0; i < numberList.length; i++) {
				const number = numberList[i].split("");

				for (let j = 0; j < number.length; j++) {
					if (number[j] === ".") {
						number.splice(j, 1);
						number.splice(j, 0, ",");
					}
				}

				newNumberList.push(number.join(""));
			}

			if (numberList === quantityList) quantityList = newNumberList;
			if (numberList === pricesList) pricesList = newNumberList;
			if (numberList === sumsList) sumsList = newNumberList;
		}
	}

	// Creates data
	for (let i = 0; i < quantityList.length; i++) {
		sheet.getRange(`A${lastRow + 1 + i}`).setValue(Date.now());
		sheet.getRange(`B${lastRow + 1 + i}`).setValue(reportNumber);
		sheet.getRange(`C${lastRow + 1 + i}`).setValue(date);
		sheet.getRange(`D${lastRow + 1 + i}`).setValue(time);
		sheet.getRange(`E${lastRow + 1 + i}`).setValue(responsible);
		sheet.getRange(`F${lastRow + 1 + i}`).setValue(positionsList[i]);
		sheet.getRange(`G${lastRow + 1 + i}`).setValue(quantityList[i]);
		sheet.getRange(`H${lastRow + 1 + i}`).setValue(pricesList[i]);
		sheet.getRange(`I${lastRow + 1 + i}`).setValue(sumsList[i]);
		sheet.getRange(`J${lastRow + 1 + i}`).setValue(commentsList[i]);
	}

	const response = { status: 200, action: "Created new report", report: reportNumber, rows: quantityList.length, console: null };

	return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}

/* 
  GET request
*/
function doGet() {
	const sheet = SpreadsheetApp.getActiveSheet();
	const lastRow = sheet.getLastRow();

	let result = { status: 200, data: [] };

	for (let i = 2; i <= lastRow; i++) {
		result.data.push({
			id: sheet.getRange(`A${i}`).getValue(),
			report: sheet.getRange(`B${i}`).getValue(),
			date: sheet.getRange(`C${i}`).getValue(),
			time: sheet.getRange(`D${i}`).getValue(),
			responsible: sheet.getRange(`E${i}`).getValue(),
			position: sheet.getRange(`F${i}`).getValue(),
			quantity: sheet.getRange(`G${i}`).getValue(),
			price: sheet.getRange(`H${i}`).getValue(),
			sum: sheet.getRange(`I${i}`).getValue(),
			comment: sheet.getRange(`J${i}`).getValue(),
			type: "OFFICE",
			label: "UNCONFIRMED",
		});
	}

	return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
