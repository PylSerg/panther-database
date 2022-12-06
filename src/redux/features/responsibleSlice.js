import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	name: "Guest",
	group: "",
};

export const responsibleSlice = createSlice({
	name: "responsible",
	initialState,
	reducers: {
		changeResponsible: (state, actions) => {
			const { name, group } = actions.payload;

			state.name = name;
			state.group = group;
		},
	},
});

export const { changeResponsible } = responsibleSlice.actions;

export default responsibleSlice.reducer;
