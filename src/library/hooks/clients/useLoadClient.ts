import React from 'react';
import { ClientList } from 'library/models/clients';
import { clientService } from 'library/api/clientService';
import { changeClient } from 'library/redux/clients';
import { useAppDispatch } from '../common';
import { useHistory } from 'react-router-dom';

type Props = {
	id?: any;
};

const useLoadClient = ({ id }: Props) => {
	const dispatch = useAppDispatch();
	const { push } = useHistory();
	const [client, setClient] = React.useState<ClientList | null>(null);

	React.useEffect(() => {
		const getClient = async (id: string | number) => {
			try {
				const response = await clientService.getClient(id);
				setClient(response.data);
				dispatch(changeClient(response.data));
				push({ search: '' });
			} catch (error) {
				console.error(error);
			}
		};

		if (id) {
			getClient(id);
		}

		return () => {};
	}, [dispatch, id, push]);

	return {
		client,
	};
};

export default useLoadClient;
