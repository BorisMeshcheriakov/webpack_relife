import { createSlice } from '@reduxjs/toolkit';
import { UserState } from 'library/types/users';

import * as reducers from './reducers';
import * as extraReducers from './extraReducers';
import { getIAm, logout } from './thunks';

const initialState = {
	user: {},
	status: 'idle',
} as UserState;

export const users = createSlice({
	name: 'users',
	initialState,
	reducers: {
		clearUserData: reducers.clearUserData,
		setUserData: reducers.setUserData,
	},
	extraReducers: (builder) => {
		builder.addCase(getIAm.pending, extraReducers.getIAmPending);
		builder.addCase(getIAm.fulfilled, extraReducers.getIAmFulfilled);

		builder.addCase(logout.fulfilled, extraReducers.logoutFulfilled);
	},
});

export const { clearUserData, setUserData } = users.actions;

export { getIAm, logout } from './thunks';

export { selectUser, selectUserData } from './selectors';

export default users.reducer;
