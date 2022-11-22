import { notificationState, rowsState, reportState } from "../assets/js/states";
import { REPORT_MATERIALS_URL, OBJECTS_LIST_URL, STAGES_LIST_URL, MATERIALS_LIST_URL } from "../assets/js/urls";

import { useState, useEffect } from "react";
import { deleteRow } from "../assets/js/rows";
import { changeCell, changePrice, pasteObjectAndStage } from "../assets/js/change-cell";
import { postRequest } from "../assets/js/post-request";

export default function Report({ responsible }) {
	const [notification, setNotification] = useState(notificationState);
	const [rows, setRows] = useState(rowsState);
	const [data, setData] = useState(reportState);
	const [sendData, setSendData] = useState(false);
	const [objectsList, setObjectsList] = useState();
	const [stagesList, setStagesList] = useState();
	const [materialsList, setMaterialsList] = useState();

	useEffect(() => {
		setData({ ...data, responsible: responsible.name });

		getObjects();
		getStages();
		getMaterials();
	}, []);

	async function getObjects() {
		await fetch(OBJECTS_LIST_URL)
			.then(response => response.json())
			.then(response => setObjectsList(response.data.objects))
			.catch(error => {
				setNotification({ sended: true, message: error });
				console.log(`\x1b[31m ${error}`);
			});
	}

	async function getStages() {
		await fetch(STAGES_LIST_URL)
			.then(response => response.json())
			.then(response => setStagesList(response.data.stages))
			.catch(error => {
				setNotification({ sended: true, message: error });
				console.log(`\x1b[31m ${error}`);
			});
	}

	async function getMaterials() {
		await fetch(MATERIALS_LIST_URL)
			.then(response => response.json())
			.then(response => setMaterialsList(response.data.materials))
			.catch(error => {
				setNotification({ sended: true, message: error });
				console.log(`\x1b[31m ${error}`);
			});
	}

	return (
		<div className="report__block">
			{notification.show && (
				<div className="report__status">
					<p>{notification.message}</p>
				</div>
			)}

			<br />
			<br />

			<ul className="report__table">
				{rows &&
					rows.indx.map(row => (
						<li className="report__row" key={row}>
							<button
								id={row}
								className="report__copy"
								type="button"
								title="Вставити попередій об'єкт та етап"
								onClick={e => pasteObjectAndStage(e, rows, setRows, data, setData, setSendData)}
							>
								P
							</button>

							<button id={row} className="report__delete" type="button" title="Видалити запис" onClick={e => deleteRow(e.currentTarget.id, data, setData, rows, setRows, setSendData)}>
								D
							</button>

							<div>
								{row === 0 && <p className="report__header">Об&rsquo;єкт</p>}

								<p className="report__label">Об&rsquo;єкт</p>

								<input name="objects" id={row} value={data.objects[row]} list="objectsList" onChange={e => changeCell(e, rows, setRows, data, setData, setSendData)} />

								<datalist id="objectsList">
									<option value="" key="obj_null"></option>
									{objectsList &&
										objectsList.map(object => (
											<option value={object} key={object}>
												{object}
											</option>
										))}
								</datalist>
							</div>

							<div>
								{row === 0 && <p className="report__header">Етап</p>}

								<p className="report__label">Етап</p>

								<input name="stages" id={row} value={data.stages[row]} list="stagesList" onChange={e => changeCell(e, rows, setRows, data, setData, setSendData)} />

								<datalist id="stagesList">
									<option value="" key="stg_null"></option>
									{stagesList &&
										stagesList.map(stage => (
											<option value={stage} key={stage}>
												{stage}
											</option>
										))}
								</datalist>
							</div>

							<div>
								{row === 0 && <p className="report__header">Найменуання</p>}

								<p className="report__label">Найменуання</p>

								<input
									name="materials"
									id={row}
									type="text"
									value={data.materials[row]}
									list="materialsList"
									onChange={e => changeCell(e, rows, setRows, data, setData, setSendData)}
								/>

								<datalist id="materialsList">
									<option value="" key="mtr_null"></option>
									{materialsList &&
										materialsList.map(material => (
											<option value={material} key={material}>
												{material}
											</option>
										))}
								</datalist>
							</div>

							<div>
								{row === 0 && <p className="report__header">Кількість</p>}

								<p className="report__label">Кількість</p>

								<input name="quantity" id={row} type="text" value={data.quantity[row]} onChange={e => changeCell(e, rows, setRows, data, setData, setSendData)} />
							</div>

							<div>
								{row === 0 && <p className="report__header">Ціна</p>}

								<p className="report__label">Ціна</p>

								<input
									name="prices"
									id={row}
									type="text"
									value={data.prices[row]}
									onChange={e => changeCell(e, rows, setRows, data, setData, setSendData)}
									onBlur={e => changePrice(e, data, setData)}
								/>
							</div>

							<div>
								{row === 0 && <p className="report__header">Сума</p>}

								<p className="report__label">Сума</p>

								<input name="sums" id={row} type="text" value={data.sums[row]} onChange={e => changeCell(e, rows, setRows, data, setData, setSendData)} readOnly />
							</div>

							<div>
								{row === 0 && <p className="report__header">Коментар</p>}

								<p className="report__label">Коментар</p>

								<input name="comments" id={row} type="text" value={data.comments[row]} onChange={e => changeCell(e, rows, setRows, data, setData, setSendData)} />
							</div>
						</li>
					))}
			</ul>

			<br />
			<br />

			<button type="button" disabled={!sendData} onClick={() => postRequest(REPORT_MATERIALS_URL, data, setData, rows, setRows, setNotification)}>
				Send
			</button>
		</div>
	);
}
