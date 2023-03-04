import { AxiosResponse } from 'axios';
import { CommonTag } from 'library/models/common';
import { ListResponse, Program, ProgramList, Tag, VideoTag } from 'library/models/programs';
import { User } from 'library/models/users';
import { ExerciseVideoList, ProgramVideo, SimplePromoVideo } from 'library/models/video';

export interface Tab {
	title: string;
	request: (query: string) => Promise<AxiosResponse<ListResponse<ProgramList>, any>>;
	params?: { [key: string]: number | string | number[] };
}

export interface ProgramsState {
	tags: {
		list: CommonTag[];
		listPrograms: VideoTag[];
	};
	programs: {
		tab: Tab;
		search: string;
		tags: number[];
		list: ProgramList[];
		status: 'idle' | 'loading';
		page: number;
		hasNext: boolean;
	};
	userPrograms: {
		list: ProgramList[];
	};
	videos: {
		list: ExerciseVideoList[];
	};
	manager: {
		page: number;
		hasNext: boolean;
		search: string;
		tags: number[];
		status: 'idle' | 'loading';
	};
	program: {
		selected: Program | null;
		status: 'idle' | 'loading';
		exercises: ProgramVideo[];
		selectedVideos: ProgramVideo[];
		excludedVideos: number[][];
	};
	video: {
		selected: ProgramVideo | null;
		status: 'idle' | 'loading';
	};
}

export interface VideoEditorValues {
	screenshot_url: FileList | string;
	title: string;
	description: string;
	video: {
		file: FileList | null;
		url: string;
		video_type: 'B' | 'Y';
		code?: string;
	};
	tags: number[];
}

export interface ProgramEditorValues {
	title: string;
	promo_image: FileList | string;
	promo_video: SimplePromoVideo | null;
	description: string;
	cost: number;
	cost_coach: number;
	periodicity: boolean;
	tags: number[];
}

export type Mode = 'video' | 'comment' | 'days';

export type SourceType = 'B' | 'Y';

export type Recommendation = {
	coach: User;
	comment: string;
	hashcode: string;
	programId: number;
};
