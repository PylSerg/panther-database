import xc from "../@x-console/x-console";

import { REPORT_MATERIALS_URL } from "../assets/data/urls";

import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { showNotification } from "../redux/features/notificationSlice";
import { showProgress, hideProgress } from "../redux/features/progressSlice";

export default function ViewReportsBlock() {
	const [materials, setMaterials] = useState({
		confirmed: [],
		unconfirmed: [],
		returned: [],
	});

	const [materialsReports, setMaterialsReports] = useState({
		confirmed: [],
		unconfirmed: [],
		returned: [],
	});

	console.log(`materials`, materials);
	console.log(`materialsReports`, materialsReports);

	const dispatch = useDispatch();

	// xc.rnd("ViewReportsBlock");

	useEffect(() => {
		getMaterialsReport();
	}, []);

	useEffect(() => {
		const unconfirmedReports = [];

		const previousReport = () => {
			if (unconfirmedReports.length > 0) {
				return unconfirmedReports.length - 1;
			} else {
				return 0;
			}
		};

		let reportSum = 0;

		for (let i = 0; i < materials.unconfirmed.length; i++) {
			if (i === 0) {
				reportSum = materials.unconfirmed[i].sum;

				addReport();
			} else {
				if (materials.unconfirmed[i].report !== materials.unconfirmed[i - 1].report) {
					unconfirmedReports[previousReport()] = { ...unconfirmedReports[previousReport()], reportSum };

					reportSum = materials.unconfirmed[i].sum;

					addReport();
				} else {
					reportSum += materials.unconfirmed[i].sum;
				}
			}

			if (i === materials.unconfirmed.length - 1) unconfirmedReports[previousReport()] = { ...unconfirmedReports[previousReport()], reportSum };

			function addReport() {
				const report = materials.unconfirmed[i];

				unconfirmedReports.push({
					reportNumber: report.report,
					reportDate: report.date,
					reportTime: report.time,
					reportType: report.type,
					reportLabel: report.label,
				});
			}
		}

		setMaterialsReports({ ...materialsReports, unconfirmed: unconfirmedReports });
	}, [materials]);

	async function getMaterialsReport() {
		dispatch(showProgress("Завантаження звітів..."));

		await fetch(REPORT_MATERIALS_URL)
			.then(response => response.json())
			.then(response => {
				setMaterials({ ...materials, unconfirmed: response.data });
				dispatch(hideProgress());
			})
			.catch(error => {
				dispatch(hideProgress());
				dispatch(showNotification(error));

				xc.e(error);
			});
	}

	return (
		<div>
			{materialsReports.unconfirmed[0]?.reportNumber && (
				<div>
					{/* <h1>{materialsReports.unconfirmed[0].reportNumber}</h1> */}

					<ul>
						{materialsReports.unconfirmed.map(item => {
							<li key={item.reportNumber}>
								Report <b>{item.reportNumber}</b>
							</li>;
						})}
					</ul>
				</div>
			)}
		</div>
	);
}
