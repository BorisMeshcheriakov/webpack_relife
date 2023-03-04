import { createAsyncThunk } from '@reduxjs/toolkit';
import xhr from 'core/axios/config';
import { usersService } from 'library/api/usersService';
import { authService } from 'library/api/authService';

export const getIAm = createAsyncThunk('users/i_am', async (_, { rejectWithValue }) => {
	try {
		const response = await usersService.getIAm();
		return response.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const logout = createAsyncThunk('users/logout', async () => {
	const response = await authService.logout();
	if (response.status === 200) {
		localStorage.removeItem('token');
		delete xhr.defaults.headers.common.Authorization;
	}
});
