import React from 'react';

import { Container } from 'library/components/ui';

import { List, Client } from './frames';
import { ClientsProvider } from 'library/components/clients';

import st from './Clients.module.scss';

const Clients: React.FC = () => {
	return (
		<ClientsProvider>
			<Container>
				<div className={st.clients}>
					<List />
					<section className={st.client}>
						<Client />
					</section>
				</div>
			</Container>
		</ClientsProvider>
	);
};

export default Clients;
