export default function closeReport(setReport, method) {
	/* Method can be only "auto" or "manual" */

	setReport({
		show: false,
		type: null,
		title: null,
		reportUrl: null,
		objectsUrl: null,
		positionsUrl: null,
	});
}
