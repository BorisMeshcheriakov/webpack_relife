import xhr from 'core/axios/config';
import { AxiosResponse } from 'axios';
import { ExerciseVideoDetail, ProgramVideo, SimplePromoVideo } from 'library/models/video';

const getExercises = async (query: string): Promise<AxiosResponse<any>> => {
	return xhr.get(`/api/v1/videos/exercise_videos/?${query}`);
};

const deleteExercise = async (id: number | string): Promise<AxiosResponse<any>> => {
	return xhr.delete(`/api/v1/videos/exercise_videos/${id}/`);
};

const createExercise = async (
	data: any,
	config?: any
): Promise<AxiosResponse<ExerciseVideoDetail>> => {
	return xhr.post(`/api/v1/videos/exercise_videos/`, data, config);
};

const updateExercise = async (id: string, data: any, config?: any) => {
	return xhr.patch(`/api/v1/videos/exercise_videos/${id}/`, data, config);
};

const getExercise = async (id: string | number): Promise<AxiosResponse<ProgramVideo>> => {
	return xhr.get(`/api/v1/videos/exercise_videos/${id}/`);
};

const createVideo = async (data: any, config?: any): Promise<AxiosResponse<SimplePromoVideo>> => {
	return xhr.post(`/api/v1/videos/promo_videos/`, data, config);
};

const updateVideo = async (
	id: number,
	data: any,
	config?: any
): Promise<AxiosResponse<SimplePromoVideo>> => {
	return xhr.patch(`/api/v1/videos/promo_videos/${id}/`, data, config);
};

const getPromoVideo = async (id: number): Promise<AxiosResponse<SimplePromoVideo>> => {
	return xhr.get(`/api/v1/videos/promo_videos/${id}/`);
};

const getUploadStatus = async (id: number): Promise<AxiosResponse<SimplePromoVideo>> => {
	return xhr.get(`/api/v1/videos/promo_videos/${id}/upload_status/`);
};

export const videoService = {
	getExercises,
	getExercise,
	updateExercise,
	deleteExercise,
	createExercise,
	createVideo,
	updateVideo,
	getUploadStatus,
	getPromoVideo,
};
