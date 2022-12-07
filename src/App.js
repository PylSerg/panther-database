import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { changeResponsible } from "./redux/features/responsibleSlice";

import Notification from "./components/Notification";
import Authorization from "./components/Authorization";
import Profile from "./components/Profile";

export default function App() {
	const [appStyle, setAppStyle] = useState({ app__block: ["app__block"] });

	const responsible = useSelector(state => state.responsible);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(changeResponsible({ name: "Admin", group: "admin" }));
	}, []);

	return (
		<div className={appStyle.app__block.join(" ")}>
			<Notification />

			{responsible.group === "" && <Authorization />}

			<p>
				{responsible.name} [{responsible.group}]
			</p>

			{(responsible.group === "admin" || responsible.group === "foreman" || responsible.group === "driver") && <Profile appStyle={appStyle} setAppStyle={setAppStyle} />}
		</div>
	);
}
