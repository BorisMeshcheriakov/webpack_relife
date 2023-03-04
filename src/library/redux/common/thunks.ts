import { createAsyncThunk } from '@reduxjs/toolkit';
import { commonService } from 'library/api/commonService';

export const getModules = createAsyncThunk('common/modules', async (_, { rejectWithValue }) => {
	try {
		const response = await commonService.getModules();
		let modules = [...response.data];
		modules = [...modules.filter((module) => module.permissions.indexOf('view_module') !== -1)];
		return modules;
	} catch (error) {
		rejectWithValue(error);
	}
});
