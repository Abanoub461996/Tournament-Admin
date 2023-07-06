import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserState {
	data: {
		loggedIn: boolean;
		about: string;
		name: string;
		email: string;
		gender: string;
		dateOfBirth: any;
		photo?:any;
		// city: string;
		// country: string;
		id: number;
		position: string;
		first_time:number;
		// mainAccount: string;
	};
}

const initialState: UserState = {
	data: {
		loggedIn: false,
		about: "",
		name: "",
		email: "",
		gender: "",
		dateOfBirth: "",
		photo:'',
		// city: "",
		// country: "",
		id: -1,
		position: '',
		first_time:0,
		// mainAccount: '',
	},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			
			state.data = action.payload;
		},
		resetUser: () => initialState,
	},
});

export const getUser = (state: RootState) => state.user.data;

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
