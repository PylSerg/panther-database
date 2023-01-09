import xc from "../@x-console/x-console";

import { REPORT_MATERIALS_URL, REPORT_ADVANCES_AND_SALARIES_URL, REPORT_FUEL_URL, CURRENT_OBJECTS_LIST_URL, MATERIALS_LIST_URL, ADVANCES_AND_SALARIES_LIST_URL } from "../assets/js/urls";

import { useState } from "react";

import Report from "./Report";

export default function Profile() {
	const [report, setReport] = useState({
		show: false,
		type: null,
		title: null,
		reportUrl: null,
		objectsUrl: null,
		positionsUrl: null,
	});

	// xc.rndb("Profile");

	function openReport(type, title, reportUrl, objectsUrl, positionsUrl) {
		setReport({ show: true, type, title, reportUrl, objectsUrl, positionsUrl });
	}

	return (
		<div>
			{!report.show && (
				<div>
					<button onClick={() => openReport("MATERIALS", "Матеріали", REPORT_MATERIALS_URL, CURRENT_OBJECTS_LIST_URL, MATERIALS_LIST_URL)}>Матеріали</button>

					<button onClick={() => openReport("ADVANCES_AND_SALARIES", "Аванси та зарплати", REPORT_ADVANCES_AND_SALARIES_URL, CURRENT_OBJECTS_LIST_URL, ADVANCES_AND_SALARIES_LIST_URL)}>
						Аванси та зарплати
					</button>

					<button onClick={() => openReport("FUEL", "Паливо", REPORT_FUEL_URL, CURRENT_OBJECTS_LIST_URL)}>Паливо</button>

					<button onClick={() => openReport("CLOSED_OBJECTS", "Закриті обʼєкти")} disabled={true}>
						Закриті обʼєкти
					</button>

					<button onClick={() => openReport("OFFICE", "Офіс")} disabled={true}>
						Офіс
					</button>
				</div>
			)}

			{report.show && <Report type={report.type} title={report.title} reportUrl={report.reportUrl} objectsUrl={report.objectsUrl} positionsUrl={report.positionsUrl} setReport={setReport} />}
		</div>
	);
}
