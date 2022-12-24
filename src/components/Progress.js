import React from "react";
import { useSelector } from "react-redux";

import progressAnimation from "../assets/gif/progress.gif";

export default function Progress() {
	const progress = useSelector(state => state.progress);

	return (
		<div>
			{progress.show && (
				<div>
					<img src={progressAnimation} alt="Progress" />
					<p>{progress.message}</p>
				</div>
			)}
		</div>
	);
}
