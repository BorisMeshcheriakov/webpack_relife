import { Tag, VideoTag } from './programs';

export interface PromoVideoUpload {
	id: number;
	pk: number;
	file: string;
	folder: number;
	metadata: string;
	preview: string;
	screenshot_url: string;
	title: string;
	status_info: string;
	status_pk: string;
}

export interface PresentationVideo {
	id: number;
	created: string;
	modified: string;
	code: any;
	player_code: string;
	metadata: string;
	title: string;
	status_code: string;
	status_info: string;
	screenshot_url: string;
	folder: number;
	author: number;
}

export interface SimplePromoVideo {
	id: number;
	created: string;
	modified: string;
	common_tag: number[];
	code: string;
	player_code: string;
	metadata: string;
	title: string;
	status_code: string;
	status_info: string;
	screenshot_url: string;
	folder: number;
	author: number;
	video_type: 'B' | 'Y';
	youtube_url: string | null;
}

export interface ProgramVideo {
	author: number;
	common_tag: number[];
	created: string;
	description: string;
	id: number;
	screenshot_url: string;
	status_code: 'P' | 'D' | 'F' | 'I';
	status_info: string;
	title: string;
	tags: VideoTag[];
	visible: boolean;
	code?: string;
	youtube_url?: string;
	video_type: 'B' | 'Y';
}

export interface ExerciseVideoList {
	id: number;
	screenshot_url: string;
	created: string;
	modified: string;
	code: string;
	player_code: string;
	metadata: string;
	title: string;
	status_code: string;
	status_info: 'P' | 'D' | 'F' | 'I';
	video_type: 'B' | 'Y';
	screenshot_thumbnail: string;
	description: string;
	deleted_at: string;
	yutube_url: string;
	folder: number;
	author: number;
}

export interface ExerciseVideoResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: ExerciseVideoList[];
}

export interface ExerciseVideoDetail {
	description: string;
	file: string;
	metadata: string;
	pk: number;
	preview: string;
	screenshot_url: string;
	tags: Tag[];
	title: string;
	yutube_url: string;
	video_type: 'B' | 'Y';
}
