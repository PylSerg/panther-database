import { notificationsTime } from "./variables";
import { show, hide } from "../../redux/features/notificationSlice";

export default function notification(dispatch, message) {
	dispatch(show(message));

	setTimeout(() => {
		dispatch(hide());
	}, notificationsTime);
}
