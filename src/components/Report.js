import xc from "../@x-console/x-console";

import { STAGES_LIST_URL } from "../assets/js/urls";
import { RiCloseFill, RiFileCopy2Line, RiDeleteBin2Line, RiDownloadLine } from "react-icons/ri";

import { useState, useEffect } from "react";
import { createNewRow } from "../assets/js/rows";
import { changeCell, changeQuantity, changePrice, pasteObjectAndStage } from "../assets/js/change-cell";
import { readyToSend } from "../assets/js/ready-to-send";
import { openDeleteRowModal } from "../assets/js/open-delete-row-modal";
import { toTop, toBottom } from "../assets/js/scrolling";
import reportDataValidation from "../assets/js/report-data-validation";
import closeReport from "../assets/js/close-report";

import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "../redux/features/notificationSlice";
import { showProgress, hideProgress } from "../redux/features/progressSlice";
import { disableAbilityToSendData } from "../redux/features/abilityToSendDataSlice";
import { showSubmitReportModal } from "../redux/features/submitReportModalSlice";

import DeleteRowModal from "./DeleteRowModal";
import CloseReportModal from "./CloseReportModal";
import SubmitReportModal from "./SubmitReportModal";

export default function Report({ type, title, reportUrl, objectsUrl, positionsUrl, setReport }) {
	const [closeReportMethod, setCloseReportMethod] = useState("auto");
	const [totalSum, setTotalSum] = useState(0);
	const [rows, setRows] = useState({ indx: [0] });
	const [data, setData] = useState({
		objects: [""],
		stages: [""],
		positions: [""],
		quantity: [""],
		prices: [""],
		sums: [""],
		comments: [""],
		type,
	});

	const [objectsList, setObjectsList] = useState([]);
	const [stagesList, setStagesList] = useState([]);
	const [positionsList, setPositionsList] = useState([]);

	const responsible = useSelector(state => state.responsible.name);
	const deleteRowModal = useSelector(state => state.deleteRowModal);
	const closeReportModal = useSelector(state => state.closeReportModal);
	const abilityToSendData = useSelector(state => state.abilityToSendData.allowSending);
	const submitReportModal = useSelector(state => state.submitReportModal);

	const dispatch = useDispatch();

	// Adds responsible and gets objects, stages and materials
	useEffect(() => {
		setData({ ...data, responsible: responsible });

		dispatch(disableAbilityToSendData());

		if (type !== "OFFICE") {
			getObjects(type);
		}
	}, []);

	// Creates new row if rows quantity is 0
	useEffect(() => {
		if (rows.indx.length === 0) createNewRow(rows, setRows, data);
	}, [rows.indx]);

	// Submit validation
	useEffect(() => {
		readyToSend(dispatch, rows, data);
	});

	// Calcs total sum
	useEffect(() => {
		const sums = data.sums;

		const total = sums.reduce((accum, sum) => {
			const sumArray = sum.split(" ");

			return accum + Number(sumArray.join(""));
		}, 0);

		const totalArray = total.toFixed(2).split("");

		if (totalArray.length > 6) totalArray.splice(totalArray.length - 6, 0, " ");
		if (totalArray.length > 10) totalArray.splice(totalArray.length - 10, 0, " ");
		if (totalArray.length > 14) totalArray.splice(totalArray.length - 14, 0, " ");

		setTotalSum(totalArray.join(""));
	}, [data]);

	// Changes method for closing report
	useEffect(() => {
		if (rows.indx.length === 1 && !abilityToSendData) {
			setCloseReportMethod("auto");
		} else {
			setCloseReportMethod("manual");
		}
	}, [data]);

	//Gets objects list
	async function getObjects() {
		dispatch(showProgress("Завантаження списку об'єктів..."));

		await fetch(objectsUrl)
			.then(response => response.json())
			.then(response => {
				setObjectsList(response.data.objects);

				getStages(type);
			})
			.catch(error => {
				closeReport(dispatch, setReport, "auto");
				dispatch(showNotification(error));
				dispatch(hideProgress());

				xc.e("Request Error!", error);
			});
	}

	// Gets stages list
	async function getStages(type) {
		dispatch(showProgress("Завантаження списку етапів..."));

		await fetch(STAGES_LIST_URL)
			.then(response => response.json())
			.then(response => {
				setStagesList(response.data.stages);

				if (type === "FUEL") {
					dispatch(hideProgress());
				} else {
					getPositions();
				}
			})
			.catch(error => {
				closeReport(dispatch, setReport, "auto");
				dispatch(showNotification(error));
				dispatch(hideProgress());

				xc.e("Request Error!", error);
			});
	}

	// Gets positions list
	async function getPositions() {
		dispatch(showProgress("Завантаження списку найменувань..."));

		await fetch(positionsUrl)
			.then(response => response.json())
			.then(response => {
				setPositionsList(response.data.positions);

				dispatch(hideProgress());
			})
			.catch(error => {
				closeReport(dispatch, setReport, "auto");
				dispatch(showNotification(error));
				dispatch(hideProgress());

				xc.e("Request Error!", error);
			});
	}

	return (
		<div className="report__block">
			{/*
				Report title
			*/}
			<div className="report__title-block">
				<button className="report__close-button" type="button" title="Закрити звіт" onClick={() => closeReport(dispatch, setReport, closeReportMethod)}>
					<RiCloseFill />
				</button>

				<p className="report__title">
					<b>{title}</b>
				</p>

				<button className="report__submit-button" type="button" disabled={!abilityToSendData} onClick={() => dispatch(showSubmitReportModal())}>
					Відправити
				</button>
			</div>

			<p className="report__sum">
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
									№ {row + 1} {data.positions[row] && `- ${data.positions[row]}`}
								</p>

								<div className="report__options-buttons">
									{data.type !== "OFFICE" && (
										<button
											id={row}
											className="report__copy"
											type="button"
											title="Вставити попередій обʼєкт та етап"
											onClick={e => pasteObjectAndStage(e, rows, setRows, data, setData)}
										>
											<RiFileCopy2Line />
										</button>
									)}

									<button id={row} className="report__delete" type="button" title="Видалити запис" onClick={e => openDeleteRowModal(dispatch, e.currentTarget.id)}>
										<RiDeleteBin2Line />
									</button>
								</div>
							</div>

							{/*
								Object
							*/}
							{data.type !== "OFFICE" && (
								<div className="report__entry">
									{row === 0 && <p className="report__header">Обʼєкт</p>}

									<p className="report__label">Обʼєкт</p>

									<input
										className="report__field"
										name="objects"
										id={row}
										value={data.objects[row]}
										list="objectsList"
										autoComplete="off"
										onChange={e => changeCell(e, rows, setRows, data, setData)}
										onBlur={e => reportDataValidation(e, objectsList, data, setData)}
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
							)}

							{/*
								Stage
							*/}
							{data.type !== "OFFICE" && (
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
										onChange={e => changeCell(e, rows, setRows, data, setData)}
										onBlur={e => reportDataValidation(e, stagesList, data, setData)}
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
							)}

							{/*
								Position
							*/}
							<div className="report__entry">
								{row === 0 && <p className="report__header">Найменування</p>}

								<p className="report__label">Найменування</p>

								<input
									className="report__field"
									name="positions"
									id={row}
									value={data.positions[row]}
									list="positionsList"
									autoComplete="off"
									readOnly={data.type === "FUEL"}
									onChange={e => changeCell(e, rows, setRows, data, setData)}
								/>

								<datalist id="positionsList">
									<option value="" key="mtr_null"></option>
									{positionsList &&
										positionsList.map(position => (
											<option value={position} key={position}>
												{position}
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
									onChange={e => changeCell(e, rows, setRows, data, setData)}
									onBlur={e => changeQuantity(e, data, setData)}
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
									onChange={e => changeCell(e, rows, setRows, data, setData)}
									onBlur={e => changePrice(e, data, setData)}
								/>
							</div>

							{/*
								Sum
							*/}
							<div className="report__entry">
								{row === 0 && <p className="report__header">Сума</p>}

								<p className="report__label">Сума</p>

								<input className="report__field" name="sums" id={row} value={data.sums[row]} autoComplete="off" onChange={e => changeCell(e, rows, setRows, data, setData)} readOnly />
							</div>

							{/*
								Comment
							*/}
							<div className="report__entry">
								{row === 0 && <p className="report__header">Коментар</p>}

								<p className="report__label">Коментар</p>

								<input className="report__field" name="comments" id={row} value={data.comments[row]} autoComplete="off" onChange={e => changeCell(e, rows, setRows, data, setData)} />
							</div>
						</li>
					))}
			</ul>

			{/*
				Scrolling to bottom
			*/}
			<button className="report__to-bottom" type="button" title="Перейти на кінець сторінки" onClick={toBottom}>
				<RiDownloadLine className="report__to-bottom-icon" />
			</button>

			{/*
				Scrolling to top
			*/}
			<button className="report__to-top" type="button" title="Перейти на початок сторінки" onClick={toTop}>
				<RiDownloadLine className="report__to-top-icon" />
			</button>

			{/*
				Modal window for deleting row
			*/}
			{deleteRowModal.show && <DeleteRowModal data={data} setData={setData} rows={rows} setRows={setRows} />}

			{/*
				Modal window for closing a report
			*/}
			{closeReportModal.show && <CloseReportModal setReport={setReport} />}

			{/*
				Modal window for submit a report
			*/}
			{submitReportModal.show && <SubmitReportModal reportUrl={reportUrl} data={data} rows={rows} setReport={setReport} />}
		</div>
	);
}
