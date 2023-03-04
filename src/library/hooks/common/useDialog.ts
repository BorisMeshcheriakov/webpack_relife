import { openDialogModal, openNotifyModal } from 'library/redux/modal';
import { useAppDispatch } from './reduxTypedHooks';
import { DialogModal, NotifyModal } from 'library/types/modals';

const useDialog = () => {
	const dispatch = useAppDispatch();

	const notify = (props: NotifyModal) => dispatch(openNotifyModal({ ...props }));

	const dialog = (props: DialogModal) => dispatch(openDialogModal({ ...props }));

	return {
		notify,
		dialog,
	};
};

export default useDialog;
