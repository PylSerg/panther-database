import React from "react";
import { useSelector } from "react-redux";

export default function Notification() {
	const notification = useSelector(state => state.notification);

	return (
		<div>
			{notification.show && (
				<div className="notification__block">
					<p className="notification__message">{notification.message}</p>
				</div>
			)}
		</div>
	);
}
