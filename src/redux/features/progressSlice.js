import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	show: false,
	message: "",
};

export const progressSlice = createSlice({
	name: "progress",
	initialState,
	reducers: {
		showProgress: (state, actions) => {
			const message = actions.payload;

			state.show = true;
			state.message = message;
		},

		hideProgress: state => {
			state.show = false;
			state.message = "";
		},
	},
});

export const { showProgress, hideProgress } = progressSlice.actions;

export default progressSlice.reducer;
