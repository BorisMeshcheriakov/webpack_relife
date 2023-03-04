import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'library/hooks/common';
import { closeModerationModal, selectModerationProps } from 'library/redux/modal';
import { ModalSmall, ButtonTransparent } from 'library/components/common';

import st from './ModalModeration.module.scss';

const ModalModeration: FC = () => {
	const dispatch = useAppDispatch();
	const data = useAppSelector(selectModerationProps);

	const handleConfirm = () => {
		data.confirm && data.confirm();
		dispatch(closeModerationModal());
	};

	const handleReject = () => {
		data.decline && data.decline();
		dispatch(closeModerationModal());
	};

	return (
		<ModalSmall isOpen title={data.title} overlayClassName={st.overlay}>
			<div className={st.wrapper}>
				<p className={st.wrapper__text_status}>Причина:</p>
				<p className={st.wrapper__text_status}>{data.statusText}</p>
				<p className={st.wrapper__text}>{data.text}</p>
			</div>

			<div className={st.buttons}>
				<div className={st.buttons__button}>
					<ButtonTransparent handler={handleConfirm} text={data.confirmText} theme="blue" />
				</div>
				<div className={st.buttons__button}>
					<ButtonTransparent handler={handleReject} text={data.declineText} theme="blue" />
				</div>
			</div>
		</ModalSmall>
	);
};

export default ModalModeration;
