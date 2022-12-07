import { pointerEventsOFF } from "./pointer-events";

// Opens modal window for delete row
export function openDeleteRowModal(indx, dispatch, setDeleteRowModal) {
	setDeleteRowModal({ show: true, indx });

	pointerEventsOFF(dispatch);
}
