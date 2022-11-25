import { responsibleState } from "./assets/js/states";
import { notificationState } from "./assets/js/states";

import { useState, useEffect } from "react";

import Authorization from "./components/Authorization";
import Profile from "./components/Profile";

export default function App() {
	const [responsible, setResponsible] = useState(responsibleState);
	const [notification, setNotification] = useState(notificationState);

	useEffect(() => {
		setResponsible({ name: "Admin", group: "admin" });
	}, []);

	return (
		<div>
			{notification.show && (
				<div className="report__status">
					<p className="report__message">{notification.message}</p>
				</div>
			)}

			{responsible.group === "" && <Authorization setResponsible={setResponsible} />}

			{(responsible.group === "admin" || responsible.group === "foreman" || responsible.group === "driver") && <Profile responsible={responsible} setNotification={setNotification} />}
		</div>
	);
}
