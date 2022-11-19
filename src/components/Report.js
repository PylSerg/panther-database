import { notificationState, rowsState, reportState } from "../assets/js/states";
import { MATERIALS_URL } from "../assets/js/urls";

import { useState, useEffect } from "react";
import { createNewRow, deleteRow } from "../assets/js/rows";
import { changeCell, changePrice, pasteObjectAndStage } from "../assets/js/change-cell";
import { postRequest } from "../assets/js/post-request";

export default function Report({ responsible }) {
	const [notification, setNotification] = useState(notificationState);
	const [rows, setRows] = useState(rowsState);
	const [data, setData] = useState(reportState);

	useEffect(() => {
		setData({ ...data, responsible: responsible.name });
	}, []);

	return (
		<div className="report__block">
			{notification.show && (
				<div className="report__status">
					<p>{notification.message}</p>
				</div>
			)}

			<button type="button" title="Додати запис" onClick={() => createNewRow(rows, setRows, data)}>
				+
			</button>

			<br />
			<br />

			<ul className="report__table">
				{rows &&
					rows.indx.map(row => (
						<li className="report__row" key={row}>
							<button id={row} className="report__copy" type="button" title="Скопіювати попередій об'єкт та етап" onClick={e => pasteObjectAndStage(e, data, setData)}>
								C
							</button>

							<button id={row} className="report__delete" type="button" title="Видалити запис" onClick={e => deleteRow(e, data, setData, rows, setRows)}>
								D
							</button>

							<div>
								{row === 0 && <p className="report__header">Об&rsquo;єкт</p>}

								<p className="report__label">Об&rsquo;єкт</p>

								<input name="objects" id={row} type="text" value={data.objects[row]} onChange={e => changeCell(e, data, setData)} />
							</div>

							<div>
								{row === 0 && <p className="report__header">Етап</p>}

								<p className="report__label">Етап</p>

								<input name="stages" id={row} type="text" value={data.stages[row]} onChange={e => changeCell(e, data, setData)} />
							</div>

							<div>
								{row === 0 && <p className="report__header">Матеріал</p>}

								<p className="report__label">Матеріал</p>

								<input name="materials" id={row} type="text" value={data.materials[row]} onChange={e => changeCell(e, data, setData)} />
							</div>

							<div>
								{row === 0 && <p className="report__header">Кількість</p>}

								<p className="report__label">Кількість</p>

								<input name="quantity" id={row} type="text" value={data.quantity[row]} onChange={e => changeCell(e, data, setData)} />
							</div>

							<div>
								{row === 0 && <p className="report__header">Ціна</p>}

								<p className="report__label">Ціна</p>

								<input name="prices" id={row} type="text" value={data.prices[row]} onChange={e => changeCell(e, data, setData)} onBlur={e => changePrice(e, data, setData)} />
							</div>

							<div>
								{row === 0 && <p className="report__header">Сума</p>}

								<p className="report__label">Сума</p>

								<input name="sums" id={row} type="text" value={data.sums[row]} onChange={e => changeCell(e, data, setData)} readOnly />
							</div>

							<div>
								{row === 0 && <p className="report__header">Коментар</p>}

								<p className="report__label">Коментар</p>

								<input name="comments" id={row} type="text" value={data.comments[row]} onChange={e => changeCell(e, data, setData)} />
							</div>
						</li>
					))}
			</ul>

			<br />
			<br />

			<button type="button" onClick={() => postRequest(MATERIALS_URL, data, setData, setRows, setNotification)}>
				Send
			</button>
		</div>
	);
}
