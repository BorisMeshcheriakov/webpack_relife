import { createSlice } from '@reduxjs/toolkit';

import { CommonState } from 'library/types/common';

import * as extraReducers from './extraReducers';
import { getModules } from './thunks';

const initialState: CommonState = {
	modules: [],
	modulesLoading: false,
	modulesStatus: 'idle',
};

export const common = createSlice({
	name: 'common',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getModules.pending, extraReducers.getModulesPending);
		builder.addCase(getModules.fulfilled, extraReducers.getModulesFulfilled);
		builder.addCase(getModules.rejected, extraReducers.getModulesRejected);
	},
});

export { getModules } from './thunks';

export { selectModules, selectModulesLoading, selectModulesStatus } from './selectors';

export default common.reducer;
