import { addStyleToAppBlock, deleteStyleFromAppBlock } from "../../redux/features/appStyleSlice";

export function pointerEventsON(dispatch) {
	document.body.style.overflow = "auto";

	dispatch(deleteStyleFromAppBlock("app__block--locked"));
}

export function pointerEventsOFF(dispatch) {
	document.body.style.overflow = "hidden";

	dispatch(addStyleToAppBlock("app__block--locked"));
}
