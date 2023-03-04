import { PayloadAction } from '@reduxjs/toolkit';
import { UserState } from 'library/types/users';
import { IAm } from 'library/models/users';
import { deleteCookie } from '../../../setupCookie';

export const clearUserData = (state: UserState) => {
	state.user = {} as IAm;
	sessionStorage.clear();
	deleteCookie('token');
};

export const setUserData = (state: UserState, action: PayloadAction<IAm>) => {
	state.user = action.payload;
};
