import reportsList from "../assets/data/reports-list";

import { useState, useEffect } from "react";

import Report from "./Report";

export default function CreateReportBlock({ setProfileNavigationBlock }) {
	const [report, setReport] = useState({
		show: false,
		type: null,
		title: null,
		reportUrl: null,
		objectsUrl: null,
		stagesUrl: null,
		positionsUrl: null,
	});

	useEffect(() => {
		if (report.show) {
			setProfileNavigationBlock({ show: false });
		} else {
			setProfileNavigationBlock({ show: true });
		}
	}, [report]);

	function openReport({ type, title, reportUrl, objectsUrl, stagesUrl, positionsUrl }) {
		setReport({ show: true, type, title, reportUrl, objectsUrl, stagesUrl, positionsUrl });
	}

	return (
		<div>
			{!report.show && (
				<div className="create-report-block">
					{reportsList.map(reportType => (
						<button type="button" key={reportType.type} onClick={() => openReport(reportType)}>
							{reportType.title}
						</button>
					))}
				</div>
			)}

			{report.show && (
				<Report
					type={report.type}
					title={report.title}
					reportUrl={report.reportUrl}
					objectsUrl={report.objectsUrl}
					stagesUrl={report.stagesUrl}
					positionsUrl={report.positionsUrl}
					setReport={setReport}
				/>
			)}
		</div>
	);
}
