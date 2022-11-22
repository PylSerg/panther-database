import { notificationState, rowsState, reportState } from "../assets/js/states";
import { REPORT_MATERIALS_URL, OBJECTS_LIST_URL, STAGES_LIST_URL, MATERIALS_LIST_URL } from "../assets/js/urls";
import { RiFileCopy2Line, RiDeleteBin2Line } from "react-icons/ri";

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
					<p className="report__message">{notification.message}</p>
				</div>
			)}

			<ul className="report__table">
				{rows &&
					rows.indx.map(row => (
						<li className="report__row" key={row}>
							<div className="report__options">
								<p className="report__info">
									№ {row + 1} {data.materials[row] && `- ${data.materials[row]}`}
								</p>

								<div className="report__options-buttons">
									<button
										id={row}
										className="report__copy"
										type="button"
										title="Вставити попередій об'єкт та етап"
										onClick={e => pasteObjectAndStage(e, rows, setRows, data, setData, setSendData)}
									>
										<RiFileCopy2Line />
									</button>

									<button
										id={row}
										className="report__delete"
										type="button"
										title="Видалити запис"
										onClick={e => deleteRow(e.currentTarget.id, data, setData, rows, setRows, setSendData)}
									>
										<RiDeleteBin2Line />
									</button>
								</div>
							</div>

							<div className="report__entry">
								{row === 0 && <p className="report__header">Об&rsquo;єкт</p>}

								<p className="report__label">Об&rsquo;єкт</p>

								<input
									className="report__field"
									name="objects"
									id={row}
									value={data.objects[row]}
									list="objectsList"
									autoComplete="off"
									onChange={e => changeCell(e, rows, setRows, data, setData, setSendData)}
								/>

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

							<div className="report__entry">
								{row === 0 && <p className="report__header">Етап</p>}

								<p className="report__label">Етап</p>

								<input
									className="report__field"
									name="stages"
									id={row}
									value={data.stages[row]}
									list="stagesList"
									autoComplete="off"
									onChange={e => changeCell(e, rows, setRows, data, setData, setSendData)}
								/>

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

							<div className="report__entry">
								{row === 0 && <p className="report__header">Найменування</p>}

								<p className="report__label">Найменування</p>

								<input
									className="report__field"
									name="materials"
									id={row}
									value={data.materials[row]}
									list="materialsList"
									autoComplete="off"
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

							<div className="report__entry">
								{row === 0 && <p className="report__header">Кількість</p>}

								<p className="report__label">Кількість</p>

								<input
									className="report__field"
									name="quantity"
									id={row}
									value={data.quantity[row]}
									autoComplete="off"
									onChange={e => changeCell(e, rows, setRows, data, setData, setSendData)}
								/>
							</div>

							<div className="report__entry">
								{row === 0 && <p className="report__header">Ціна</p>}

								<p className="report__label">Ціна</p>

								<input
									className="report__field"
									name="prices"
									id={row}
									value={data.prices[row]}
									autoComplete="off"
									onChange={e => changeCell(e, rows, setRows, data, setData, setSendData)}
									onBlur={e => changePrice(e, data, setData)}
								/>
							</div>

							<div className="report__entry">
								{row === 0 && <p className="report__header">Сума</p>}

								<p className="report__label">Сума</p>

								<input
									className="report__field"
									name="sums"
									id={row}
									value={data.sums[row]}
									autoComplete="off"
									onChange={e => changeCell(e, rows, setRows, data, setData, setSendData)}
									readOnly
								/>
							</div>

							<div className="report__entry">
								{row === 0 && <p className="report__header">Коментар</p>}

								<p className="report__label">Коментар</p>

								<input
									className="report__field"
									name="comments"
									id={row}
									value={data.comments[row]}
									autoComplete="off"
									onChange={e => changeCell(e, rows, setRows, data, setData, setSendData)}
								/>
							</div>
						</li>
					))}
			</ul>

			<button type="button" disabled={!sendData} onClick={() => postRequest(REPORT_MATERIALS_URL, data, setData, rows, setRows, setNotification)}>
				Send
			</button>
		</div>
	);
}
