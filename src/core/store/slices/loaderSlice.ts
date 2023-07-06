import { ReactNode } from 'react';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface LoaderState {
	data: {
		show: boolean;
		animation: ReactNode;
	};
}

const initialState: LoaderState = {
	data: {
		show: false,
		animation: null,
	},
};

export const loaderSlice = createSlice({
	name: 'loader',
	initialState,
	reducers: {
		showLoader: (state, action) => {
			state.data = action.payload;
		},
		closeLoader: () => initialState,
	},
});

export const getLoader = (state: RootState) => state.loader.data;

export const { showLoader, closeLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
