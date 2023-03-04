import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'library/hooks/common/reduxTypedHooks';
import { openSupportModal } from 'library/redux/modal';

const SupportPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { push } = useHistory();

	React.useEffect(() => {
		push('/');
		dispatch(openSupportModal());
	}, [push, dispatch]);

	return <></>;
};

export default SupportPage;
