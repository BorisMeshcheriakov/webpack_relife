import { combineReducers } from 'redux';

import { tags, tagsSelectors } from './tags';
import { tabs, tabsSelectors } from './tabs';
import { programList, programListSelectors } from './programList';
import { userProgramsList, userProgramListSelectors } from './userProgramList';
import { videoList, videoListSelectors } from './videoList';
import { video, videoSelectors } from './video';
import { program, programSelectors } from './program';

const programs = combineReducers({
	tags: tags.reducer,
	tabs: tabs.reducer,
	programList: programList.reducer,
	userProgramsList: userProgramsList.reducer,
	videoList: videoList.reducer,
	video: video.reducer,
	program: program.reducer,
});

export const { setTags } = tags.actions;
export const { setSelectedTab } = tabs.actions;
export const {
	reset,
	setSearch,
	setProgramListTags,
	setPrograms,
	updateProgram,
	addProgram,
	removeProgram,
	setProgramList,
} = programList.actions;
export const {
	resetUserList,
	setUserPrograms,
	setUserProgramsStatus,
	setUserProgramsNext,
	setUserProgramsPage,
	setUserListTags,
	setUserProgramListSearch,
	updateUserProgram,
	addUserProgram,
} = userProgramsList.actions;
export const {
	resetVideoList,
	setVideoListStatus,
	setVideos,
	setVideoListPage,
	setVideoListHasNext,
	setVideoListSearch,
	setVideoListTags,
	updateVideoInList,
} = videoList.actions;
export const { setVideo } = video.actions;
export const {
	setProgram,
	setSelectedVideoList,
	setProgramVideoList,
	clearSelected,
	setExcluded,
	setRecommendation,
} = program.actions;

export const { selectTags } = tagsSelectors;
export const { selectTab } = tabsSelectors;
export const { selectProgramsListData, selectSearch, selectProgramsListTags } =
	programListSelectors;
export const { selectUserProgramsListData } = userProgramListSelectors;
export const { selectVideoListData } = videoListSelectors;
export const { selectVideo } = videoSelectors;
export const {
	selectProgram,
	selectProgramVideos,
	selectedVideosList,
	selectExcludedVideos,
	selectRecommendation,
} = programSelectors;

export default programs;
