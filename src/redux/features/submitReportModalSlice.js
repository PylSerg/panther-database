import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	show: false,
};

export const submitReportModalSlice = createSlice({
	name: "submitReportModal",
	initialState,
	reducers: {
		showSubmitReportModal: state => {
			state.show = true;
		},

		hideSubmitReportModal: state => {
			state.show = false;
		},
	},
});

export const { showSubmitReportModal, hideSubmitReportModal } = submitReportModalSlice.actions;

export default submitReportModalSlice.reducer;
