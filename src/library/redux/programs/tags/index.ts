import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonTag } from 'library/models/common';

interface TagState {
	tags: CommonTag[];
}

const initialState: TagState = {
	tags: [],
};

export const tags = createSlice({
	name: 'program/tags',
	initialState,
	reducers: {
		setTags: (state: TagState, action: PayloadAction<CommonTag[]>) => {
			state.tags = action.payload;
		},
	},
	extraReducers: {},
});

export * as tagsSelectors from './selectors';
