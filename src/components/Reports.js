import { useState } from "react";
import { showNotification, hideNotification } from "../assets/js/notifications";
import { createNewRow, deleteRow } from "../assets/js/rows";
import { changeCell, changePrice, pasteObjectAndStage } from "../assets/js/change-cell";
import formData from "../assets/js/form-data";
import clearData from "../assets/js/clear-data";
import { MATERIALS_URL } from "../assets/js/urls";

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
	console.log(`data`, data);

	// Sends data
	function onSubmit(e) {
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
				.then(clearData(data, setData, setRows))
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
							<button id={row} className="report__copy" type="button" title="Скопіювати попередій об'єкт та етап" onClick={e => pasteObjectAndStage(e, data, setData)}>
								C
							</button>

							<button id={row} className="report__delete" type="button" title="Видалити запис" onClick={e => deleteRow(e, data, setData, rows, setRows)}>
								D
							</button>

							<div>
								{row === 0 && <p className="report__header">Об&rsquo;єкт</p>}

								<p className="report__label">Об&rsquo;єкт</p>

								<input name="objects" id={row} type="text" value={data.objects[row]} onChange={e => changeCell(e, data, setData)} />
							</div>

							<div>
								{row === 0 && <p className="report__header">Етап</p>}

								<p className="report__label">Етап</p>

								<input name="stages" id={row} type="text" value={data.stages[row]} onChange={e => changeCell(e, data, setData)} />
							</div>

							<div>
								{row === 0 && <p className="report__header">Матеріал</p>}

								<p className="report__label">Матеріал</p>

								<input name="materials" id={row} type="text" value={data.materials[row]} onChange={e => changeCell(e, data, setData)} />
							</div>

							<div>
								{row === 0 && <p className="report__header">Кількість</p>}

								<p className="report__label">Кількість</p>

								<input name="quantity" id={row} type="text" value={data.quantity[row]} onChange={e => changeCell(e, data, setData)} />
							</div>

							<div>
								{row === 0 && <p className="report__header">Ціна</p>}

								<p className="report__label">Ціна</p>

								<input name="prices" id={row} type="text" value={data.prices[row]} onChange={e => changeCell(e, data, setData)} onBlur={e => changePrice(e, data, setData)} />
							</div>

							<div>
								{row === 0 && <p className="report__header">Сума</p>}

								<p className="report__label">Сума</p>

								<input name="sums" id={row} type="text" value={data.sums[row]} onChange={e => changeCell(e, data, setData)} readOnly />
							</div>

							<div>
								{row === 0 && <p className="report__header">Коментар</p>}

								<p className="report__label">Коментар</p>

								<input name="comments" id={row} type="text" value={data.comments[row]} onChange={e => changeCell(e, data, setData)} />
							</div>
						</li>
					))}
			</ul>

			<br />
			<br />

			<button id="materials" type="button" onClick={onSubmit}>
				Send
			</button>
		</div>
	);
}
