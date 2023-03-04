import { useAppDispatch, useAppSelector } from 'library/hooks/common/reduxTypedHooks';
import { closeNotifyModal } from 'library/redux/modal';

import { ModalSmall, ButtonTransparent } from 'library/components/common';

import st from './ModalInfo.module.scss';

const ModalInfo = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.modals.notifyProps);

	const handleConfirm = () => {
		dispatch(closeNotifyModal());
		data.confirm && data.confirm();
	};

	return (
		<ModalSmall isOpen title={data.title} overlayClassName={st.overlay}>
			<div className={st.message}>
				<span>{data.text}</span>
			</div>
			<div className={st.buttons}>
				<div className={st.buttons__button}>
					<ButtonTransparent handler={() => handleConfirm()} text={data.confirmText} theme="blue" />
				</div>
			</div>
		</ModalSmall>
	);
};

export default ModalInfo;
