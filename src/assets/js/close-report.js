import { pointerEventsOFF } from "./pointer-events";
import { showCloseReportModal } from "../../redux/features/closeReportModalSlice";

export default function closeReport(dispatch, setReport, method) {
	/* Method can be only "auto" or "manual" */

	if (method === "auto") {
		setReport({
			show: false,
			type: null,
			title: null,
			reportUrl: null,
			objectsUrl: null,
			positionsUrl: null,
		});

		return;
	}

	if (method === "manual") {
		pointerEventsOFF(dispatch);
		dispatch(showCloseReportModal());

		return;
	}
}
