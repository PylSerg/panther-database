import { configureStore } from "@reduxjs/toolkit";

import appStyleSlice from "./features/appStyleSlice";
import notificationSlice from "./features/notificationSlice";
import responsibleSlice from "./features/responsibleSlice";

export const store = configureStore({
	reducer: {
		appStyle: appStyleSlice,
		notification: notificationSlice,
		responsible: responsibleSlice,
	},
});
