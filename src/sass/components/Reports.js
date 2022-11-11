import { useState } from "react";

export default function Reports() {
	const [rows, setRows] = useState({ indx: [0] });

	const [data, setData] = useState({
		responsible: "Серёга",
		objects: [""],
		stages: [""],
		materials: [""],
		quantity: [""],
		prices: [""],
		sums: [""],
		comments: [""],
	});

	const BASE_URL = "https://script.google.com/macros/s/AKfycbw8x4ytMRcrnozptsgMwjbW1iBgJ2jGELixG26Hg_FsnbePDB-mNYZrjIXuNyWcl2MM/exec";

	// Creates new row
	function createNewRow() {
		const newRow = rows.indx;

		newRow.push(rows.indx.length);

		const newObjectsArray = data.objects;
		const newStagesArray = data.stages;
		const newMaterialsArray = data.materials;
		const newQuantityArray = data.quantity;
		const newPricesArray = data.prices;
		const newSumsArray = data.sums;
		const newCommentsArray = data.comments;

		newObjectsArray.push("");
		newStagesArray.push("");
		newMaterialsArray.push("");
		newQuantityArray.push("");
		newPricesArray.push("");
		newSumsArray.push("");
		newCommentsArray.push("");

		setRows({ indx: newRow });
	}

	// Paste object and stage
	function pasteObjectAndStage(e) {
		const indx = e.currentTarget.id;
		const previousObject = data.objects[indx - 1];
		const previousStage = data.stages[indx - 1];

		const newObjectsArray = data.objects;
		const newStagesArray = data.stages;

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

		setData({ ...data, objects: newObjectsArray, stages: newStagesArray });
	}

	// Deletes row
	function deleteRow(e) {
		const indx = e.currentTarget.id;

		const newObjectsArray = data.objects;
		const newStagesArray = data.stages;
		const newMaterialsArray = data.materials;
		const newQuantityArray = data.quantity;
		const newPricesArray = data.prices;
		const newSumsArray = data.sums;
		const newCommentsArray = data.comments;

		newObjectsArray.splice(indx, 1);
		newStagesArray.splice(indx, 1);
		newMaterialsArray.splice(indx, 1);
		newQuantityArray.splice(indx, 1);
		newPricesArray.splice(indx, 1);
		newSumsArray.splice(indx, 1);
		newCommentsArray.splice(indx, 1);

		const newRowsArray = [];

		for (let i = 0; i < newObjectsArray.length; i++) {
			newRowsArray.push(i);
		}

		setRows({ indx: newRowsArray });

		setData({
			...data,
			objects: newObjectsArray,
			stages: newStagesArray,
			materials: newMaterialsArray,
			quantity: newQuantityArray,
			prices: newPricesArray,
			sums: newSumsArray,
			comments: newCommentsArray,
		});
	}

	// Changes cell
	function changeCell(e) {
		const indx = e.currentTarget.id;
		const column = e.currentTarget.name;
		const value = e.currentTarget.value;

		const newArray = data[`${column}`];

		newArray.splice(indx, 1);
		newArray.splice(indx, 0, value);

		if (column === "quantity" || column === "prices") {
			commaSubstitution(indx, column, value);
			calcSum(indx);
		}

		setData({ ...data, [`${column}`]: newArray });
	}

	// Comma substitution
	function commaSubstitution(indx, column, value) {
		const newValue = value.split("");

		if (newValue[newValue.length - 1] === ",") newValue[newValue.length - 1] = ".";
		if (newValue[0] === ".") newValue.unshift(0);

		const newArray = data[`${column}`];

		newArray.splice(indx, 1);
		newArray.splice(indx, 0, newValue.join(""));

		setData({ ...data, [`${column}`]: newArray });
	}

	// Changes prise
	function changePrice(e) {
		const indx = e.currentTarget.id;
		const value = e.currentTarget.value;

		const newPrice = Number(value).toFixed(2);

		const newPricesArray = data.prices;

		newPricesArray.splice(indx, 1);
		newPricesArray.splice(indx, 0, newPrice);

		setData({ ...data, prices: newPricesArray });
	}

	// Calc sum
	function calcSum(indx) {
		const newSumsArray = data.sums;
		let sum = (data.quantity[indx] * data.prices[indx]).toFixed(2);

		if (isNaN(sum)) sum = 0;

		newSumsArray.splice(indx, 1);
		newSumsArray.splice(indx, 0, sum);
	}

	// Creates date
	function createDate() {
		const dateNow = new Date();

		const date = dateNow.getDate();
		const month = dateNow.getMonth() + 1;
		const year = dateNow.getFullYear();

		return `${date}.${month}.${year}`;
	}

	// Creates time
	function createTime() {
		const dateNow = new Date();

		let hours = dateNow.getHours();
		let minutes = dateNow.getMinutes();

		if (hours < 10) hours = `0${hours}`;
		if (minutes < 10) minutes = `0${minutes}`;

		return `${hours}:${minutes}`;
	}

	// Sends data
	function onSubmit() {
		const formData = new FormData();

		formData.append("date", createDate());
		formData.append("time", createTime());
		formData.append("responsible", data.responsible);
		formData.append("objects", data.objects.join("|"));
		formData.append("stages", data.stages.join("|"));
		formData.append("materials", data.materials.join("|"));
		formData.append("quantity", data.quantity.join("|"));
		formData.append("prices", data.prices.join("|"));
		formData.append("sums", data.sums.join("|"));
		formData.append("comments", data.comments.join("|"));

		postRequest();

		async function postRequest() {
			await fetch(BASE_URL, {
				method: "POST",
				body: formData,
			})
				.then(response => response.json())
				.then(response => console.log(response))
				.catch(error => console.log(`\x1b[31m ${error}`));
		}
	}

	return (
		<div className="report__block">
			<button type="button" onClick={createNewRow}>
				+
			</button>

			<br />
			<br />

			<ul className="report__table">
				{rows &&
					rows.indx.map(row => (
						<li className="report__row" key={row}>
							<button id={row} className="report__copy" type="button" onClick={pasteObjectAndStage}>
								C
							</button>

							<button id={row} className="report__delete" type="button" onClick={deleteRow}>
								D
							</button>

							<div>
								{row === 0 && <p className="report__header">Об&rsquo;єкт</p>}

								<p className="report__label">Об&rsquo;єкт</p>

								<input name="objects" id={row} type="text" value={data.objects[row]} onChange={changeCell} />
							</div>

							<div>
								{row === 0 && <p className="report__header">Етап</p>}

								<p className="report__label">Етап</p>

								<input name="stages" id={row} type="text" value={data.stages[row]} onChange={changeCell} />
							</div>

							<div>
								{row === 0 && <p className="report__header">Матеріал</p>}

								<p className="report__label">Матеріал</p>

								<input name="materials" id={row} type="text" value={data.materials[row]} onChange={changeCell} />
							</div>

							<div>
								{row === 0 && <p className="report__header">Кількість</p>}

								<p className="report__label">Кількість</p>

								<input name="quantity" id={row} type="text" value={data.quantity[row]} onChange={changeCell} />
							</div>

							<div>
								{row === 0 && <p className="report__header">Ціна</p>}

								<p className="report__label">Ціна</p>

								<input name="prices" id={row} type="text" value={data.prices[row]} onChange={changeCell} onBlur={changePrice} />
							</div>

							<div>
								{row === 0 && <p className="report__header">Сума</p>}

								<p className="report__label">Сума</p>

								<input name="sums" id={row} type="text" value={data.sums[row]} onChange={changeCell} readOnly />
							</div>

							<div>
								{row === 0 && <p className="report__header">Коментар</p>}

								<p className="report__label">Коментар</p>

								<input name="comments" id={row} type="text" value={data.comments[row]} onChange={changeCell} />
							</div>
						</li>
					))}
			</ul>

			<br />
			<br />

			<button type="button" onClick={onSubmit}>
				Send
			</button>
		</div>
	);
}
