import xhr from 'core/axios/config';
import { AxiosResponse } from 'axios';
import { Coach } from 'library/models/users';
import { ListResponse } from 'library/models/programs';

const getSpecialistsByAddress = async (query?: string): Promise<AxiosResponse<Coach[]>> => {
	return xhr.get(`/api/v1/schedules/available_period/coaches/${query ?? ''}`);
};

const getSpecialists = async (query?: string): Promise<AxiosResponse<ListResponse<Coach>>> => {
	return xhr.get(`/api/v1/users/coach/?${query ?? ''}`);
};

const getSpecialist = async (id: string | number): Promise<AxiosResponse<Coach>> => {
	return xhr.get(`/api/v1/users/coach/${id}/`);
};

export const specialistsService = {
	getSpecialistsByAddress,
	getSpecialists,
	getSpecialist,
};
