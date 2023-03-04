import xhr from 'core/axios/config';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
	InviteResponse,
	ListResponse,
	Program,
	ProgramAssign,
	ProgramList,
	ProgramResponse,
	Specialization,
	Tag,
} from 'library/models/programs';
import { ExerciseVideoResponse } from 'library/models/video';
import { CommonTag } from 'library/models/common';

const getSection = async (id: string | number): Promise<AxiosResponse<Specialization>> => {
	return xhr.get(`/api/v1/videos/section/${id}/`);
};

const getTags = async (): Promise<AxiosResponse<Tag[]>> => {
	return xhr.get(`/api/v1/program/tag/`);
};

const getVideoTags = async (): Promise<AxiosResponse<CommonTag[]>> => {
	return xhr.get(`/api/v1/common/tag/`);
};

const getPrograms = async (query: string): Promise<AxiosResponse<ListResponse<ProgramList>>> => {
	return xhr.get(`/api/v1/program/program/?${query ?? ''}`);
};

const getFavoritePrograms = (
	controller?: any,
	query?: string
): Promise<AxiosResponse<ProgramResponse>> => {
	return xhr.get(`/api/v1/program/favorite/?${query ?? ''}`, { signal: controller.signal });
};

const getMyPrograms = async (query?: string): Promise<AxiosResponse<ListResponse<ProgramList>>> => {
	return xhr.get(`/api/v1/program/program/my/?${query ?? ''}`);
};

const getProgram = async (
	id: string,
	config?: AxiosRequestConfig
): Promise<AxiosResponse<Program>> => {
	return xhr.get(`/api/v1/program/program/${id}/`, config);
};

const getFullProgram = (id: string, config?: AxiosRequestConfig) => {
	return xhr.get(`/api/v1/program/program/full/${id}/`, config);
};

const getVideos = async (query?: string): Promise<AxiosResponse<ExerciseVideoResponse>> => {
	return xhr.get(`/api/v1/videos/exercise_videos/?${query ?? ''}`);
};

const createProgram = async (data: any, config: any): Promise<AxiosResponse<Program>> => {
	return xhr.post(`/api/v1/program/program/`, data, config);
};

const updateProgram = async (
	id: string | number,
	data: any,
	config?: any
): Promise<AxiosResponse<Program>> => {
	return xhr.patch(`/api/v1/program/program/${id}/`, data, config);
};

const removeProgram = async (id: string | number): Promise<AxiosResponse> => {
	return xhr.delete(`/api/v1/program/program/${id}/`);
};

const buyProgram = async (
	id: string | number
): Promise<AxiosResponse<{ redirect_url: string }>> => {
	return xhr.get(`/api/v1/program/program/buy/${id}/`);
};

const makeProgramFavorite = async (pk: string | number) => {
	return xhr.post(`/api/v1/program/favorite/`, { pk: pk });
};

const removeProgramFromFavorite = (pk: string | number) => {
	return xhr.delete(`/api/v1/program/favorite/${pk}/`);
};

const inviteToProgram = (
	pk: string | number,
	invite: { days: number; comment?: string }
): Promise<AxiosResponse<{ hashcode: string }>> => {
	return xhr.post(`/api/v1/program/program/invite/${pk}/`, invite);
};

const subscribe = async (hash: string): Promise<AxiosResponse<InviteResponse>> => {
	return xhr.get(`/api/v1/program/program/subscribe/${hash}/`);
};

const recommend = async (data: ProgramAssign) => {
	return xhr.post(`/api/v1/program/individual/recommend/`, data);
};

const setStatus = async (id: number, data: any): Promise<AxiosResponse> => {
	return xhr.patch(`/api/v1/program/program/set_status/${id}/`, data);
};

const getSpecs = () => {
	return xhr.get(`/api/v1/program/specialization/`);
};

export const programsService = {
	getSection,
	getTags,
	getVideoTags,
	getPrograms,
	getFavoritePrograms,
	getMyPrograms,
	getProgram,
	getFullProgram,
	getVideos,
	createProgram,
	updateProgram,
	removeProgram,
	buyProgram,
	makeProgramFavorite,
	removeProgramFromFavorite,
	inviteToProgram,
	subscribe,
	recommend,
	setStatus,
	getSpecs,
};
