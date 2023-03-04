import { PayloadAction } from '@reduxjs/toolkit';
import { IAm } from 'library/models/users';
import { UserState } from 'library/types/users';

export const getIAmPending = (state: UserState) => {
	state.status = 'loading';
};

export const getIAmFulfilled = (state: UserState, action: PayloadAction<IAm | undefined>) => {
	state.user = action.payload;
	state.status = 'loaded';
};

export const logoutFulfilled = (state: UserState) => {
	state.status = 'fail';
	state.user = {} as IAm;
};
