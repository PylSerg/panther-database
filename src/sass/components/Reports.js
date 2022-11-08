import { useState } from "react";

export default function Reports() {
	const [usersList, setUsersList] = useState({
		send: false,
		names: [],
	});
	console.log(`names =>`, usersList.names);

	const BASE_URL = "https://script.google.com/macros/s/AKfycbzOOWQNaRWik7mpc3RZ2VPjEshXtA5OcWPsdEShZE6ADYhg6XYdZghB0p0Z-BuBqWIE/exec";

	function changesUser(e) {
		const indx = e.currentTarget.id;
		const value = e.currentTarget.value;
		const newNames = usersList.names;

		newNames.splice(indx, 1);
		newNames.splice(indx, 0, value);

		setUsersList({ ...usersList, names: newNames });
	}

	function onSubmit() {
		const formData = new FormData();

		formData.append("name", usersList.names.join("|"));

		postRequest();

		async function postRequest() {
			await fetch(BASE_URL, {
				method: "POST",
				body: formData,
			})
				.then(response => response.json())
				.then(response => console.log(response))
				.catch(function (error) {
					console.log(`\x1b[31m ${error}`);
				});
		}
	}
	return (
		<div>
			<input key="0" id="0" type="text" value={usersList.names[0]} onChange={changesUser} /> <br />
			<input key="1" id="1" type="text" value={usersList.names[1]} onChange={changesUser} /> <br />
			<br />
			<button type="button" onClick={onSubmit}>
				Send
			</button>
		</div>
	);
}
