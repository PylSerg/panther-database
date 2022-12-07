import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	show: false,
	message: "",
};

export const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		show: (state, actions) => {
			const message = actions.payload;

			state.show = true;
			state.message = message;
		},

		hide: state => {
			state.show = false;
			state.message = "";
		},
	},
});

export const { show, hide } = notificationSlice.actions;

export default notificationSlice.reducer;
