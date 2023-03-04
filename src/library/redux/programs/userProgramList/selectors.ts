import { RootState } from 'core/redux/store';

export const selectUserProgramsSearch = (state: RootState) =>
	state.programs.userProgramsList.search;

export const selectUserProgramsListTags = (state: RootState) =>
	state.programs.userProgramsList.tags;

export const selectUserProgramsList = (state: RootState) => state.programs.userProgramsList.list;

export const selectUserProgramsListData = (state: RootState) => state.programs.userProgramsList;
