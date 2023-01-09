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

	if (data.type === "FUEL" && data.positions[indx] === "") {
		const newPositionsArray = data.positions;

		newPositionsArray.splice(indx, 1);
		newPositionsArray.splice(indx, 0, "Паливо");
	}

	autoCreateNewRow(indx, rows, setRows, data);

	setData({ ...data, [`${column}`]: newArray });
}

// Changes quantity
export function changeQuantity(e, data, setData) {
	const indx = e.currentTarget.id;
	const quantityArray = e.currentTarget.value.split(" ");
	const quantity = quantityArray.join("");

	const newQuantitiesArray = data.quantity;

	let newQuantityArray = null;
	let newQuantity = null;

	if (quantity.includes(".")) {
		newQuantityArray = quantity.split(".");

		const firstPartQuantity = newQuantityArray[0].split("");

		if (firstPartQuantity.length > 3) firstPartQuantity.splice(firstPartQuantity.length - 3, 0, " ");
		if (firstPartQuantity.length > 7) firstPartQuantity.splice(firstPartQuantity.length - 7, 0, " ");
		if (firstPartQuantity.length > 11) firstPartQuantity.splice(firstPartQuantity.length - 11, 0, " ");

		newQuantity = `${firstPartQuantity.join("")}.${newQuantityArray[1]}`;
	} else {
		newQuantityArray = quantity.split("");

		if (newQuantityArray.length > 3) newQuantityArray.splice(newQuantityArray.length - 3, 0, " ");
		if (newQuantityArray.length > 7) newQuantityArray.splice(newQuantityArray.length - 7, 0, " ");
		if (newQuantityArray.length > 11) newQuantityArray.splice(newQuantityArray.length - 11, 0, " ");

		newQuantity = newQuantityArray.join("");
	}

	newQuantitiesArray.splice(indx, 1);
	newQuantitiesArray.splice(indx, 0, newQuantity);

	setData({ ...data, quantity: newQuantitiesArray });
}

// Changes prise
export function changePrice(e, data, setData) {
	const indx = e.currentTarget.id;
	const priceArray = e.currentTarget.value.split(" ");
	const price = priceArray.join("");

	const newPrice = Number(price).toFixed(2);
	const newPriceArray = newPrice.split("");

	const newPricesArray = data.prices;

	if (newPriceArray.length > 6) newPriceArray.splice(newPriceArray.length - 6, 0, " ");
	if (newPriceArray.length > 10) newPriceArray.splice(newPriceArray.length - 10, 0, " ");
	if (newPriceArray.length > 14) newPriceArray.splice(newPriceArray.length - 14, 0, " ");

	newPricesArray.splice(indx, 1);
	newPricesArray.splice(indx, 0, newPriceArray.join(""));

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

	const quantityArray = data.quantity[indx].split(" ");
	const priceArray = data.prices[indx].split(" ");

	const quantity = quantityArray.join("");
	const price = priceArray.join("");

	let sum = (quantity * price).toFixed(2);

	let sumArray = sum.split("");

	if (isNaN(sum)) sumArray = 0;

	if (sumArray.length > 6) sumArray.splice(sumArray.length - 6, 0, " ");
	if (sumArray.length > 10) sumArray.splice(sumArray.length - 10, 0, " ");
	if (sumArray.length > 14) sumArray.splice(sumArray.length - 14, 0, " ");

	newSumsArray.splice(indx, 1);
	newSumsArray.splice(indx, 0, sumArray.join(""));
}

// Pastes object and stage
export function pasteObjectAndStage(e, rows, setRows, data, setData) {
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

	if (data.type === "FUEL" && data.positions[indx] === "") {
		const newPositionsArray = data.positions;

		newPositionsArray.splice(indx, 1);
		newPositionsArray.splice(indx, 0, "Паливо");
	}

	autoCreateNewRow(indx, rows, setRows, data);

	setData({ ...data, objects: newObjectsArray, stages: newStagesArray });
}
