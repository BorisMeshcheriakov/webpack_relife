import { selectShareOpen, shareEvent } from 'library/redux/events';
import { useAppSelector, useAppDispatch } from 'library/hooks/common';

const useShare = () => {
	const dispatch = useAppDispatch();
	const isOpen = useAppSelector(selectShareOpen);

	const openShare = (id: number) => {
		dispatch(shareEvent({ id: id, isOpen: true }));
	};

	const closeShare = () => {
		dispatch(shareEvent({ id: 0, isOpen: false }));
	};

	return {
		isOpen,
		openShare,
		closeShare,
	};
};

export default useShare;
