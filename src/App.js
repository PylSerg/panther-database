import { responsibleState } from "./assets/js/states";

import { useState, useEffect } from "react";

import Profile from "./components/Profile";

export default function App() {
	const [responsible, setResponsible] = useState(responsibleState);

	useEffect(() => {
		setResponsible({ name: "", group: "" });
	}, []);

	return <div>{(responsible.group === "foreman" || responsible.group === "driver") && <Profile responsible={responsible} />}</div>;
}
