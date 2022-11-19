import React from "react";

import Report from "./Report";

export default function Profile({ responsible }) {
	return (
		<div>
			<Report responsible={responsible} />
		</div>
	);
}
