import xhr from 'core/axios/config';
import { AxiosResponse } from 'axios';
import { Statistics } from 'library/models/statistics';

// Для месечной статистики формат даты в виде yyyy-MM(2000-01)
// Для ежегодной статистики формат даты в виде yyyy (2000)

// Видеопрограммы

const getProgramsMounthStatistics = async (date: string): Promise<AxiosResponse<Statistics[]>> => {
	return xhr.get(`/api/v1/program/program/${date}/get_stat_month/`);
};

const getProgramsYearStatistics = async (date: string): Promise<AxiosResponse<Statistics[]>> => {
	return xhr.get(`/api/v1/program/program/${date}/get_stat_year/`);
};

// Консультации

const getConsultationsMounthStatistics = async (
	date: string
): Promise<AxiosResponse<Statistics[]>> => {
	return xhr.get(`/api/v1/consultations/${date}/get_stat_month/`);
};

const getConsultationsYearStatistics = async (
	date: string
): Promise<AxiosResponse<Statistics[]>> => {
	return xhr.get(`/api/v1/consultations/${date}/get_stat_year/`);
};

// Мероприятия

const getEventsMounthStatistics = async (date: string): Promise<AxiosResponse<Statistics[]>> => {
	return xhr.get(`/api/v1//events/event/${date}/get_stat_month/`);
};

const getEventsYearStatistics = async (date: string): Promise<AxiosResponse<Statistics[]>> => {
	return xhr.get(`/api/v1//events/event/${date}/get_stat_year/`);
};

const getTicketMounthStatistics = async (date: string): Promise<AxiosResponse<Statistics[]>> => {
	return xhr.get(`/api/v1/events/ticket/${date}/get_stat_month/`);
};

const getTicketYearStatistics = async (date: string): Promise<AxiosResponse<Statistics[]>> => {
	return xhr.get(`/api/v1/events/ticket/${date}/get_stat_year/`);
};

// Продажи с промокодом

const getStoreMounthStatistics = async (date: string): Promise<AxiosResponse<Statistics[]>> => {
	return xhr.get(`/api/v1/store/order/${date}/get_stat_month/`);
};

const getStoreYearStatistics = async (date: string): Promise<AxiosResponse<Statistics[]>> => {
	return xhr.get(`/api/v1/store/order/${date}/get_stat_year/`);
};

export const statisticsService = {
	getProgramsMounthStatistics,
	getProgramsYearStatistics,
	getConsultationsMounthStatistics,
	getConsultationsYearStatistics,
	getEventsMounthStatistics,
	getEventsYearStatistics,
	getTicketMounthStatistics,
	getTicketYearStatistics,
	getStoreMounthStatistics,
	getStoreYearStatistics,
};
