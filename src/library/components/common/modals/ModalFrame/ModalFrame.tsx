import { useAppDispatch, useAppSelector } from 'library/hooks/common';
import { selectFrameModal, toggleFrameModal } from 'library/redux/modal';
import React from 'react';
import ModalLarge from '../ModalLarge';

const ModalFrame: React.FC = () => {
	const dispatch = useAppDispatch();
	const { url } = useAppSelector(selectFrameModal);

	const close = () => dispatch(toggleFrameModal({ isOpen: false, url: '' }));

	/**
	 * Модальное окно, для демострации каких-либо внешних ресурсов
	 * Управляется из redux
	 *
	 * @url - ссылка на внешний ресурс
	 */

	return (
		<ModalLarge isOpen close={close}>
			<iframe style={{ height: '100%' }} title="FrameModalIframe" src={url} />
		</ModalLarge>
	);
};

export default ModalFrame;
