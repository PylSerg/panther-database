import { notificationsTime } from "./variables";
import { showNotification, hideNotification } from "../../redux/features/notificationSlice";

export default function notification(dispatch, message) {
	dispatch(showNotification(message));

	setTimeout(() => {
		dispatch(hideNotification());
	}, notificationsTime);
}
