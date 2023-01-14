import xc from "../@x-console/x-console";

import { REPORT_MATERIALS_URL } from "../assets/data/urls";

import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { showNotification } from "../redux/features/notificationSlice";
import { showProgress, hideProgress } from "../redux/features/progressSlice";

export default function ViewReportsBlock() {
	const dispatch = useDispatch();

	useEffect(() => {
		getMaterialsReport();
	}, []);

	async function getMaterialsReport() {
		dispatch(showProgress("Завантаження звітів..."));

		await fetch(REPORT_MATERIALS_URL)
			.then(response => response.json())
			.then(response => {
				dispatch(hideProgress());

				xc.l(response);
			})
			.catch(error => {
				dispatch(hideProgress());
				dispatch(showNotification(error));

				xc.e(error);
			});
	}

	return <div></div>;
}
