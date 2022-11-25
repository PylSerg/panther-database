import { responsibleState } from "./assets/js/states";
import { notificationState } from "./assets/js/states";

import { useState, useEffect } from "react";

import Authorization from "./components/Authorization";
import Profile from "./components/Profile";

export default function App() {
	const [responsible, setResponsible] = useState(responsibleState);
	const [notification, setNotification] = useState(notificationState);
	const [appStyle, setAppStyle] = useState({ app__block: ["app__block"] });

	useEffect(() => {
		setResponsible({ name: "Admin", group: "admin" });
	}, []);

	return (
		<div className={appStyle.app__block.join(" ")}>
			{notification.show && (
				<div className="notification__block">
					<p className="notification__message">{notification.message}</p>
				</div>
			)}

			{responsible.group === "" && <Authorization setResponsible={setResponsible} />}

			{(responsible.group === "admin" || responsible.group === "foreman" || responsible.group === "driver") && (
				<Profile responsible={responsible} setNotification={setNotification} appStyle={appStyle} setAppStyle={setAppStyle} />
			)}
		</div>
	);
}
