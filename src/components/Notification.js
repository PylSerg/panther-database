import { notificationsTime } from "../assets/data/variables";

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

			if (!notificationStyle.style.includes("notification__block--error")) errorStyle.push("notification__block--error");

			setNotificationStyle({ style: errorStyle });
		} else {
			setNotificationStyle({ style: ["notification__block"] });
		}

		setTimeout(() => {
			const hideStyle = notificationStyle.style;

			if (!notificationStyle.style.includes("notification__block--hide")) hideStyle.push("notification__block--hide");

			setNotificationStyle({ style: hideStyle });

			setTimeout(() => {
				dispatch(hideNotification());
				setNotificationStyle({ style: ["notification__block"] });
			}, 500);
		}, notificationsTime);

		// eslint-disable-next-line react-hooks/exhaustive-deps
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
