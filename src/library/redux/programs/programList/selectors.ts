import { RootState } from 'core/redux/store';

export const selectSearch = (state: RootState) => state.programs.programList.search;

export const selectProgramsListTags = (state: RootState) => state.programs.programList.tags;

export const selectProgramsList = (state: RootState) => state.programs.programList.list;

export const selectProgramsListData = (state: RootState) => state.programs.programList;
