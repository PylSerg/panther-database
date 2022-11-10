import { useState } from "react";

export default function Reports() {
	const [rows, setRows] = useState({ indx: [0] });

	const [data, setData] = useState({
		responsible: "Серёга",
		objects: [],
		stages: [],
		materials: [],
		quantity: [],
		prices: [],
		sums: [],
		comments: [],
	});

	const BASE_URL = "https://script.google.com/macros/s/AKfycbw8x4ytMRcrnozptsgMwjbW1iBgJ2jGELixG26Hg_FsnbePDB-mNYZrjIXuNyWcl2MM/exec";

	// Creates new row
	function createNewRow() {
		const newRows = rows.indx;

		newRows.push(rows.indx.length);

		setRows({ indx: newRows });
	}

	// Changes cell
	function changeCell(e) {
		const indx = e.currentTarget.id;
		const column = e.currentTarget.name;
		const value = e.currentTarget.value;

		const newArray = data[`${column}`];

		newArray.splice(indx, 1);
		newArray.splice(indx, 0, value);

		if (column === "prices" || column === "quantity") {
			commaSubstitution(indx, column, value);
			calcSum(indx);

			return;
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
		<div>
			<button type="button" onClick={createNewRow}>
				+
			</button>

			<br />
			<br />

			<ul>
				{rows &&
					rows.indx.map(row => (
						<li key={row}>
							<div>
								<p>Об&rsquo;єкт</p>
								<input name="objects" id={row} type="text" value={data.objects[row]} onChange={changeCell} />
							</div>

							<div>
								<p>Етап</p>
								<input name="stages" id={row} type="text" value={data.stages[row]} onChange={changeCell} />
							</div>

							<div>
								<p>Матеріал</p>
								<input name="materials" id={row} type="text" value={data.materials[row]} onChange={changeCell} />
							</div>

							<div>
								<p>Кількість</p>
								<input name="quantity" id={row} type="text" value={data.quantity[row]} onChange={changeCell} />
							</div>

							<div>
								<p>Ціна</p>
								<input name="prices" id={row} type="text" value={data.prices[row]} onChange={changeCell} onBlur={changePrice} />
							</div>

							<div>
								<p>Сума</p>
								<input name="sums" id={row} type="text" value={data.sums[row]} onChange={changeCell} readOnly />
							</div>

							<div>
								<p>Коментар</p>
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
