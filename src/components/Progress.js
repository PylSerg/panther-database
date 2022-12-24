import React from "react";
import { useSelector } from "react-redux";

import progressAnimation from "../assets/gif/progress.gif";

export default function Progress() {
	const progress = useSelector(state => state.progress);

	return (
		<div>
			{progress.show && (
				<div className="progress__block">
					<div className="progress__main">
						<img className="progress__animation" src={progressAnimation} alt="Progress" />
						<p className="progress__message">{progress.message}</p>
					</div>
				</div>
			)}
		</div>
	);
}
