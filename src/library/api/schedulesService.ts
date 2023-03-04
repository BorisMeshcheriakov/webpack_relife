import { AxiosResponse } from 'axios';
import xhr from 'core/axios/config';
import {
	ChangeTimeRequest,
	CoachAvailablePeriods,
	Consultation,
	OriginSchedule,
	ScheduleAddress,
} from 'library/models/schedules';
import { SessionUpdate } from 'library/types/schedules';

const getOpenSchedules = async (
	query?: string
): Promise<AxiosResponse<CoachAvailablePeriods[]>> => {
	return xhr.get(`/api/v1/schedules/available_period/?${query || ''}`);
};

const getBusySchedules = async (query?: string): Promise<AxiosResponse<OriginSchedule[]>> => {
	return xhr.get(`/api/v1/schedules/schedule/?${query || ''}`);
};

const getConsultation = async (
	id: string | number
): Promise<AxiosResponse<CoachAvailablePeriods>> => {
	return xhr.get(`/api/v1/schedules/available_period/${id}/`);
};

const createConsultation = async (
	data: CoachAvailablePeriods
): Promise<AxiosResponse<CoachAvailablePeriods>> => {
	return xhr.post(`/api/v1/schedules/available_period/`, data);
};

const updateConsultation = async (
	data: SessionUpdate
): Promise<AxiosResponse<CoachAvailablePeriods>> => {
	return xhr.patch(`/api/v1/schedules/available_period/${data.id}/`, data);
};

const removeConsultation = async (id: number): Promise<AxiosResponse> => {
	return xhr.delete(`/api/v1/schedules/available_period/${id}/`);
};

const buyConsultation = async (data: any): Promise<AxiosResponse> => {
	return xhr.post(`/api/v1/schedules/schedule/buy/`, data);
};

const buySubscription = async (id: number): Promise<AxiosResponse> => {
	return xhr.get(`/api/v1/schedules/schedule/${id}/buy_subscribe/`);
};

const getAddressList = async (): Promise<AxiosResponse<ScheduleAddress[]>> => {
	return xhr.get(`/api/v1/schedules/address/`);
};

const getAddress = async (id: number): Promise<AxiosResponse<ScheduleAddress>> => {
	return xhr.get(`/api/v1/schedules/address/${id}/`);
};

const createAddress = async (data: ScheduleAddress): Promise<AxiosResponse> => {
	return xhr.post(`/api/v1/schedules/address/`, data);
};

const deleteAddress = async (id: number): Promise<AxiosResponse> => {
	return xhr.delete(`/api/v1/schedules/address/${id}/`);
};

const getConsultations = async (query?: string): Promise<AxiosResponse> => {
	return xhr.get(`/api/v1/consultations/?${query || ''}`);
};

const getBusy = async (id: string | number): Promise<AxiosResponse> => {
	return xhr.get(`/api/v1/schedules/schedule/${id}/`);
};

const getSession = async (id: string | number): Promise<AxiosResponse<Consultation>> => {
	return xhr.get(`/api/v1/consultations/${id}/`);
};

const assignSchedule = async (data: any): Promise<AxiosResponse> => {
	return xhr.post(`/api/v1/schedules/schedule/subscribe_patient/`, data);
};

const changeTime = async (data: any): Promise<AxiosResponse> => {
	return xhr.post(`/api/v1/schedules/change_time/`, data);
};

const acceptChange = (id: number): Promise<AxiosResponse> => {
	return xhr.post(`/api/v1/schedules/change_time/${id}/approve/`);
};

const getChangeTime = (id: number): Promise<AxiosResponse<ChangeTimeRequest>> => {
	return xhr.get(`/api/v1/schedules/change_time/${id}/`);
};

const cancelConsultation = async (id: any): Promise<AxiosResponse> => {
	return xhr.post(`/api/v1/consultations/${id}/cancel/`);
};

const deleteConsultation = async (id: any): Promise<AxiosResponse> => {
	return xhr.delete(`/api/v1/consultations/${id}/`);
};

export const schedulesService = {
	getOpenSchedules,
	getBusySchedules,
	getConsultation,
	createConsultation,
	updateConsultation,
	removeConsultation,
	buyConsultation,
	buySubscription,
	getAddressList,
	getAddress,
	deleteAddress,
	createAddress,
	getConsultations,
	getBusy,
	getSession,
	assignSchedule,
	changeTime,
	acceptChange,
	getChangeTime,
	cancelConsultation,
	deleteConsultation,
};
