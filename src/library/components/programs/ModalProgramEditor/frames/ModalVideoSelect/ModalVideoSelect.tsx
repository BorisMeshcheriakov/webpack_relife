import React from 'react';

import { useVideoSelect } from 'library/hooks/programs';

import { ModalLarge } from 'library/components/common';
import { IconButtonGrey, Videos } from 'library/components/programs';
import { Close } from '@mui/icons-material';

import st from './ModalVideoSelect.module.scss';

type Props = {
	close: () => void;
};

const ModalVideoSelect: React.FC<Props> = ({ close }) => {
	const { saveSelected } = useVideoSelect();

	const onReady = () => {
		close();
		saveSelected();
	};

	// TODO Очищать выбранные упражнения при закрытии окна
	return (
		<ModalLarge isOpen disableHeader onRequestClose={close}>
			<section className={st.header}>
				<h2>Видео</h2>
				<button className={st.header__ready} onClick={onReady}>
					Готово
				</button>
				<div className={st.header__close}>
					<IconButtonGrey onClick={close}>
						<Close fontSize="small" />
					</IconButtonGrey>
				</div>
			</section>

			<Videos mode="select" />
		</ModalLarge>
	);
};

export default ModalVideoSelect;
