import xhr from 'core/axios/config';
import { AxiosResponse } from 'axios';
import { Event, EventAddress, TicketDetail, TicketsResponse } from 'library/models/events';
import { PromoVideoUpload } from 'library/models/video';
import { ListResponse } from 'library/models/programs';

const getEvent = async (id: any): Promise<AxiosResponse<Event>> => {
	return xhr.get(`/api/v1/events/event/${id}/`);
};

const getEvents = async (query?: string): Promise<AxiosResponse<ListResponse<Event>>> => {
	return xhr.get(`/api/v1/events/event/?${query ?? ''}`);
};

const addEventToFavorites = async (id: any): Promise<AxiosResponse> => {
	return xhr.post('/api/v1/events/favorite/', { pk: id });
};

const deleteEventFromFavorites = async (id: any): Promise<AxiosResponse> => {
	return xhr.delete(`/api/v1/events/event/${id}/delete_favorite/`);
};

const getVideo = async (id: any): Promise<AxiosResponse> => {
	return xhr.get(`/api/v1/videos/promo_videos/${id}/`);
};

const getVideoUpload = async (id: any): Promise<AxiosResponse> => {
	return xhr.get(`/api/v1/videos/promo_videos/${id}/upload_status/`);
};

const createEvent = async (data: any): Promise<AxiosResponse<Event>> => {
	return xhr.post(`/api/v1/events/event/`, data);
};

const updateEvent = async (id: any, data: any): Promise<AxiosResponse<Event>> => {
	return xhr.patch(`/api/v1/events/event/${id}/`, data);
};

const createVideo = async (data: any): Promise<AxiosResponse<PromoVideoUpload>> => {
	return xhr.post(`/api/v1/videos/promo_videos/`, data);
};

const updateVideo = async (id: any, data: any): Promise<AxiosResponse<PromoVideoUpload>> => {
	return xhr.patch(`/api/v1/videos/promo_videos/${id}/`, data);
};

const buyTickets = async (id: any, data: any): Promise<AxiosResponse> => {
	return xhr.post(`/api/v1/events/event/${id}/buy/`, data);
};

const deleteEvent = async (id: any): Promise<AxiosResponse> => {
	return xhr.delete(`/api/v1/events/event/${id}/`);
};

const createType = async (type: string): Promise<AxiosResponse<{ id: number; title: string }>> => {
	return xhr.post(`/api/v1/events/type`, { title: type });
};

const getAllTypes = async (): Promise<AxiosResponse<{ id: number; title: string }[]>> => {
	return xhr.get(`/api/v1/events/type/`);
};

const getTickets = async (params?: string): Promise<AxiosResponse<TicketsResponse>> => {
	return xhr.get(`/api/v1/events/ticket/?${params ?? ''}`);
};

const checkTicket = async (id: any, data: any): Promise<AxiosResponse> => {
	return xhr.patch(`/api/v1/events/ticket/${id}/check/`, data);
};

const getTicketsList = async (id: any): Promise<AxiosResponse<TicketDetail[]>> => {
	return xhr.get(`/api/v1/events/event/${id}/tickets/`);
};

const getTicketInfo = async (id: any): Promise<AxiosResponse> => {
	return xhr.get(`/api/v1/events/ticket/${id}/`);
};

const publicateEvent = async (id: any, published: boolean): Promise<AxiosResponse> => {
	return xhr.patch(`/api/v1/events/event/${id}/`, { published });
};

const getAddress = async (id: number): Promise<AxiosResponse<EventAddress>> => {
	return xhr.get(`/api/v1/events/address/${id}/`);
};

const getCountry = async (id: number): Promise<AxiosResponse<any>> => {
	return xhr.get(`/api/v1/delivery/country/${id}/`);
};

export const eventService = {
	getEvent,
	getEvents,
	addEventToFavorites,
	deleteEventFromFavorites,
	getVideo,
	getVideoUpload,
	createEvent,
	updateEvent,
	createVideo,
	updateVideo,
	buyTickets,
	deleteEvent,
	createType,
	getAllTypes,
	getTickets,
	checkTicket,
	getTicketsList,
	getTicketInfo,
	publicateEvent,
	getAddress,
	getCountry,
};
