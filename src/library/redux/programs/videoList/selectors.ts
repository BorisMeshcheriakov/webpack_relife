import { RootState } from 'core/redux/store';

export const selectVideoListData = (state: RootState) => state.programs.videoList;
