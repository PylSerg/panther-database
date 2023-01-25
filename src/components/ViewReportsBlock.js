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

	const dispatch = useDispatch();

	// xc.rndc("ViewReportsBlock");
	// xc.l(reportsData.unconfirmed);

	useEffect(() => {
		reportsList.map(report => {
			return getReportsData(report.reportUrl);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		createReportsList();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reportsData]);

	// Get reports data
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

				const date = report.date.split("T");
				const dateArray = date[0].split("-");
				const dateReport = [dateArray[2], dateArray[1], dateArray[0]].join(".");

				const time = report.time.split("T");
				const timeArray = time[1].split(":");
				const timeReport = [timeArray[0], timeArray[1]].join(":");

				unconfirmedReports.push({
					reportNumber: report.report,
					reportDate: dateReport,
					reportTime: timeReport,
					reportType: report.type,
					reportLabel: report.label,
				});
			}
		}

		setReports({
			...reports,
			unconfirmed: unconfirmedReports,
		});
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
										width: "95%",
										gap: "20px",
										marginBottom: "20px",
										padding: "10px 0",
										borderTop: "2px solid #a55",
										borderBottom: "2px solid #a55",
									}}
									key={item.reportNumber}
								>
									<div>
										Звіт <b>{item.reportNumber}</b> від {item.reportDate} {item.reportTime}
									</div>

									<div>{item.reportType}</div>

									<div>
										Сума: <b>{item.reportSum} грн</b>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
}
