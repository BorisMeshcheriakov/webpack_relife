import xhr from 'core/axios/config';
import { AxiosResponse } from 'axios';
import { ModuleRead, WebSettings, CommonSettings } from 'library/models/common';

const getModules = async (): Promise<AxiosResponse<ModuleRead[]>> => {
	return xhr.get('/api/v1/common/module/');
};

const getWebSettings = async (): Promise<AxiosResponse<WebSettings>> => {
	return xhr.get('/api/v1/common/websettings/');
};

const getCommonSettings = (): Promise<AxiosResponse<CommonSettings>> => {
	return xhr.get('/api/v1/common/settings/');
};

export const commonService = { getModules, getWebSettings, getCommonSettings };
