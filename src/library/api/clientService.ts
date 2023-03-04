import xhr from 'core/axios/config';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ClientList, Note } from 'library/models/clients';
import { Individual, ListResponse } from 'library/models/programs';

const getClients = async (
	query?: string,
	config?: AxiosRequestConfig
): Promise<AxiosResponse<any>> => {
	return xhr.get(`/api/v1/users/client/?${query ?? ''}`, config);
};

const getClient = async (id: string | number): Promise<AxiosResponse<ClientList>> => {
	return xhr.get(`/api/v1/users/client/${id}/`);
};

const createClient = async (client: any): Promise<AxiosResponse> => {
	return xhr.post(`/api/v1/users/client/`, client);
};

const updateClient = async (id: number, client: FormData): Promise<AxiosResponse> => {
	return xhr.patch(`/api/v1/users/client/${id}/`, client);
};

const getNotes = async (query?: string): Promise<AxiosResponse<ListResponse<Note>>> => {
	return xhr.get(`/api/v1/notes/note/?${query ?? ''}`);
};

const getNote = async (id: string | number): Promise<AxiosResponse<Note>> => {
	return xhr.get(`/api/v1/notes/note/${id}/`);
};

const createNote = async (data: any): Promise<AxiosResponse> => {
	return xhr.post(`/api/v1/notes/note/`, data);
};

const updateNote = async (data: any, id: any): Promise<AxiosResponse> => {
	return xhr.put(`/api/v1/notes/note/${id}/`, data);
};

const createNoteImage = async (data: any): Promise<AxiosResponse> => {
	return xhr.post(`/api/v1/notes/noterecord/`, data);
};

const removeNote = async (id: number): Promise<AxiosResponse> => {
	return xhr.delete(`/api/v1/notes/note/${id}/`);
};

const getClientPrograms = (query?: string): Promise<AxiosResponse<ListResponse<Individual>>> => {
	return xhr.get(`/api/v1/users/individual_program/?${query ?? ''}`);
};

export const clientService = {
	getClients,
	getClient,
	createClient,
	updateClient,
	getNotes,
	getNote,
	createNote,
	createNoteImage,
	updateNote,
	removeNote,
	getClientPrograms,
};
