import { useAppDispatch, useAppSelector } from 'library/hooks/common';
import { hidePopup, selectPopupProps } from 'library/redux/modal';
import React from 'react';
import cn from 'classnames';

import st from './Popup.module.scss';

const Popup: React.FC = () => {
	const dispatch = useAppDispatch();
	const props = useAppSelector(selectPopupProps);

	React.useEffect(() => {
		setTimeout(() => {
			dispatch(hidePopup());
		}, 3000);
	}, [dispatch]);

	return <div className={cn(st.popup, st[props.type])}>{props.text}</div>;
};

export default Popup;
