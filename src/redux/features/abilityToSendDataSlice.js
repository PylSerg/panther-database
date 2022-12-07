import { createSlice } from "@reduxjs/toolkit";

const initialState = { allowSending: false };

export const abilityToSendDataSlice = createSlice({
	name: "abilityToSendData",
	initialState,
	reducers: {
		allowAbilityToSendData: state => {
			state.allowSending = true;
		},

		disableAbilityToSendData: state => {
			state.allowSending = false;
		},
	},
});

export const { allowAbilityToSendData, disableAbilityToSendData } = abilityToSendDataSlice.actions;

export default abilityToSendDataSlice.reducer;
