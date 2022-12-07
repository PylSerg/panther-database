import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	show: false,
	indx: null,
};

export const deleteRowModalSlice = createSlice({
	name: "deleteRowModal",
	initialState,
	reducers: {
		showDeleteRowModal: (state, actions) => {
			state.show = true;
			state.indx = actions.payload;
		},

		hideDeleteRowModal: state => {
			state.show = false;
			state.indx = null;
		},
	},
});

export const { showDeleteRowModal, hideDeleteRowModal } = deleteRowModalSlice.actions;

export default deleteRowModalSlice.reducer;
