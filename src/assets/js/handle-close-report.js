export default function handleCloseReport(setReport) {
	setReport({
		show: false,
		type: null,
		title: null,
		reportUrl: null,
		objectsUrl: null,
		positionsUrl: null,
	});
}
