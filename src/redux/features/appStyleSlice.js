import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	app__block: ["app__block"],
};

export const appStyleSlice = createSlice({
	name: "appStyle",
	initialState,
	reducers: {
		addStyleToAppBlock: (state, actions) => {
			const appBlock = state.app__block;

			appBlock.push(actions.payload);
		},

		deleteStyleFromAppBlock: (state, actions) => {
			const appBlock = state.app__block;

			for (let i = 0; i < appBlock.length; i++) {
				if (appBlock[i] === actions.payload) appBlock.splice(i, 1);
			}
		},
	},
});

export const { addStyleToAppBlock, deleteStyleFromAppBlock } = appStyleSlice.actions;

export default appStyleSlice.reducer;
