import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	show: false,
	success: true,
	message: "",
};

export const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		showNotification: (state, actions) => {
			let message = "";

			if (actions.payload.name === undefined) {
				state.success = true;
				message = actions.payload;
			} else {
				state.success = false;
				message = actions.payload.message;
			}

			state.show = true;
			state.message = message;
		},

		hideNotification: state => {
			state.show = false;
			state.success = true;
			state.message = "";
		},
	},
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
