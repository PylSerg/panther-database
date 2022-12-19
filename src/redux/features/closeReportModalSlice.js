import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	show: false,
};

export const closeReportModalSlice = createSlice({
	name: "closeReportModal",
	initialState,
	reducers: {
		showCloseReportModal: state => {
			state.show = true;
		},

		hideCloseReportModal: state => {
			state.show = false;
		},
	},
});

export const { showCloseReportModal, hideCloseReportModal } = closeReportModalSlice.actions;

export default closeReportModalSlice.reducer;
