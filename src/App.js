import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { changeResponsible } from "./redux/features/responsibleSlice";

import Notification from "./components/Notification";
import ConnectionStatus from "./components/ConnectionStatus";
import Progress from "./components/Progress";
import Authorization from "./components/Authorization";
import Profile from "./components/Profile";

export default function App() {
	const appStyle = useSelector(state => state.appStyle);
	const responsible = useSelector(state => state.responsible);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(changeResponsible({ name: "Admin", group: "admin" }));
	}, [dispatch]);

	return (
		<div className={appStyle.app__block.join(" ")}>
			<Progress />

			{responsible.group === "" && <Authorization />}

			<p>
				{responsible.name} [{responsible.group}]
			</p>

			{(responsible.group === "admin" || responsible.group === "foreman" || responsible.group === "driver") && <Profile />}

			<Notification />
			<ConnectionStatus />
		</div>
	);
}
