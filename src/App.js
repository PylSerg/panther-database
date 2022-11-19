import { responsibleState } from "./assets/js/states";

import { useState, useEffect } from "react";

import Authorization from "./components/Authorization";
import Profile from "./components/Profile";

export default function App() {
	const [responsible, setResponsible] = useState(responsibleState);

	useEffect(() => {
		setResponsible({ name: "Admin", group: "admin" });
	}, []);

	return (
		<div>
			{responsible.group === "" && <Authorization setResponsible={setResponsible} />}

			{(responsible.group === "admin" || responsible.group === "foreman" || responsible.group === "driver") && <Profile responsible={responsible} />}
		</div>
	);
}
