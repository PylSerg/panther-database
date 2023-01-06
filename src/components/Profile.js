import { REPORT_MATERIALS_URL, REPORT_ADVANCES_AND_SALARIES_URL, CURRENT_OBJECTS_LIST_URL, MATERIALS_LIST_URL, ADVANCES_AND_SALARIES_LIST_URL } from "../assets/js/urls";

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

	function openMaterialsReport(type, title, reportUrl, objectsUrl, positionsUrl) {
		setReport({ show: true, type, title, reportUrl, objectsUrl, positionsUrl });
	}

	return (
		<div>
			{!report.show && <button onClick={() => openMaterialsReport("MATERIALS", "Матеріали", REPORT_MATERIALS_URL, CURRENT_OBJECTS_LIST_URL, MATERIALS_LIST_URL)}>Матеріали</button>}

			{!report.show && (
				<button onClick={() => openMaterialsReport("ADVANCES_AND_SALARIES", "Аванси та зарплати", REPORT_ADVANCES_AND_SALARIES_URL, CURRENT_OBJECTS_LIST_URL, ADVANCES_AND_SALARIES_LIST_URL)}>
					Аванси та зарплати
				</button>
			)}

			{!report.show && (
				<button onClick={() => openMaterialsReport("FUEL", "Паливо")} disabled={true}>
					Паливо
				</button>
			)}

			{!report.show && (
				<button onClick={() => openMaterialsReport("CLOSED_OBJECTS", "Закриті обʼєкти")} disabled={true}>
					Закриті обʼєкти
				</button>
			)}

			{!report.show && (
				<button onClick={() => openMaterialsReport("OFFICE", "Офіс")} disabled={true}>
					Офіс
				</button>
			)}

			{report.show && <Report type={report.type} title={report.title} reportUrl={report.reportUrl} objectsUrl={report.objectsUrl} positionsUrl={report.positionsUrl} setReport={setReport} />}
		</div>
	);
}
