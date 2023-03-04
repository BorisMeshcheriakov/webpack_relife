import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'library/hooks/common/reduxTypedHooks';
import { closeDialogModal, selectDialogProps } from 'library/redux/modal';

import { ModalSmall, ButtonTransparent } from 'library/components/common';

import st from './ModalDialog.module.scss';

const ModalDialog: FC = () => {
	const dispatch = useAppDispatch();
	const data = useAppSelector(selectDialogProps);

	const handleConfirm = () => {
		dispatch(closeDialogModal());
		data.confirm && data.confirm();
	};

	const handleReject = () => {
		dispatch(closeDialogModal());
		data.decline && data.decline();
	};

	return (
		<ModalSmall isOpen title={data.title} overlayClassName={st.overlay}>
			<div className={st.wrapper}>
				<div className={st.wrapper__text}>{data.text}</div>
				{data.link && (
					<a
						href={data.link.url}
						rel="noopener noreferrer"
						target="_blank"
						className={st.wrapper__text_link}
					>
						{data.link.text}
					</a>
				)}
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

export default ModalDialog;
