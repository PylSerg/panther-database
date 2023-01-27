import xc from "../@x-console/x-console";

// React
import { useState, useEffect } from "react";

// Redux
import { useDispatch } from "react-redux";
import { showNotification } from "../redux/features/notificationSlice";
import { showProgress, hideProgress } from "../redux/features/progressSlice";

// Other
import reportsList from "../assets/data/reports-list";

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

	const dispatch = useDispatch();

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
						reportSum,
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
					reportSum,
				};

			function addReport() {
				const report = reportsData.unconfirmed[i];

				const reportNumber = report.report;
				const reportLabel = report.label;

				const date = report.date.split("T");
				const dateArray = date[0].split("-");
				const dateReport = `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`;

				const time = report.time.split("T");
				const timeArray = time[1].split(":");
				const timeReport = `${timeArray[0]}:${timeArray[1]}`;

				const reportCreated = `${dateReport} - ${timeReport}`;

				let reportType = "";

				reportsList.map(rep => {
					if (rep.type === report.type) return (reportType = rep.title);

					return false;
				});

				unconfirmedReports.push({
					reportNumber,
					reportCreated,
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

		reportsData[`${label.toLowerCase()}`].map(position => {
			if (position.report === number) {
				if (positionsArray.length > 0) {
					positionsArray.push(position);
				} else {
					positionsArray.push(position);
				}

				const newNumber = number.split("-").join("");

				setReportPositions({ ...reportPositions, [`${newNumber}`]: positionsArray });
			}

			return false;
		});

		return;
	}

	// Transforms report number
	function transformationReportNumber(number) {
		const newNumber = number.split("-").join("");

		return newNumber;
	}

	return (
		<div>
			{reports.unconfirmed[0]?.reportNumber && (
				<div>
					<ul>
						{reports.unconfirmed.map(item => {
							return (
								<li
									style={{
										display: "flex",
										flexDirection: "column",
										width: "98%",
										gap: "20px",
										marginBottom: "20px",
										padding: "10px 0",
										borderTop: "2px solid #a55",
										borderBottom: "2px solid #a55",
									}}
									key={item.reportNumber}
								>
									<div
										style={{
											display: "flex",
											flexDirection: "row",
											gap: "20px",
										}}
									>
										<div>
											<button type="button" onClick={() => showReportPositions(item.reportNumber, item.reportLabel)}>
												+
											</button>
										</div>

										<div>
											Звіт <b>{item.reportNumber}</b> від {item.reportCreated}
										</div>

										<div>{item.reportType}</div>

										<div>
											Сума: <b>{item.reportSum} грн</b>
										</div>
									</div>

									{reportPositions[`${transformationReportNumber(item.reportNumber)}`] && (
										<table>
											<tr>
												<th>Обʼєкт</th>
												<th>Етап</th>
												<th>Найменування</th>
												<th>Кількість</th>
												<th>Ціна</th>
												<th>Сума</th>
												<th>Коменар</th>
											</tr>

											{reportPositions[`${transformationReportNumber(item.reportNumber)}`].map(position => (
												<tr key={position.id}>
													<td>{position?.object}</td>
													<td>{position?.stage}</td>
													<td>{position?.position}</td>
													<td>{position?.quantity}</td>
													<td>{position?.price}</td>
													<td>{position?.sum}</td>
													<td>{position?.comment}</td>
												</tr>
											))}
										</table>
									)}
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
}
