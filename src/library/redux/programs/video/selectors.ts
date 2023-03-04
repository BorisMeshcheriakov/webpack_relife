import { RootState } from 'core/redux/store';

export const selectVideo = (state: RootState) => state.programs.video.video;
