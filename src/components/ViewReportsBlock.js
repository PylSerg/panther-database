import xc from "../@x-console/x-console";
import { RiCloseCircleLine, RiArrowDropRightLine } from "react-icons/ri";

// React
import { useState, useEffect } from "react";

// Redux
import { useDispatch } from "react-redux";
import { showNotification } from "../redux/features/notificationSlice";
import { showProgress, hideProgress } from "../redux/features/progressSlice";

// Other
import { v4 as uuid } from "uuid";
import reportsList from "../assets/data/reports-list";
import sorting from "../assets/js/sorting";
import Money from "../assets/js/money-formatter";

// Component
export default function ViewReportsBlock() {
	const [reportsData, setReportsData] = useState({
		confirmed: [],
		unconfirmed: [],
		returned: [],
	});

	const [reports, setReports] = useState({
		confirmed: [],
		unconfirmed: [],
		returned: [],
	});

	const [reportPositions, setReportPositions] = useState({});

	const [reportPositionsVisibility, setReportPositionsVisibility] = useState({});

	const [reportTypeVisibility, setReportTypeVisibility] = useState({});

	const [filters, setFilters] = useState([]);

	const dispatch = useDispatch();

	// Creates filters
	useEffect(() => {
		reportsList.map(({ type, title }) => {
			const filtersArray = filters;

			filtersArray.push({
				type,
				title,
				checked: false,
			});

			return setFilters(filtersArray);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Creates a report visibility list by type
	useEffect(() => {
		let visibilityTypes = {};

		reportsList.map(({ type }) => {
			return (visibilityTypes = { ...visibilityTypes, [`${type}`]: true });
		});

		return setReportTypeVisibility(visibilityTypes);
	}, []);

	// Gets data of all reports
	useEffect(() => {
		reportsList.map(report => {
			return getReportsData(report.reportUrl);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Calls createReportsList() when reportsData was changed
	useEffect(() => {
		createReportsList();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reportsData]);

	// Sorts reports
	useEffect(() => {
		const newReportData = reports.unconfirmed;

		setReports({ ...reports, unconfirmed: sorting.reports(newReportData, "DESC") });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reports.unconfirmed]);

	// Gets reports data
	async function getReportsData(url) {
		dispatch(showProgress("Завантаження звітів..."));

		await fetch(url)
			.then(response => response.json())
			.then(response => {
				const newUnconfirmed = reportsData.unconfirmed;

				response.data.map(report => {
					return newUnconfirmed.push(report);
				});

				setReportsData({ ...reportsData, unconfirmed: newUnconfirmed });

				dispatch(hideProgress());
			})
			.catch(error => {
				dispatch(hideProgress());
				dispatch(showNotification(error));

				xc.e(error);
			});
	}

	// Creates reports list
	function createReportsList() {
		const unconfirmedReports = [];

		const previousReport = () => {
			if (unconfirmedReports.length > 0) {
				return unconfirmedReports.length - 1;
			} else {
				return 0;
			}
		};

		let reportSum = 0;

		for (let i = 0; i < reportsData.unconfirmed.length; i++) {
			if (i === 0) {
				reportSum = reportsData.unconfirmed[i].sum;

				addReport();
			} else {
				if (reportsData.unconfirmed[i].report !== reportsData.unconfirmed[i - 1].report) {
					unconfirmedReports[previousReport()] = {
						...unconfirmedReports[previousReport()],
						reportSum: Money.toString(reportSum),
					};

					reportSum = reportsData.unconfirmed[i].sum;

					addReport();
				} else {
					reportSum += reportsData.unconfirmed[i].sum;
				}
			}

			if (i === reportsData.unconfirmed.length - 1)
				unconfirmedReports[previousReport()] = {
					...unconfirmedReports[previousReport()],
					reportSum: Money.toString(reportSum),
				};

			function addReport() {
				const report = reportsData.unconfirmed[i];

				const reportNumber = report.report;
				const reportLabel = report.label;
				const reportType = report.type;

				const reportCreated = `${report.date} - ${report.time}`;

				let reportTitle = "";

				reportsList.map(rep => {
					if (rep.type === report.type) return (reportTitle = rep.title);

					return false;
				});

				unconfirmedReports.push({
					reportNumber,
					reportCreated,
					reportTitle,
					reportType,
					reportLabel,
				});
			}
		}

		setReports({
			...reports,
			unconfirmed: unconfirmedReports,
		});
	}

	// Shows report positions
	function showReportPositions(number, label) {
		const positionsArray = [];

		const shortNumber = transformationReportNumber(number);

		if (reportPositionsVisibility[`${shortNumber}`]?.visibility) {
			setReportPositionsVisibility({ ...reportPositionsVisibility, [`${shortNumber}`]: { visibility: false } });

			return;
		}

		reportsData[`${label.toLowerCase()}`].map(position => {
			if (position.report === number) {
				let newPosition = position;

				newPosition = {
					...newPosition,
					price: Money.toString(position.price),
					sum: Money.toString(position.sum),
				};

				positionsArray.push(newPosition);

				setReportPositions({ ...reportPositions, [`${shortNumber}`]: positionsArray });
			}

			return false;
		});

		if (positionsArray.length > 1) {
			setReportPositions({ ...reportPositions, [`${shortNumber}`]: sorting.positions(positionsArray, "ASC") });
		}

		setReportPositionsVisibility({ ...reportPositionsVisibility, [`${shortNumber}`]: { visibility: true } });

		return;
	}

	// Transforms report number
	function transformationReportNumber(number) {
		const newNumber = number.split("-").join("");

		return newNumber;
	}

	// Changes filter
	function changeFilter(type) {
		const changedFilters = filters;

		for (let i = 0; i < changedFilters.length; i++) {
			if (changedFilters[i].type === type) {
				changedFilters.splice(i, 0, { ...filters[i], checked: !filters[i].checked });
				changedFilters.splice(i + 1, 1);
			}
		}

		setFilters(changedFilters);

		changeReportTypeVisibility(type);
	}

	// Changes report type visibility
	function changeReportTypeVisibility(type) {
		let visibilityList = reportTypeVisibility;

		let showedAllTypes = true;
		let checkedFilters = 0;

		for (const key in reportTypeVisibility) {
			if (!reportTypeVisibility[`${key}`]) showedAllTypes = false;
		}

		for (let i = 0; i < filters.length; i++) {
			if (filters[i].checked) checkedFilters++;
		}

		if (showedAllTypes && checkedFilters === 1) {
			for (const key in reportTypeVisibility) {
				visibilityList = { ...visibilityList, [`${key}`]: false };
			}

			changeTypesVisibility();
		}

		if (!showedAllTypes && checkedFilters > 0) changeTypesVisibility();
		if (showedAllTypes && checkedFilters > 1) changeTypesVisibility();

		if (!showedAllTypes && checkedFilters === 0) {
			for (const key in reportTypeVisibility) {
				visibilityList = { ...visibilityList, [`${key}`]: true };
			}
		}

		function changeTypesVisibility() {
			for (const key in visibilityList) {
				if (key === type) visibilityList = { ...visibilityList, [`${key}`]: !visibilityList[`${key}`] };
			}
		}

		setReportTypeVisibility(visibilityList);
	}

	// Clears all filters
	function clearAllFilters() {
		const changedFilters = filters;
		let visibilityList = reportTypeVisibility;

		for (let i = 0; i < changedFilters.length; i++) {
			changedFilters.splice(i, 0, { ...filters[i], checked: false });
			changedFilters.splice(i + 1, 1);
		}

		for (const key in reportTypeVisibility) {
			visibilityList = { ...visibilityList, [`${key}`]: true };
		}

		setFilters(changedFilters);
		setReportTypeVisibility(visibilityList);
	}

	return (
		<div style={{ width: "100%" }}>
			{/*
			 *	Filters
			 */}
			<div className="filters">
				<ul className="filters__block">
					<li title="Скасувати фільтри" onClick={clearAllFilters}>
						<RiCloseCircleLine className="filters__clear" />
					</li>

					{filters &&
						filters.map(filter => {
							return (
								<li className="filters__filter" key={uuid()}>
									<input id={filter.type} type="checkbox" defaultChecked={filter.checked} onChange={() => changeFilter(filter.type)} />
									<label htmlFor={filter.type}>{filter.title}</label>
								</li>
							);
						})}
				</ul>
			</div>

			{/*
			 *	Report
			 */}
			{reports.unconfirmed[0]?.reportNumber && (
				<ul className="view-reports__list">
					{reports.unconfirmed.map(item => {
						return (
							<div key={uuid()}>
								{reportTypeVisibility[`${item.reportType}`] && (
									<li className="view-reports__report" data-report-label={item.reportLabel}>
										<div className="view-reports__header" onClick={() => showReportPositions(item.reportNumber, item.reportLabel)}>
											<div className="view-reports__indicator">
												<RiArrowDropRightLine
													className="view-reports__indicator-icon"
													style={{
														transform: reportPositionsVisibility[`${transformationReportNumber(item.reportNumber)}`]?.visibility ? "rotateZ(90deg)" : "rotateZ(0deg)",
													}}
												/>
											</div>

											<div className="view-report__info">
												<div className="view-report__info-report">
													<div>
														<div>Звіт</div>

														<div className="view-report__info-number">
															<b>{item.reportNumber}</b>
														</div>
													</div>

													<div>{item.reportCreated}</div>
												</div>

												<div className="view-report__info-type">{item.reportTitle}</div>

												<div className="view-report__sum">
													Сума: <b>{item.reportSum} грн</b>
												</div>
											</div>
										</div>

										{/*
										 *	Report details
										 */}
										{reportPositionsVisibility[`${transformationReportNumber(item.reportNumber)}`]?.visibility && (
											<div className="report-table__block">
												<table className="report-table">
													<thead>
														<tr>
															<td>Обʼєкт</td>
															<td>Етап</td>
															<td>Найменування</td>
															<td>Кількість</td>
															<td>Ціна</td>
															<td>Сума</td>
															<td>Коменар</td>
														</tr>
													</thead>

													<tbody>
														{reportPositions[`${transformationReportNumber(item.reportNumber)}`].map(position => (
															<tr key={uuid()}>
																<td className="report-table__object">{position?.object}</td>
																<td className="report-table__stage">{position?.stage}</td>
																<td className="report-table__position">{position?.position}</td>
																<td className="report-table__quantity">{position?.quantity}</td>
																<td className="report-table__price">{position?.price}</td>
																<td className="report-table__sum">{position?.sum}</td>
																<td className="report-table__comment">{position?.comment}</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
										)}
									</li>
								)}
							</div>
						);
					})}
				</ul>
			)}
		</div>
	);
}
