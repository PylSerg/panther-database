import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { hideDeleteRowModal } from "../redux/features/deleteRowModalSlice";
import { pointerEventsON } from "../assets/js/pointer-events";
import { deleteRow } from "../assets/js/rows";

export default function DeleteRowModal({ data, setData, rows, setRows }) {
	const indx = useSelector(state => state.deleteRowModal.indx);

	const dispatch = useDispatch();

	function closeDeleteRowModal() {
		pointerEventsON(dispatch);
		dispatch(hideDeleteRowModal());
	}

	function handelDeleteRow() {
		closeDeleteRowModal();
		deleteRow(indx, data, setData, rows, setRows);
	}

	return (
		<div className="modal__block">
			<p className="modal__text">Ви дійсно хочете видалити запис?</p>

			<div className="modal__buttons">
				<button className="modal__cancel" type="button" onClick={closeDeleteRowModal}>
					Відміна
				</button>

				<button className="modal__allow" type="button" onClick={handelDeleteRow}>
					Видалити
				</button>
			</div>
		</div>
	);
}
