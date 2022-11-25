import { useState } from "react";

import Report from "./Report";

export default function Profile({ responsible, setNotification }) {
	const [report, setReport] = useState({ show: true, url: null });

	return <div>{report.show && <Report responsible={responsible} setNotification={setNotification} setReport={setReport} />}</div>;
}
