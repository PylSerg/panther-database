import { notificationsTime } from "./variables";

// Show notification
export function showNotification(status, setNotification, message) {
	if (status === 200) setNotification({ show: true, message });
}

// Hide notification
export function hideNotification(setNotification) {
	setTimeout(() => {
		setNotification({ show: false, message: "" });
	}, notificationsTime);
}
