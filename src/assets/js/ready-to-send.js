import { allowAbilityToSendData, disableAbilityToSendData } from "../../redux/features/abilityToSendDataSlice";

export function readyToSend(dispatch, rows, data) {
	let counter = 0;
	let rowsCounter = 0;

	const keys = Object.keys(data);
	const rowsNumber = rows.indx;

	addCount();
	rowValidation();

	function addCount() {
		rowsCounter = 0;

		rowsNumber.map(row => {
			counter = 0;

			for (const key in data) {
				if (typeof data[key] === "object" && key !== "comments") {
					if (data[key][row] === "") {
						counter++;
					}
				}
			}

			if (data.type !== "OFFICE" && counter > 0 && counter < keys.length - 3) rowsCounter++;
			if (data.type === "OFFICE" && counter - 2 > 0 && counter < keys.length - 3) rowsCounter++;
		});
	}

	function rowValidation() {
		if (counter >= 6 && rowsNumber.length === 1) return dispatch(disableAbilityToSendData());

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
