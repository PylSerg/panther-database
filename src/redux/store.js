import { configureStore } from "@reduxjs/toolkit";

import appStyleSlice from "./features/appStyleSlice";
import notificationSlice from "./features/notificationSlice";
import progressSlice from "./features/progressSlice";
import responsibleSlice from "./features/responsibleSlice";
import deleteRowModalSlice from "./features/deleteRowModalSlice";
import closeReportModalSlice from "./features/closeReportModalSlice";
import abilityToSendDataSlice from "./features/abilityToSendDataSlice";
import submitReportModalSlice from "./features/submitReportModalSlice";

export const store = configureStore({
	reducer: {
		appStyle: appStyleSlice,
		notification: notificationSlice,
		progress: progressSlice,
		responsible: responsibleSlice,
		deleteRowModal: deleteRowModalSlice,
		closeReportModal: closeReportModalSlice,
		abilityToSendData: abilityToSendDataSlice,
		submitReportModal: submitReportModalSlice,
	},
});
