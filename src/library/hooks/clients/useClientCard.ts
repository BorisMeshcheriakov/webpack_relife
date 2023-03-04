import { ClientList } from 'library/models/clients';
import {
	changeClient,
	changeNoteList,
	changeProgramList,
	selectClient,
} from 'library/redux/clients';
import { setClientConsultations } from 'library/redux/schedules';
import { useAppDispatch, useAppSelector } from '../common';

const useClientCard = () => {
	const dispatch = useAppDispatch();
	const client = useAppSelector(selectClient);

	const isActive = (id: number) => {
		return id === client?.id;
	};

	const onCardClick = (client: ClientList) => {
		dispatch(changeClient(client));
		dispatch(setClientConsultations({ page: 1, status: 'idle', hasNext: true, list: [] }));
		dispatch(changeNoteList({ page: 1, status: 'idle', hasNext: true, list: [] }));
		dispatch(changeProgramList({ page: 1, status: 'idle', hasNext: true, list: [] }));
	};

	return {
		isActive,
		onCardClick,
	};
};

export default useClientCard;
