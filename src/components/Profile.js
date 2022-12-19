import { REPORT_MATERIALS_URL, CURRENT_OBJECTS_LIST_URL, MATERIALS_LIST_URL } from "../assets/js/urls";

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

	const titlesList = ["Звіт з матеріалів"];

	function openMaterialsReport() {
		setReport({
			show: true,
			type: "materialsAndSalaries",
			title: titlesList[0],
			reportUrl: REPORT_MATERIALS_URL,
			objectsUrl: CURRENT_OBJECTS_LIST_URL,
			positionsUrl: MATERIALS_LIST_URL,
		});
	}

	return (
		<div>
			{!report.show && <button onClick={openMaterialsReport}>{titlesList[0]}</button>}

			{report.show && <Report type={report.type} title={report.title} reportUrl={report.reportUrl} objectsUrl={report.objectsUrl} positionsUrl={report.positionsUrl} setReport={setReport} />}
		</div>
	);
}
