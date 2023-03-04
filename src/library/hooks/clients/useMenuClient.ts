import { useMenu } from 'library/hooks/common';
import { MenuAction } from 'library/types/common';
import { ClientList } from 'library/models/clients';
import { useProfile } from 'library/components/clients';

const useMenuClient = (client: ClientList | null) => {
	const { open, anchorEl, handleClick, handleClose } = useMenu();
	const { dispatch } = useProfile();

	// const contacts = () => {
	// 	console.log('Контакты');
	// 	handleClose();
	// };

	const change = () => {
		dispatch({ type: 'setEditOpen', payload: true });
		handleClose();
	};

	// const remove = () => {
	// 	console.log('Удалить');
	// 	handleClose();
	// };

	const actions: MenuAction = {
		// contacts: {
		// 	title: 'Контакты',
		// 	action: contacts,
		// },
		edit: {
			title: 'Изменить',
			action: change,
		},
		// delete: {
		// 	title: 'Удалить',
		// 	action: remove,
		// },
	};

	return { open, anchorEl, handleClick, handleClose, actions };
};

export default useMenuClient;
