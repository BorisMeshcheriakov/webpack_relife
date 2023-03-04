import { IAm } from 'library/models/users';

export interface UserState {
	user: IAm | undefined;
	status: string;
}
