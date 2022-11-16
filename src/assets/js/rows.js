// Creates new row
export function createNewRow(rows, setRows, data) {
	const newRow = rows.indx;

	newRow.push(rows.indx.length);

	for (const key in data) {
		const newArray = data[key];

		if (typeof newArray === "object") newArray.push("");
	}

	setRows({ indx: newRow });
}

// Deletes row
export function deleteRow(e, data, setData, rows, setRows) {
	const indx = e.currentTarget.id;

	const newRowsArray = [];

	for (let i = 0; i < rows.indx.length - 1; i++) {
		newRowsArray.push(i);
	}

	setRows({ indx: newRowsArray });

	// const newObjectsArray = data.objects;
	// const newStagesArray = data.stages;
	// const newMaterialsArray = data.materials;
	// const newQuantityArray = data.quantity;
	// const newPricesArray = data.prices;
	// const newSumsArray = data.sums;
	// const newCommentsArray = data.comments;

	// newObjectsArray.splice(indx, 1);
	// newStagesArray.splice(indx, 1);
	// newMaterialsArray.splice(indx, 1);
	// newQuantityArray.splice(indx, 1);
	// newPricesArray.splice(indx, 1);
	// newSumsArray.splice(indx, 1);
	// newCommentsArray.splice(indx, 1);

	// setData({
	// 	...data,
	// 	objects: newObjectsArray,
	// 	stages: newStagesArray,
	// 	materials: newMaterialsArray,
	// 	quantity: newQuantityArray,
	// 	prices: newPricesArray,
	// 	sums: newSumsArray,
	// 	comments: newCommentsArray,
	// });
}
