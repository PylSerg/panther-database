import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	show: false,
	message: "",
};

export const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		showNotification: (state, actions) => {
			const message = actions.payload;

			state.show = true;
			state.message = message;
		},

		hideNotification: state => {
			state.show = false;
			state.message = "";
		},
	},
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
