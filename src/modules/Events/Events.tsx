import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import {
	List,
	ModalEventShare,
	ModalEditor,
	ModalBuy,
	ModalTickets,
	ModalVisitors,
	Head,
	EventPage,
	EventMain,
} from './frames';

import { Container, Toolbar } from 'library/components/ui';

import { useShare } from 'library/hooks/events';

import st from './Events.module.scss';

const Events: React.FC = () => {
	const { search } = useLocation();
	const share = useShare();

	return (
		<>
			<Container>
				{share.isOpen && <ModalEventShare />}
				<Switch>
					<Route path="/events/create" component={ModalEditor} />
					<Route path="/events/:id/edit" component={ModalEditor} />
					<Route path="/events/:id/buy" component={ModalBuy} />
					<Route path="/events/:id/tickets" component={ModalTickets} />
					<Route path="/events/:id/visitors" component={ModalVisitors} />
					<Route path="/events" exact component={EventMain} />
					<Route path="/events/:id" component={EventPage} />
				</Switch>
			</Container>
		</>
	);
};

export default Events;
