import {
	REPORT_MATERIALS_URL,
	REPORT_ADVANCES_AND_SALARIES_URL,
	REPORT_FUEL_URL,
	REPORT_FOR_CLOSED_OBJECTS_URL,
	REPORT_OFFICE_URL,
	CURRENT_OBJECTS_LIST_URL,
	CLOSED_OBJECTS_LIST_URL,
	MATERIALS_LIST_URL,
	ADVANCES_AND_SALARIES_LIST_URL,
} from "../assets/js/urls";

import { useState, useEffect } from "react";

import Report from "./Report";

export default function CreateReportBlock({ setProfileNavigationBlock }) {
	const [report, setReport] = useState({
		show: false,
		type: null,
		title: null,
		reportUrl: null,
		objectsUrl: null,
		positionsUrl: null,
	});

	useEffect(() => {
		if (report.show) {
			setProfileNavigationBlock({ show: false });
		} else {
			setProfileNavigationBlock({ show: true });
		}
	}, [report]);

	function openReport(type, title, reportUrl, objectsUrl, positionsUrl) {
		setReport({ show: true, type, title, reportUrl, objectsUrl, positionsUrl });
	}

	return (
		<div>
			{!report.show && (
				<div className="create-report-block">
					<button onClick={() => openReport("MATERIALS", "Матеріали", REPORT_MATERIALS_URL, CURRENT_OBJECTS_LIST_URL, MATERIALS_LIST_URL)}>Матеріали</button>

					<button onClick={() => openReport("ADVANCES_AND_SALARIES", "Аванси та зарплати", REPORT_ADVANCES_AND_SALARIES_URL, CURRENT_OBJECTS_LIST_URL, ADVANCES_AND_SALARIES_LIST_URL)}>
						Аванси та зарплати
					</button>

					<button onClick={() => openReport("FUEL", "Паливо", REPORT_FUEL_URL, CURRENT_OBJECTS_LIST_URL)}>Паливо</button>

					<button onClick={() => openReport("CLOSED_OBJECTS", "Закриті обʼєкти", REPORT_FOR_CLOSED_OBJECTS_URL, CLOSED_OBJECTS_LIST_URL, MATERIALS_LIST_URL)}>Закриті обʼєкти</button>

					<button onClick={() => openReport("OFFICE", "Офіс", REPORT_OFFICE_URL)}>Офіс</button>
				</div>
			)}

			{report.show && <Report type={report.type} title={report.title} reportUrl={report.reportUrl} objectsUrl={report.objectsUrl} positionsUrl={report.positionsUrl} setReport={setReport} />}
		</div>
	);
}
