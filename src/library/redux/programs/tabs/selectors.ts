import { RootState } from 'core/redux/store';

export const selectTab = (state: RootState) => state.programs.tabs.tab;
