import { configureStore } from "@reduxjs/toolkit";

import notificationSlice from "./features/notificationSlice";
import responsibleSlice from "./features/responsibleSlice";

export const store = configureStore({
	reducer: {
		notification: notificationSlice,
		responsible: responsibleSlice,
	},
});
