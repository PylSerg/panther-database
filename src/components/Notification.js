import { notificationsTime } from "../assets/js/variables";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { hideNotification } from "../redux/features/notificationSlice";

export default function Notification() {
	const notification = useSelector(state => state.notification);

	const [notificationStyle, setNotificationStyle] = useState({
		style: ["notification__block"],
	});

	const dispatch = useDispatch();

	useEffect(() => {
		if (!notification.success) {
			const errorStyle = notificationStyle.style;
			errorStyle.push("notification__block--error");

			setNotificationStyle({ style: errorStyle });
		} else {
			setNotificationStyle({ style: ["notification__block"] });
		}
	}, [notification]);

	setTimeout(() => {
		const hideStyle = notificationStyle.style;
		hideStyle.push("notification__block--hide");

		setNotificationStyle({ style: hideStyle });

		setTimeout(() => {
			dispatch(hideNotification());
		}, 300);
	}, notificationsTime);

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
