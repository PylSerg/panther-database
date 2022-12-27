import { autoCreateNewRow } from "./rows";

// Changes cell
export function changeCell(e, rows, setRows, data, setData) {
	const indx = e.currentTarget.id;
	const column = e.currentTarget.name;
	const value = e.currentTarget.value;

	const newArray = data[`${column}`];

	newArray.splice(indx, 1);
	newArray.splice(indx, 0, value);

	if (column === "quantity" || column === "prices") {
		commaSubstitution(indx, column, value, data, setData);
		calcSum(indx, data);
	}

	autoCreateNewRow(indx, rows, setRows, data);

	setData({ ...data, [`${column}`]: newArray });
}

// Changes prise
export function changePrice(e, data, setData) {
	const indx = e.currentTarget.id;
	const value = e.currentTarget.value;

	const newPrice = Number(value).toFixed(2);

	const newPricesArray = data.prices;

	newPricesArray.splice(indx, 1);
	newPricesArray.splice(indx, 0, newPrice);

	setData({ ...data, prices: newPricesArray });
}

// Comma substitution
function commaSubstitution(indx, column, value, data, setData) {
	const newValue = value.split("");

	if (newValue[newValue.length - 1] === ",") newValue[newValue.length - 1] = ".";
	if (newValue[0] === ".") newValue.unshift(0);

	const newArray = data[`${column}`];

	newArray.splice(indx, 1);
	newArray.splice(indx, 0, newValue.join(""));

	setData({ ...data, [`${column}`]: newArray });
}

// Calc sum
function calcSum(indx, data) {
	const newSumsArray = data.sums;
	let sum = (data.quantity[indx] * data.prices[indx]).toFixed(2);

	if (isNaN(sum)) sum = 0;

	newSumsArray.splice(indx, 1);
	newSumsArray.splice(indx, 0, sum);
}

// Pastes object and stage
export function pasteObjectAndStage(dispatch, e, rows, setRows, data, setData) {
	const indx = e.currentTarget.id;
	const previousObject = data.objects[indx - 1];
	const previousStage = data.stages[indx - 1];

	const newObjectsArray = data.objects;
	const newStagesArray = data.stages;

	if (previousObject === "") return;

	if (data.objects[indx] === undefined) {
		newObjectsArray.push(previousObject);
	} else {
		newObjectsArray.splice(indx, 1);
		newObjectsArray.splice(indx, 0, previousObject);
	}

	if (data.stages[indx] === undefined) {
		newStagesArray.push(previousStage);
	} else {
		newStagesArray.splice(indx, 1);
		newStagesArray.splice(indx, 0, previousStage);
	}

	autoCreateNewRow(indx, rows, setRows, data);

	setData({ ...data, objects: newObjectsArray, stages: newStagesArray });
}
