import React from 'react';
import { ModalMiddle } from 'library/components/common';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import st from './ModalCopy.module.scss';
import { useAppDispatch } from 'library/hooks/common';
import { showPopup } from 'library/redux/modal';

type Props = {
	close: () => void;
	title: string;
	children: React.ReactNode;
	text: string;
	onAfterCopy?: () => void;
};

const ModalCopy: React.FC<Props> = ({ close, title, children, text, onAfterCopy }) => {
	const dispatch = useAppDispatch();
	const onCopy = () => {
		dispatch(showPopup({ type: 'message', text: 'Скопировано в буфер обмена' }));
		onAfterCopy && onAfterCopy();
	};
	return (
		<ModalMiddle isOpen close={close}>
			<section className={st.head}>{title}</section>
			<section className={st.body}>
				<div className={st.body__wrap}>{children}</div>
			</section>
			<section className={st.confirm}>
				<p className={st.confirm__note}>*Скопируйте это сообщение и отправьте вашему клиенту </p>
				<div className={st.confirm__wrap}>
					<CopyToClipboard text={text} onCopy={onCopy}>
						<button className={st.confirm__btn}>Скопировать</button>
					</CopyToClipboard>
				</div>
			</section>
		</ModalMiddle>
	);
};

export default ModalCopy;
