import { rowsState, reportState } from "../assets/js/states";
import { REPORT_MATERIALS_URL, OBJECTS_LIST_URL, STAGES_LIST_URL, MATERIALS_LIST_URL } from "../assets/js/urls";
import { RiFileCopy2Line, RiDeleteBin2Line } from "react-icons/ri";

import { useState, useEffect } from "react";
import { createNewRow } from "../assets/js/rows";
import { changeCell, changePrice, pasteObjectAndStage } from "../assets/js/change-cell";
import { postRequest } from "../assets/js/post-request";
import { openDeleteRowModal } from "../assets/js/open-delete-row-modal";
import notification from "../assets/js/notification";

import { useSelector, useDispatch } from "react-redux";

import DeleteRowModal from "./DeleteRowModal";

export default function Report({ setReport }) {
	const [deleteRowModal, setDeleteRowModal] = useState({ show: false, indx: null });
	const [totalSum, setTotalSum] = useState(0);
	const [rows, setRows] = useState(rowsState);
	const [data, setData] = useState(reportState);
	const [sendData, setSendData] = useState(false);
	const [objectsList, setObjectsList] = useState();
	const [stagesList, setStagesList] = useState();
	const [materialsList, setMaterialsList] = useState();

	const responsible = useSelector(state => state.responsible.name);

	const dispatch = useDispatch();

	// Adds responsible and gets objects, stages and materials
	useEffect(() => {
		setData({ ...data, responsible: responsible });

		getObjects();
		getStages();
		getMaterials();
	}, []);

	// Creates new row if rows quantity is 0
	useEffect(() => {
		if (rows.indx.length === 0) createNewRow(rows, setRows, data);
	}, [rows.indx]);

	// Calcs total sum
	useEffect(() => {
		const sums = data.sums;

		const total = sums.reduce((accum, sum) => {
			return accum + Number(sum);
		}, 0);

		setTotalSum(total.toFixed(2));
	}, [data]);

	//Gets objects list
	async function getObjects() {
		await fetch(OBJECTS_LIST_URL)
			.then(response => response.json())
			.then(response => setObjectsList(response.data.objects))
			.catch(error => {
				notification(dispatch, error);

				console.log(`\x1b[31m ${error}`);
			});
	}

	// Gets stages list
	async function getStages() {
		await fetch(STAGES_LIST_URL)
			.then(response => response.json())
			.then(response => setStagesList(response.data.stages))
			.catch(error => {
				notification(dispatch, error);

				console.log(`\x1b[31m ${error}`);
			});
	}

	// Gets materials list
	async function getMaterials() {
		await fetch(MATERIALS_LIST_URL)
			.then(response => response.json())
			.then(response => setMaterialsList(response.data.materials))
			.catch(error => {
				notification(dispatch, error);

				console.log(`\x1b[31m ${error}`);
			});
	}

	return (
		<div className="report__block">
			<p>
				Сума звіту: <b>{totalSum} грн.</b>
			</p>

			{/*
				Report form
			*/}
			<ul className="report__table">
				{rows &&
					rows.indx.map(row => (
						<li className="report__row" key={row}>
							{/*
								Report options
							*/}
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

									<button id={row} className="report__delete" type="button" title="Видалити запис" onClick={e => openDeleteRowModal(e.currentTarget.id, dispatch, setDeleteRowModal)}>
										<RiDeleteBin2Line />
									</button>
								</div>
							</div>

							{/*
								Object
							*/}
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

							{/*
								Stage
							*/}
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

							{/*
								Material
							*/}
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

							{/*
								Quantity
							*/}
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

							{/*
								Price
							*/}
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

							{/*
								Sum
							*/}
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

							{/*
								Comment
							*/}
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

			{/*
				Send button
			*/}
			<button type="button" disabled={!sendData} onClick={() => postRequest(REPORT_MATERIALS_URL, data, setData, rows, setRows, setReport, dispatch)}>
				Send
			</button>

			{/*
				Delete modal window
			*/}
			{deleteRowModal.show && (
				<DeleteRowModal indx={deleteRowModal.indx} data={data} setData={setData} rows={rows} setRows={setRows} setSendData={setSendData} setDeleteRowModal={setDeleteRowModal} />
			)}
		</div>
	);
}
