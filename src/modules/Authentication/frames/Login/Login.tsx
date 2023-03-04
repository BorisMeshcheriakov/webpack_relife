import React from 'react';
import { useLogin } from 'library/hooks/auth';
import { AuthFrom, ButtonLink, ButtonSubmit, CustomInput } from 'library/components/authentication';

import st from '../Login/Login.module.scss';

interface Props {
	openRestore: () => void;
}

const Login: React.FC<Props> = ({ openRestore }) => {
	const login = useLogin();
	return (
		<>
			<AuthFrom onSubmit={login.handleSubmit((data) => login.login(data))}>
				<CustomInput
					type="phonenumber"
					label="Телефон"
					name="phonenumber"
					control={login.control}
					error={login.errors?.phonenumber}
					disabled={login.isLoading}
				/>

				<CustomInput
					type="password"
					label="Пароль"
					name="password"
					control={login.control}
					error={login.errors?.password}
					disabled={login.isLoading}
					showPassword={login.showPassword}
					setValue={() => {
						login.setShowPassword(!login.showPassword);
					}}
				/>
				<div className={st.wrapper}>
					<ButtonSubmit type="submit" disabled={login.isLoading}>
						Войти
					</ButtonSubmit>
				</div>
				<ButtonLink disabled={login.isLoading} handler={openRestore}>
					Забыли пароль?
				</ButtonLink>
			</AuthFrom>
		</>
	);
};

export default Login;
