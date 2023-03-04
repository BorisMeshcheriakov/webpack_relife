import xhr from 'core/axios/config';
import { AxiosResponse } from 'axios';

import { CityList, CDEKPickupPoint, CDEKCalc, CdekCity, Country } from 'library/models/delivery';

const getCdekCityList = async (city: string): Promise<AxiosResponse<CityList>> =>
	xhr.get(`/api/v1/delivery/cdek/city/?title=${city}`);

const getPoints = async (data: { city_code: number }): Promise<AxiosResponse<CDEKPickupPoint[]>> =>
	xhr.post(`/api/v1/delivery/cdek/city/get_points/`, data);

const calcDelivery = async (data: CDEKCalc): Promise<AxiosResponse<CDEKCalc>> =>
	xhr.post(`/api/v1/delivery/cdek/city/calc_delivery/`, data);

const getCity = (id: number): Promise<AxiosResponse<CdekCity>> =>
	xhr.get(`/api/v1/delivery/cdek/city/${id}/`);

const getPoint = (id: number): Promise<AxiosResponse<CDEKPickupPoint>> =>
	xhr.get(`/api/v1/delivery/pickup/point/${id}/`);

const getCountries = async (): Promise<AxiosResponse<Country[]>> =>
	xhr.get(`/api/v1/delivery/country/`);

export const deliveryService = {
	getCdekCityList,
	getPoints,
	calcDelivery,
	getCity,
	getPoint,
	getCountries,
};
