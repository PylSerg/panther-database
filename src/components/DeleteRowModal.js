import React from "react";
import { pointerEventsON } from "../assets/js/pointer-events";
import { deleteRow } from "../assets/js/rows";

export default function DeleteRowModal({ indx, data, setData, rows, setRows, setSendData, setDeleteRowModal, appStyle, setAppStyle }) {
	function closeDeleteRowModal() {
		pointerEventsON(appStyle, setAppStyle);
		setDeleteRowModal({ show: false, indx: null });
	}

	return (
		<div className="delete__block">
			<p className="delete__text">Ви дійсно хочете видалити запис?</p>

			<div className="delete__buttons">
				<button className="delete__cancel" type="button" onClick={closeDeleteRowModal}>
					Відміна
				</button>

				<button className="delete__delete" type="button" onClick={() => deleteRow(indx, data, setData, rows, setRows, setSendData, setDeleteRowModal, appStyle, setAppStyle)}>
					Видалити
				</button>
			</div>
		</div>
	);
}
