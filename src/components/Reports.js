import { useState } from "react";
import { showNotification, hideNotification } from "../assets/js/notifications";
import { createNewRow, deleteRow } from "../assets/js/rows";
import { MATERIALS_URL } from "../assets/js/urls";
import formData from "../assets/js/form-data";

export default function Reports() {
	const [notification, setNotification] = useState({ show: false, message: "" });
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
	console.log(`data =>`, data);

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

	// Clears data
	function clearData() {
		setRows({ indx: [0] });
		setData({
			responsible: "Серёга",
			objects: [""],
			stages: [""],
			materials: [""],
			quantity: [""],
			prices: [""],
			sums: [""],
			comments: [""],
		});
	}

	// Sends data
	function onSubmit() {
		postRequest();

		async function postRequest() {
			await fetch(MATERIALS_URL, {
				method: "POST",
				body: formData(data),
			})
				.then(response => response.json())
				.then(response => {
					console.log(response);

					showNotification(response.status, setNotification, "Звіт успішно відправлено");
					hideNotification(setNotification);
				})
				.then(clearData())
				.catch(error => {
					setNotification({ sended: true, message: error });
					console.log(`\x1b[31m ${error}`);
				});
		}
	}

	return (
		<div className="report__block">
			{notification.show && (
				<div className="report__status">
					<p>{notification.message}</p>
				</div>
			)}

			<button type="button" title="Додати запис" onClick={() => createNewRow(rows, setRows, data)}>
				+
			</button>

			<br />
			<br />

			<ul className="report__table">
				{rows &&
					rows.indx.map(row => (
						<li className="report__row" key={row}>
							<button id={row} className="report__copy" type="button" title="Скопіювати попередій об'єкт та етап" onClick={pasteObjectAndStage}>
								C
							</button>

							<button id={row} className="report__delete" type="button" title="Видалити запис" onClick={e => deleteRow(e, data, setData, rows, setRows)}>
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
