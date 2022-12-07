import { useState } from "react";

import Report from "./Report";

export default function Profile() {
	const [report, setReport] = useState({ show: true, url: null });

	return <div>{report.show && <Report setReport={setReport} />}</div>;
}
