import React from "react";
import { deleteRow } from "../assets/js/rows";

export default function DeleteRowModal({ indx, data, setData, rows, setRows, setSendData, setDeleteRowModal }) {
	function closeDeleteRowModal() {
		setDeleteRowModal({ show: false, indx: null });
	}

	return (
		<div>
			<p>Ви дійсно хочете видалити запис?</p>
			<button type="button" onClick={closeDeleteRowModal}>
				Відміна
			</button>
			<button type="button" onClick={() => deleteRow(indx, data, setData, rows, setRows, setSendData, setDeleteRowModal)}>
				Видалити
			</button>
		</div>
	);
}
