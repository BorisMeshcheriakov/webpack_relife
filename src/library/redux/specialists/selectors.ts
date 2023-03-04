import { RootState } from 'core/redux/store';

export const selectSpecialistsList = (state: RootState) => state.specialists.specialists;

export const selectMode = (state: RootState) => state.specialists.mode;

export const selectSpecialistsSearch = (state: RootState) => state.specialists.search;
