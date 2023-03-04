import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExerciseVideoDetail, ExerciseVideoList } from 'library/models/video';

interface VideoListState {
	list: ExerciseVideoList[];
	status: 'idle' | 'loading';
	page: number;
	hasNext: boolean;
	videoSearch: string;
	videoTags: number[];
}

const initialState: VideoListState = {
	list: [],
	status: 'idle',
	page: 1,
	hasNext: true,
	videoSearch: '',
	videoTags: [],
};

export const videoList = createSlice({
	name: 'programs/videos',
	initialState,
	reducers: {
		resetVideoList: (state: VideoListState) => {
			state.list = [];
			state.page = 1;
			state.hasNext = true;
			state.status = 'idle';
		},
		setVideos: (state: VideoListState, action: PayloadAction<ExerciseVideoList[]>) => {
			state.list = action.payload;
		},
		setVideoListSearch: (state: VideoListState, action: PayloadAction<string>) => {
			state.videoSearch = action.payload;
		},
		setVideoListTags: (state: VideoListState, action: PayloadAction<number[]>) => {
			state.videoTags = action.payload;
		},
		setVideoListStatus: (state: VideoListState, action: PayloadAction<'idle' | 'loading'>) => {
			state.status = action.payload;
		},
		setVideoListPage: (state: VideoListState, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setVideoListHasNext: (state: VideoListState, action: PayloadAction<boolean>) => {
			state.hasNext = action.payload;
		},
		updateVideoInList: (state: VideoListState, action: PayloadAction<ExerciseVideoDetail>) => {
			// Обновить или добавить видеоупражнение в списке
			let video = {
				id: action.payload.pk,
				title: action.payload.title,
				screenshot_url: action.payload.screenshot_url,
			} as ExerciseVideoList;

			let list = [...state.list];
			let idx = list.findIndex((exercise) => exercise.id === video.id);

			if (idx !== -1) {
				list[idx] = { ...video };
				state.list = [...list];
			}
		},
	},
	extraReducers: {},
});

export * as videoListSelectors from './selectors';
