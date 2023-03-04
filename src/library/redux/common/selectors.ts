import type { RootState } from 'core/redux/store';

export const selectModules = (state: RootState) => state.common.modules;
export const selectModulesLoading = (state: RootState) => state.common.modulesLoading;
export const selectModulesStatus = (state: RootState) => state.common.modulesStatus;
