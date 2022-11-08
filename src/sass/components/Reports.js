import { useState } from "react";

export default function Reports() {
	const [rows, setRows] = useState({ indx: [0] });

	const [usersList, setUsersList] = useState({
		names: [],
		telephones: [],
		cities: [],
	});

	const BASE_URL = "https://script.google.com/macros/s/AKfycbxIOZ-x_TNtxNHJEXsysaiuXdJyosXFJJw_Db-hxCM34u4r6tQgABFjHtUtsSd5Yf9x/exec";

	// Creates new row
	function createNewRow() {
		const newRows = rows.indx;

		newRows.push(rows.indx.length);

		setRows({ indx: newRows });
	}

	// Changes cell
	function changeCell(e) {
		const indx = e.currentTarget.id;
		const column = e.currentTarget.name;
		const value = e.currentTarget.value;

		const newArray = usersList[`${column}`];
		newArray.splice(indx, 1);
		newArray.splice(indx, 0, value);

		setUsersList({ ...usersList, [`${column}`]: newArray });
	}

	// Sends data
	function onSubmit() {
		const formData = new FormData();

		formData.append("name", usersList.names.join("|"));
		formData.append("tel", usersList.telephones.join("|"));
		formData.append("city", usersList.cities.join("|"));

		postRequest();

		async function postRequest() {
			await fetch(BASE_URL, {
				method: "POST",
				body: formData,
			})
				.then(response => response.json())
				.then(response => console.log(response))
				.catch(error => console.log(`\x1b[31m ${error}`));
		}
	}

	return (
		<div>
			<button type="button" onClick={createNewRow}>
				+
			</button>

			<br />
			<br />

			<ul>
				{rows &&
					rows.indx.map(row => (
						<li key={row}>
							<input name="names" id={row} type="text" value={usersList.names[row]} onChange={changeCell} />
							<input name="telephones" id={row} type="text" value={usersList.telephones[row]} onChange={changeCell} />
							<input name="cities" id={row} type="text" value={usersList.cities[row]} onChange={changeCell} />
						</li>
					))}
			</ul>

			<br />
			<br />

			<button type="button" onClick={onSubmit}>
				Send
			</button>
		</div>
	);
}
