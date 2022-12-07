import { showDeleteRowModal } from "../../redux/features/deleteRowModalSlice";
import { pointerEventsOFF } from "./pointer-events";

// Opens modal window for delete row
export function openDeleteRowModal(dispatch, indx) {
	dispatch(showDeleteRowModal(indx));
	pointerEventsOFF(dispatch);
}
