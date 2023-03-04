import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import {
	TechService,
	PaymentListener,
	Main,
	Header,
	Profile,
	SupportPage,
	NotFound,
	Loading,
	RootModal,
	Notifications,
	ProgramPayment,
} from 'modules';
import { components } from './dynamicComponents';
import { ProtectedRoute } from 'library/components/common';

import { selectModules, selectModulesLoading } from 'library/redux/common';
import { useAppSelector } from 'library/hooks/common/reduxTypedHooks';
import { useWebSettings } from 'library/hooks/common';

const Routes = () => {
	const modules = useAppSelector(selectModules);
	const modulesLoading = useAppSelector(selectModulesLoading);
	const { logo_url } = useWebSettings();
	const { push } = useHistory();

	const redirectTo = () => {
		let link = '/';
		let filteredByVisibility = modules.filter(
			(module) => module.permissions.indexOf('view_module') !== -1
		);

		if (filteredByVisibility.length) {
			link = `/${filteredByVisibility[0].code}`;
		}

		return link;
	};

	/**
	 * При создании ссылки на экране в ios и android, к ссылке добавляется
	 * index.html, который вызывает ошибку 404. Перенапрвляем на главную
	 */
	if (window.location.href.indexOf('index.html') !== -1) push('/');

	return (
		<>
			<Header />
			<RootModal />

			<Switch>
				{modules.map((module) => {
					const component = components.find((component) => component.type === module.settings.type);
					if (component) {
						const Component = component.component;
						return (
							<ProtectedRoute
								path={`/${module.code}`}
								render={() => <Component />}
								key={module.code}
							/>
						);
					}
					return <Route key={module.code} path={`/${module.code}`} render={() => <NotFound />} />;
				})}

				{
					/**
					 * Если в глобальных настройках для лого указана ссылка перехода
					 * на сторонний ресурс - отключаем главную страницу и делаем редирект
					 * на первый доступный для просмотра модуль
					 */
					logo_url ? (
						<Redirect exact from="/" to={redirectTo()} />
					) : (
						<Route path="/" exact render={() => <Main />} />
					)
				}

				<Route path="/personal" render={() => <Profile />} />
				<Route path="/support" render={() => <SupportPage />} />
				<Route exact path="/technical-service" render={() => <TechService />} />
				<Route path="/payment" exact component={PaymentListener} />
				<Route exact path="/program-payment" component={ProgramPayment} />
				<Route path="/notifications" exact render={() => <Notifications />} />
				<Route path="*" render={() => (modulesLoading ? <Loading /> : <NotFound />)} />
			</Switch>
		</>
	);
};

export default Routes;
