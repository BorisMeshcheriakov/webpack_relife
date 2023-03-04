import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProgramVideo, SimplePromoVideo } from 'library/models/video';

interface VideoState {
	video: ProgramVideo | SimplePromoVideo | null;
}

const initialState: VideoState = {
	video: null,
};

export const video = createSlice({
	name: 'programs/video',
	initialState,
	reducers: {
		setVideo: (
			state: VideoState,
			action: PayloadAction<ProgramVideo | SimplePromoVideo | null>
		) => {
			state.video = action.payload;
		},
	},
	extraReducers: {},
});

export * as videoSelectors from './selectors';
