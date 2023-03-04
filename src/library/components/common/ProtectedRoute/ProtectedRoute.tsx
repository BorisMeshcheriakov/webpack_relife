import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from 'library/hooks/user';
import { profileComplete } from 'library/helpers/auth';

type Props = any;

const ProtectedRoute: React.FC<Props> = (props) => {
	const { isAuth, user } = useUser();

	// Перенаправляем пользователя на его профиль и показываем ошибки
	return isAuth && !profileComplete(user) ? (
		<Redirect to={{ pathname: '/personal/edit', state: { showError: true } }} />
	) : (
		<Route {...props} />
	);
};

export default ProtectedRoute;
