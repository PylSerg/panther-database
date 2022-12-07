import React from "react";
import { useDispatch } from "react-redux";

import { hideDeleteRowModal } from "../redux/features/deleteRowModalSlice";
import { pointerEventsON } from "../assets/js/pointer-events";
import { deleteRow } from "../assets/js/rows";

export default function DeleteRowModal({ indx, data, setData, rows, setRows, setSendData }) {
	const dispatch = useDispatch();

	function closeDeleteRowModal() {
		pointerEventsON(dispatch);
		dispatch(hideDeleteRowModal());
	}

	function handelDeleteRow() {
		closeDeleteRowModal();
		deleteRow(indx, data, setData, rows, setRows, setSendData);
	}

	return (
		<div className="delete__block">
			<p className="delete__text">Ви дійсно хочете видалити запис?</p>

			<div className="delete__buttons">
				<button className="delete__cancel" type="button" onClick={closeDeleteRowModal}>
					Відміна
				</button>

				<button className="delete__delete" type="button" onClick={handelDeleteRow}>
					Видалити
				</button>
			</div>
		</div>
	);
}
