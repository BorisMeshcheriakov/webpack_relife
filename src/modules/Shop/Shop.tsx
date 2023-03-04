import { FC } from 'react';
import { Switch, Route, Redirect, NavLink, Link, useLocation } from 'react-router-dom';

import { useModulePermissions } from 'library/hooks/module';
import { useUser } from 'library/hooks/user';

import { Container, Toolbar } from 'library/components/ui';
import {
	ModalProduct,
	Orders,
	Products,
	ModalPromo,
	ModalRecommend,
	ModalOrder,
	ModalManual,
} from './frames';
import { ButtonTooltip, Search } from 'library/components/common';
import { icons } from 'resources/icons/shop';
import { useSearch } from 'library/hooks/shop';

import cn from 'classnames';
import st from './Shop.module.scss';

const Shop: FC = () => {
	const { pathname } = useLocation();
	const { can_sell } = useModulePermissions();
	const { isAuth } = useUser();
	const search = useSearch();

	return (
		<Container>
			<div className={st.shop}>
				<Toolbar styles={st.toolbar}>
					<section className={cn(st.header, search.isOpen && st.search)}>
						<div className={st.header__tabs}>
							<NavLink to="/store/products" className={st.tab} activeClassName={st.active}>
								Каталог
							</NavLink>
							{isAuth && (
								<NavLink to="/store/orders" className={st.tab} activeClassName={st.active}>
									Заказы
								</NavLink>
							)}
						</div>

						<div className={st.header__buttons}>
							<div className={cn(st.show, search.isOpen && st.open)}>
								<Route path="/store/:tab">
									<Search
										value={search.value}
										setValue={search.setValue}
										isOpen={search.isOpen}
										open={search.open}
										close={search.close}
										placeholder={search.placeholder()}
									/>
								</Route>
							</div>

							{can_sell && (
								<>
									<Link to={`${pathname}/manual`}>
										<ButtonTooltip icon={icons.manual} tooltip="Инструкция" />
									</Link>

									<Link to={`${pathname}/promo`}>
										<ButtonTooltip icon={icons.discount} tooltip="Промокод" />
									</Link>
								</>
							)}
						</div>
					</section>

					<section className={cn(st.header, search.isOpen && st.search)}>
						<Route path="/store/:tab">
							<Search
								value={search.value}
								setValue={search.setValue}
								isOpen={search.isOpen}
								open={search.open}
								close={search.close}
								placeholder={search.placeholder()}
							/>
						</Route>
					</section>
				</Toolbar>

				<section className={st.workspace}>
					<Route path="/store/products" component={Products} />
					<Route path="/store/orders" component={Orders} />
				</section>
			</div>

			<Switch>
				<Redirect exact from="/store" to="/store/products" />
				<Route exact path="/store/:tab/promo" component={ModalPromo} />
				<Route exact path="/store/:tab/manual" component={ModalManual} />
				<Route path="/store/products/product/:id" component={ModalProduct} />
				<Route path="/store/products/recommend/:id" component={ModalRecommend} />
				<Route path="/store/orders/order/:id" component={ModalOrder} />
			</Switch>
		</Container>
	);
};

export default Shop;
