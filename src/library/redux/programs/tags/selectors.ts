import { RootState } from 'core/redux/store';

export const selectTags = (state: RootState) => state.programs.tags.tags;
