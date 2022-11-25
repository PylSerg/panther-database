import { notificationsTime } from "./variables";

// Show notification
export function showNotification(setNotification, message) {
	setNotification({ show: true, message });
}

// Hide notification
export function hideNotification(setNotification) {
	setTimeout(() => {
		setNotification({ show: false, message: "" });
	}, notificationsTime);
}
