import React from 'react';
import { useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { showPopup } from 'library/redux/modal';

import { useAppDispatch } from 'library/hooks/common';
import { useModuleSettings } from 'library/hooks/module';

import { ModalSmall } from 'library/components/common';

import st from './ModalShare.module.scss';

type Props = {
	close: () => void;
};

const ModalShare: React.FC<Props> = ({ close }) => {
	const dispatch = useAppDispatch();
	const { locationRoot } = useModuleSettings();
	const { shareId } = useParams<{ shareId: string }>();

	const onCopy = () => {
		dispatch(showPopup({ type: 'message', text: 'Скопировано в буфер обмена' }));
		setTimeout(() => {
			close();
		}, 1000);
	};

	return (
		<ModalSmall isOpen close={close} onRequestClose={close} title="Поделиться программой">
			<div className={st.share}>
				<section className={st.share__text}>
					<span>Скопируйте и отправьте ссылку удобным для Вас способом.</span>
				</section>
				<section className={st.share__buttons}>
					<CopyToClipboard
						text={`${window.location.origin}/${locationRoot}/program/${shareId}`}
						onCopy={onCopy}
					>
						<button className={st.share__button}>Копировать ссылку</button>
					</CopyToClipboard>
				</section>
			</div>
		</ModalSmall>
	);
};

export default ModalShare;
