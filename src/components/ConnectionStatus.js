import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { showNotification } from "../redux/features/notificationSlice";

export default function ConnectionStatus() {
	const [connection, setConnection] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!connection) dispatch(showNotification({ name: "NoConnection", message: "Немає зʼєднання" }));
		if (connection) dispatch(showNotification("Зʼєднання встановлено"));
	}, [connection, dispatch]);

	setInterval(() => {
		const rtt = window.clientInformation.connection.rtt;

		if (rtt === 0 && connection) setConnection(false);
		if (rtt > 0 && !connection) setConnection(true);
	}, 1000);

	return (
		<>
			{!connection && (
				<div className="connection">
					<p className="connection__message">Немає зʼєднання</p>
				</div>
			)}
		</>
	);
}
