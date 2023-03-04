import xhr from 'core/axios/config';
import axios, { AxiosResponse } from 'axios';

import { LoginRequest, LoginResponse, ResetRequest, RegisterRequest, ConfirmResetRequest } from 'library/models/auth';

const login = async (data: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
	return xhr.post('/api/v1/auth/rest-auth/login/', data);
};

const logout = async () => {
	return xhr.post('/api/v1/auth/rest-auth/logout/');
};

const passwordResetRequest = async (data: ResetRequest): Promise<AxiosResponse> => {
	return axios.post('/api/v1/auth/patient/password_reset_request/', data);
};

const passwordConfirmRequest = async (data: ConfirmResetRequest): Promise<AxiosResponse> => {
	return axios.post('/api/v1/auth/patient/password_confirm_request/', data);
};

const registerPhone = async (data: { phonenumber: string }): Promise<AxiosResponse> => {
	return axios.post('/api/v1/auth/patient/register_phone/', data);
};

const checkCode = async (data: { phonenumber: string; passcode: string }) => {
	return axios.post('/api/v1/auth/patient/check_code/', data);
};

const confirmRegister = (data: RegisterRequest): Promise<AxiosResponse> => {
	return axios.post('/api/v1/auth/patient/verify_on_register/', data);
};

export const authService = {
	login,
	logout,
	passwordResetRequest,
	passwordConfirmRequest,
	registerPhone,
	checkCode,
	confirmRegister,
};
