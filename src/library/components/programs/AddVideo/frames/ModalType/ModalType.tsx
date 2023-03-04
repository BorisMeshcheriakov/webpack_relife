import React from 'react';
import { ModalSmall } from 'library/components/common';

import st from './ModalType.module.scss';

type Props = {
	isOpen: boolean;
	close: () => void;
	videoType: ('B' | 'Y')[];
	onSelect: (type: 'B' | 'Y') => void;
	sources: { Y: { title: string; type: string }; B: { title: string; type: string } };
};

const ModalType: React.FC<Props> = ({ videoType, onSelect, sources, isOpen, close }) => {
	const onTypeSelect = (type: 'B' | 'Y') => {
		onSelect(type);
		close();
	};
	return (
		<ModalSmall isOpen={isOpen} onRequestClose={close}>
			<div className={st.type}>
				<div className={st.type__text}>Откуда вы хотите добавить видео?</div>
				<div className={st.type__buttons}>
					{videoType.map((type) => (
						<button className={st.type__button} key={type} onClick={() => onTypeSelect(type)}>
							{sources[type].title}
						</button>
					))}
				</div>
			</div>
		</ModalSmall>
	);
};

export default ModalType;
