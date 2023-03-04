import React from 'react';

import { ClientProfile, ProfileProvider } from 'library/components/clients';
import { Blank } from 'library/components/common';
import { useAppSelector } from 'library/hooks/common';
import { selectClient } from 'library/redux/clients';

const Client: React.FC = () => {
	const client = useAppSelector(selectClient);

	return (
		<ProfileProvider>
			{client ? <ClientProfile /> : <Blank text="Клиент не выбран" />}
		</ProfileProvider>
	);
};

export default Client;
