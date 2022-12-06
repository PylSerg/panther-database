import { useState } from "react";

import Report from "./Report";

export default function Profile({ setNotification, appStyle, setAppStyle }) {
	const [report, setReport] = useState({ show: true, url: null });

	return <div>{report.show && <Report setNotification={setNotification} setReport={setReport} appStyle={appStyle} setAppStyle={setAppStyle} />}</div>;
}
