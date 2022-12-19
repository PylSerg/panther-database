import { REPORT_MATERIALS_URL, CURRENT_OBJECTS_LIST_URL, MATERIALS_LIST_URL } from "../assets/js/urls";

import { useState } from "react";

import Report from "./Report";

export default function Profile() {
	const [report, setReport] = useState({
		show: false,
		type: null,
		reportUrl: null,
		objectsUrl: null,
		positionsUrl: null,
	});

	function openMaterialsReport() {
		setReport({
			show: true,
			type: "materialsAndSalaries",
			reportUrl: REPORT_MATERIALS_URL,
			objectsUrl: CURRENT_OBJECTS_LIST_URL,
			positionsUrl: MATERIALS_LIST_URL,
		});
	}

	return (
		<div>
			{!report.show && <button onClick={openMaterialsReport}>Звіт по матеріалам</button>}

			{report.show && <Report type={report.type} reportUrl={report.reportUrl} objectsUrl={report.objectsUrl} positionsUrl={report.positionsUrl} setReport={setReport} />}
		</div>
	);
}
