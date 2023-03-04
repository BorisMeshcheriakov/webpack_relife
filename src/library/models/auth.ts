export interface LoginRequest {
	phonenumber?: string;
	phonenumberLogin?: string;
	username?: string;
	password: string;
}

export interface RegisterRequest {
	phonenumber: string;
	passcode: string;
	password: string;
}

export interface ResetRequest {
	phonenumber: string;
}

export interface ConfirmResetRequest {
	phonenumber: string;
	passcode: string;
	password: string;
}

export interface LoginResponse {
	key: string;
}
