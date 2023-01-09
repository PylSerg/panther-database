import { allowAbilityToSendData, disableAbilityToSendData } from "../../redux/features/abilityToSendDataSlice";

export function readyToSend(dispatch, rows, data) {
	let counter = 0;
	let rowsCounter = 0;

	const keys = Object.keys(data);
	const rowsNumber = rows.indx;

	addCount();
	rowValidation();

	function addCount() {
		rowsNumber.map(row => {
			for (const key in data) {
				if (typeof data[key] === "object" && key !== "comments") {
					if (data[key][row] === "") {
						counter++;
					}
				}
			}

			if (counter > 0 && counter !== keys.length - 3) rowsCounter++;
		});
	}

	function rowValidation() {
		if (counter === 6 && rowsNumber.length === 1) return dispatch(disableAbilityToSendData());

		if (rowsCounter === 0) {
			counter = 0;
			rowsCounter = 0;

			dispatch(allowAbilityToSendData());
		} else {
			dispatch(disableAbilityToSendData());
		}
	}

	return;
}
