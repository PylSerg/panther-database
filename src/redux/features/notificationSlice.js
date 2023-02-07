import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	show: false,
	success: true,
	name: "",
	message: "",
};

export const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		showNotification: (state, actions) => {
			let name = "";
			let message = "";

			if (actions.payload.name === undefined) {
				state.success = true;
				message = actions.payload;
			} else {
				state.success = false;
				name = actions.payload.name;
				message = actions.payload.message;
			}

			state.show = true;
			state.name = name;
			state.message = message;
		},

		hideNotification: state => {
			state.show = false;
			state.success = true;
			state.name = "";
			state.message = "";
		},
	},
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
