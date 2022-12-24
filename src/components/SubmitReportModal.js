import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { hideSubmitReportModal } from "../redux/features/submitReportModalSlice";

import { pointerEventsON, pointerEventsOFF } from "../assets/js/pointer-events";
import { postRequest } from "../assets/js/post-request";

export default function SubmitReportModal({ reportUrl, data, rows, setReport }) {
	const dispatch = useDispatch();

	useEffect(() => {
		console.log("useEffect running...");

		pointerEventsOFF(dispatch);
	}, [dispatch]);

	function closeSubmitReportModal() {
		pointerEventsON(dispatch);
		pointerEventsON(dispatch);
		dispatch(hideSubmitReportModal());
	}

	function submitReport() {
		postRequest(dispatch, reportUrl, data, rows, setReport);
		pointerEventsON(dispatch);
		dispatch(hideSubmitReportModal());
	}

	return (
		<div className="modal__block">
			<p className="modal__text">Відправити звіт?</p>

			<div className="modal__buttons">
				<button className="modal__cancel" type="button" onClick={closeSubmitReportModal}>
					Відміна
				</button>

				<button className="modal__accept" type="button" onClick={submitReport}>
					Відправити
				</button>
			</div>
		</div>
	);
}
