import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Notification() {
	const notification = useSelector(state => state.notification);

	const [notificationStyle, setNotificationStyle] = useState({
		style: ["notification__block"],
	});

	useEffect(() => {
		if (!notification.success) {
			const errorStyle = notificationStyle.style;
			errorStyle.push("notification__block--error");

			setNotificationStyle({ style: errorStyle });
		} else {
			setNotificationStyle({ style: ["notification__block"] });
		}
	}, [notification]);

	return (
		<div>
			{notification.show && (
				<div className={notificationStyle.style.join(" ")}>
					<p className="notification__message">{notification.message}</p>
				</div>
			)}
		</div>
	);
}
