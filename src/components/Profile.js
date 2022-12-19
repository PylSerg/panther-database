import { REPORT_MATERIALS_URL } from "../assets/js/urls";

import { useState } from "react";

import Report from "./Report";

export default function Profile() {
	const [report, setReport] = useState({ show: false, url: null });

	function openMaterialsReport() {
		setReport({ show: true, url: REPORT_MATERIALS_URL });
	}

	return (
		<div>
			{!report.show && <button onClick={openMaterialsReport}>Звіт по матеріалам</button>}

			{report.show && <Report url={report.url} setReport={setReport} />}
		</div>
	);
}
