import React from "react";
import closeReport from "../assets/js/close-report";
import { pointerEventsON } from "../assets/js/pointer-events";

import { useDispatch } from "react-redux";
import { hideCloseReportModal } from "../redux/features/closeReportModalSlice";

export default function CloseReportModal({ setReport }) {
	const dispatch = useDispatch();

	function closeCloseReportModal() {
		pointerEventsON(dispatch);
		dispatch(hideCloseReportModal());
	}

	function manualClosingReport(setReport) {
		closeReport(dispatch, setReport, "auto");
		pointerEventsON(dispatch);
		dispatch(hideCloseReportModal());
	}

	return (
		<div className="modal__block">
			<p className="modal__text">Звіт не був відправленний!</p>
			<p className="modal__text">Якщо Ви зараз закриєте цей звіт, то всі його дані будуть видалені!</p>

			<div className="modal__buttons">
				<button className="modal__cancel" type="button" onClick={closeCloseReportModal}>
					Відміна
				</button>

				<button className="modal__allow" type="button" onClick={() => manualClosingReport(setReport)}>
					Закриити
				</button>
			</div>
		</div>
	);
}
