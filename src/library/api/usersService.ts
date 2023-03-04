import xhr from 'core/axios/config';
import { AxiosResponse } from 'axios';

import { IAm, Coach } from 'library/models/users';

const getIAm = async (): Promise<AxiosResponse<IAm>> => {
	return xhr.get('/api/v1/users/i_am/');
};

const getCoach = async (id: string): Promise<AxiosResponse<Coach>> => {
	return xhr.get(`/api/v1/users/coach/${id}/`);
};

const editCoach = async (id: string | number, data: any): Promise<AxiosResponse<Coach>> => {
	return xhr.patch(`/api/v1/users/coach/${id}/`, data);
};

const editClient = async (data: any): Promise<AxiosResponse<any>> => {
	return xhr.patch(`/api/v1/auth/patient/register/`, data);
};

const updateMe = (id: any, data: any): Promise<AxiosResponse<any>> => {
	return xhr.patch(`/api/v1/users/user/${id}/updateme/`, data);
};

export const usersService = {
	getIAm,
	getCoach,
	editCoach,
	editClient,
	updateMe,
};
