import { configureStore } from "@reduxjs/toolkit";
import responsibleSlice from "./features/responsibleSlice";

export const store = configureStore({
	reducer: {
		responsible: responsibleSlice,
	},
});
