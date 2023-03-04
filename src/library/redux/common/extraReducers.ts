import { PayloadAction } from '@reduxjs/toolkit';
import { ModuleRead } from 'library/models/common';
import { CommonState } from 'library/types/common';

export const getModulesPending = (state: CommonState) => {
	state.modulesLoading = true;
	state.modulesStatus = 'loading';
};

export const getModulesFulfilled = (
	state: CommonState,
	action: PayloadAction<ModuleRead[] | undefined>
) => {
	state.modules = action.payload ? action.payload : ([] as ModuleRead[]);
	state.modulesLoading = false;
	state.modulesStatus = 'loaded';
};

export const getModulesRejected = (state: CommonState) => {
	state.modules = [];
	state.modulesLoading = false;
	state.modulesStatus = 'fail';
};
